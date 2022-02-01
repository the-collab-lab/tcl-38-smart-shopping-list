import { useState } from 'react';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';
import cleanData from '../utils/cleanData.js';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState('');
  const [loading, setLoading] = useState(true);

  const docs = useFirebaseSnapshot();

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
    setFilteredResults();
  };

  if (!docs.length && !loading) {
    return (
      <>
        <h2>Smart Shopping List</h2>;
        <p>
          No items yet! <Link to="/add-item">Add one.</Link>
        </p>
      </>
    );
  } else {
    return (
      <>
        <h2>Smart Shopping List</h2>;
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
    );
  }
};

export default ItemList;
