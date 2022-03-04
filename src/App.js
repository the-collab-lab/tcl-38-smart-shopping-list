import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import Home from './pages/Home';
import Frontis from './pages/Frontis';
import HowToUse from './pages/About';

// import Nav from './components/Nav';
import { TokenProvider } from './context/TokenContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  let token;
  token = localStorage.getItem('token');

  return (
    <div className="box-border">
      <div className="text-white bg-cover bg-fixed bg-chalkboard m-0 p-0 font-normal overflow-hidden mx-auto text-center font-Amatic">
        <div className="h-screen w-screen flex flex-col items-center">
          <TokenProvider>
            <div className="App">
              <Router>
                <div className="main-content">
                  <Routes>
                    <Route element={<Frontis />} path="/" />
                    <Route element={<HowToUse />} path="/about" />
                    <Route
                      path="/home"
                      element={!token ? <Home /> : <ItemList />}
                    />
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
                {/* <Nav /> */}
              </Router>
            </div>
          </TokenProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
