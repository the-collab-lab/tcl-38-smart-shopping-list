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
import CreateNewList from './components/CreateNewList';

function App() {
  if (localStorage.getItem('list-token') === null) {
    return <CreateNewList />;
  }

  return (
    <div className="App">
      <Router>
        <div className="main-content">
          <Routes>
            <Route element={<ItemList />} path="/" exact />
            <Route element={<AddItem />} path="/add-item" />
          </Routes>
        </div>
        <div className="route-links">
          <NavLink to="/" end>
            Item List
          </NavLink>
          <NavLink to="/add-item">Add Item</NavLink>
        </div>
      </Router>
    </div>
  );
}

export default App;
