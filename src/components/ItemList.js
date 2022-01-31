import { useState } from 'react';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';
import cleanData from '../utils/cleanData.js';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState('');
  const { docs, loading } = useFirebaseSnapshot();

  const filterItems = (query) => {
    setSearchInput(query);
    const results = docs.filter((item) => {
      const name = cleanData(item.name);
      return name.includes(cleanData(query));
    });
    setFilteredResults(results);
  };

  return (
    <>
      <h2>Smart Shopping List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : docs.length ? (
        <>
          <form>
            <label htmlFor="filter-items">Filter Items</label>
            <input
              id="filter-items"
              type="text"
              name="filter-items"
              value={searchInput}
              onChange={({ target }) => filterItems(target.value)}
            />

            <button onClick={() => setSearchInput('')}>Clear</button>
          </form>
          <ul>
            {filteredResults
              ? filteredResults.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))
              : docs.map((item, index) => <li key={index}>{item.name}</li>)}
          </ul>
        </>
      ) : (
        <p>
          No items yet! <Link to="/add-item">Add one.</Link>
        </p>
      )}
    </>
  );
};

export default ItemList;
