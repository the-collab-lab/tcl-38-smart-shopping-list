import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import Home from './pages/Home';
import Nav from './components/Nav';
import { TokenProvider } from './context/TokenContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  let token;
  token = localStorage.getItem('token');

  return (
    <TokenProvider>
      <div className="App">
        <Router>
          <div className="main-content">
            <Routes>
              {/* //later add conditional to be able to go to home page through navigation */}
              <Route path="/" element={!token ? <Home /> : <ItemList />} />
              <Route
                element={
                  <PrivateRoute>
                    <ItemList />
                  </PrivateRoute>
                }
                path="/list"
              />
              <Route
                element={
                  <PrivateRoute>
                    <AddItem />
                  </PrivateRoute>
                }
                path="/add-item"
              />
            </Routes>
          </div>
          <Nav />
        </Router>
      </div>
    </TokenProvider>
  );
}

export default App;
