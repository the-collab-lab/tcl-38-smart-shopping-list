import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import Home from './pages/Home';

import {
  getToken,
  words,
  calculateEstimate,
} from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';

function App() {
  let token;
  token = localStorage.getItem('token');

  return (
    <div className="App">
      <Router>
        <div className="main-content">
          <Routes>
            {/* //later add conditional to be able to go to home page through navigation */}
            <Route path="/" element={!token ? <Home /> : <ItemList />} />
            <Route element={<ItemList />} path="/list" />
            <Route element={<AddItem />} path="/add-item" />
          </Routes>
        </div>
        <div className="route-links">
          <NavLink to="/list">Item List</NavLink>
          <NavLink to="/add-item">Add Item</NavLink>
        </div>
      </Router>
    </div>
  );
}

export default App;
