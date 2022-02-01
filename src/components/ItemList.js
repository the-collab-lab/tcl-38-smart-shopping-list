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

  const handleClear = () => {
    setSearchInput('');
    setFilteredResults('');
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
              onChange={({ target }) => filterItems(target.value)}
            />
            <label htmlFor="btn">clear</label>
            <input
              type="btn"
              id="btn"
              className="btn-filter"
              onClick={handleClear}
            />
          </form>
          <ul>
            {filteredResults
              ? filteredResults.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))
              : docs.map((item, index) => <li key={index}>{item.name}</li>)}
          </ul>
        </>
      )}
    </>
  );
};

export default ItemList;
