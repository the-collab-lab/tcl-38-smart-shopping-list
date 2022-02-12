import {
  serverTimestamp,
  Timestamp,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';
import cleanData from '../utils/cleanData.js';

const ItemList = () => {
  const { docs, loading } = useFirebaseSnapshot();
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState('');

  const handleChecked = async (id, item) => {
    const daysSinceLastPurchased = item.data['last purchased']
      ? Math.round((Timestamp.now() - item.data['last purchased']) / 86400)
      : 0;

    //console.log used for testing checked item and manipulating last purchased time in db
    // console.log(id);
    const docRef = doc(db, 'shopping-list', id);
    await updateDoc(docRef, {
      'estimated purchase interval': calculateEstimate(
        item.data['estimated purchase interval'],
        daysSinceLastPurchased,
        item.data['total purchases'],
      ),
      'last purchased': serverTimestamp(),
      'total purchases': (item.data['total purchases'] += 1),
    });
  };

  const within24Hours = (item) => {
    // Seconds in 24 hours
    // 60 x 60 x 24 = 86400
    if (item.data['last purchased']) {
      if (
        Timestamp.now().seconds - item.data['last purchased'].seconds <
        86400
      ) {
        return true;
      }
    }
    return false;
  };

  const filterItems = (query) => {
    setSearchInput(query);
    const results = docs.filter((item) => {
      const name = cleanData(item.data.name);
      return name.includes(cleanData(query));
    });
    setFilteredResults(results);
  };

  const handleClear = () => {
    setSearchInput('');
    setFilteredResults('');
  };

  const handleDelete = async (id, name) => {
    console.log(name);
    const confirmation = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );
    if (confirmation) {
      const docRef = doc(db, 'shopping-list', id);
      await deleteDoc(docRef);
    }
  };

  return (
    <>
      <h2>Smart Shopping List</h2>
      {loading && <p>Loading ...</p>}

      {!docs.length && !loading && (
        <p>
          No items yet! <Link to="/add-item">Add some.</Link>
        </p>
      )}

      {docs.length > 0 && (
        <>
          <form>
            <label htmlFor="filter-items">Filter Items</label>
            <input
              id="filter-items"
              type="text"
              name="filter-items"
              value={searchInput}
              autoComplete="off"
              onChange={({ target }) => filterItems(target.value)}
            />
            <label htmlFor="btn">clear</label>
            <button
              type="button"
              id="btn"
              className="btn-filter"
              onClick={handleClear}
            ></button>
          </form>
          <ul>
            {filteredResults
              ? filteredResults.map((item) => (
                  <li key={item.id}>
                    {' '}
                    <input
                      aria-label="purchase item"
                      type="checkbox"
                      onChange={() => handleChecked(item.id, item)}
                      checked={within24Hours(item)}
                      disabled={within24Hours(item)}
                    />{' '}
                    {item.data.name}
                    <button
                      type="button"
                      aria-label={`delete ${item.data.name}`}
                      onClick={() => handleDelete(item.id, item.data.name)}
                    >
                      Delete
                    </button>
                  </li>
                ))
              : docs.map((item) => (
                  <li key={item.id}>
                    {' '}
                    <input
                      aria-label="purchase item"
                      type="checkbox"
                      onChange={() => handleChecked(item.id, item)}
                      checked={within24Hours(item)}
                      disabled={within24Hours(item)}
                    />{' '}
                    {item.data.name}
                    <button
                      type="button"
                      aria-label={`delete ${item.data.name}`}
                      onClick={() => handleDelete(item.id, item.data.name)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ItemList;
