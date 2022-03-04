import {
  serverTimestamp,
  Timestamp,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import FlipMove from 'react-flip-move';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';
import cleanData from '../utils/cleanData.js';
import itemStatus from '../utils/itemStatus.js';
import Nav from './Nav';
import logoS from '../assets/logogreyS.png';

const ItemList = () => {
  const { docs, loading } = useFirebaseSnapshot();
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState('');
  const currentPage = 'item-list';

  const handleChecked = async (id, item) => {
    const daysSinceLastPurchased = item.data['last purchased']
      ? Math.round((Timestamp.now() - item.data['last purchased']) / 86400)
      : 0;

    const docRef = doc(db, 'shopping-list', id);
    await updateDoc(docRef, {
      'estimated purchase interval': calculateEstimate(
        item.data['estimated purchase interval'],
        daysSinceLastPurchased,
        item.data['total purchases'],
      ),
      'last purchased': serverTimestamp(),
      'total purchases': item.data['total purchases']
        ? item.data['total purchases'] + 1
        : 0,
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
    !query ? setFilteredResults('') : setFilteredResults(results);
  };

  useEffect(() => {
    if (searchInput) {
      filterItems(searchInput);
    }
  }, [docs]);

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
      <img
        src={logoS}
        alt="Logo: Welcome to Your Smart Shopping List"
        className="logo"
      />
      <div className="outer-box">
        <div className="inner-box">
          {loading && <p>Loading ...</p>}

          {!docs.length && !loading && (
            <p>
              No items yet! <Link to="/add-item">Add some.</Link>
            </p>
          )}

          {docs.length > 0 && (
            <>
              <form>
                <label
                  htmlFor="filter-items"
                  className="bg-gray-800 pr-2 pl-2 absolute -mt-4 text-xs uppercase tracking-wider text-white/80 "
                >
                  Filter Items
                </label>
                <input
                  id="filter-items"
                  type="text"
                  name="filter-items"
                  value={searchInput}
                  autoComplete="off"
                  className="btn-primary text-white/80  ml-4 text-2xl w-[55%] p-1.5 mt-[12%]"
                  onChange={({ target }) => filterItems(target.value)}
                />
                <label
                  htmlFor="btn"
                  className="btn-primary text-white/80 float-right -mb-3 text-1xl w-[12%] m-auto mr-5 mt-[12%] "
                >
                  clear
                </label>
                <button
                  type="button"
                  id="btn"
                  className="invisible"
                  onClick={handleClear}
                ></button>
              </form>
              <ul className="list-none p-0 ">
                <FlipMove
                  delay={100}
                  duration={500}
                  staggerDelayBy={20}
                  enterAnimation={'elevator'}
                  leaveAnimation={'elevator'}
                >
                  {filteredResults
                    ? filteredResults.map((item) => (
                        <li
                          key={item.id}
                          aria-label={
                            itemStatus(item) === 'inactive'
                              ? `${item.data.name} is inactive`
                              : `Need to buy ${item.data.name} ${itemStatus(
                                  item,
                                )}`
                          }
                          className={itemStatus(item).replace(/\s+/g, '')}
                        >
                          {' '}
                          <input
                            className="btn-forth"
                            aria-label="purchase item"
                            type="checkbox"
                            onChange={() => handleChecked(item.id, item)}
                            checked={within24Hours(item)}
                            disabled={within24Hours(item)}
                          />{' '}
                          {item.data.name}
                          <button
                            className="btn-third active:bg-red-400/60 bg-cover bg-delete"
                            type="checkbox"
                            aria-label={`delete ${item.data.name}`}
                            onClick={() =>
                              handleDelete(item.id, item.data.name)
                            }
                          ></button>
                        </li>
                      ))
                    : docs.map((item) => (
                        <li
                          key={item.id}
                          aria-label={
                            itemStatus(item) === 'inactive'
                              ? `${item.data.name} is inactive`
                              : `Need to buy ${item.data.name} ${itemStatus(
                                  item,
                                )}`
                          }
                          className={itemStatus(item).replace(/\s+/g, '')}
                        >
                          {' '}
                          <input
                            className="btn-forth"
                            aria-label="purchase item"
                            type="checkbox"
                            onChange={() => handleChecked(item.id, item)}
                            checked={within24Hours(item)}
                            disabled={within24Hours(item)}
                          />{' '}
                          {item.data.name}
                          <button
                            className="btn-third active:bg-red-400/60 bg-cover bg-delete"
                            type="button"
                            aria-label={`delete ${item.data.name}`}
                            onClick={() =>
                              handleDelete(item.id, item.data.name)
                            }
                          ></button>
                        </li>
                      ))}
                </FlipMove>
              </ul>
            </>
          )}
          <Nav currentPage={currentPage} />
        </div>
      </div>
    </>
  );
};

export default ItemList;
