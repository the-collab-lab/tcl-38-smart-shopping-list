import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<ItemList />} path="/" exact />
          <Route element={<AddItem />} path="/add-item" />
        </Routes>
        <Link to="/" exact>
          Item List
        </Link>
        <Link to="/add-item">Add Item</Link>
      </Router>
    </div>
  );
}

export default App;
