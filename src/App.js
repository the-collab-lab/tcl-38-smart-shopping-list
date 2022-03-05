import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import Home from './pages/Home';
import Frontis from './pages/Frontis';
import About from './pages/About';
import useFirebaseSnapshot from './hooks/useFirebaseSnapshot';
import PrivateRoute from './components/PrivateRoute';
import { useToken } from './context/TokenContext';

function App() {
  const { docs, loading } = useFirebaseSnapshot();
  const { hasToken } = useToken();

  return (
    <div className="box-border">
      <div className="text-white bg-cover bg-fixed bg-chalkboard m-0 p-0 font-normal overflow-hidden mx-auto text-center font-Amatic">
        <div className="h-screen w-screen flex flex-col items-center">
          <div className="App">
            <Router>
              <div className="main-content">
                <Routes>
                  <Route element={<Frontis />} path="/" />
                  <Route element={<About />} path="/about" />
                  <Route
                    path="/home"
                    element={
                      !hasToken ? (
                        <Home />
                      ) : (
                        <ItemList docs={docs} loading={loading} />
                      )
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route
                    element={
                      <PrivateRoute>
                        <ItemList docs={docs} loading={loading} />
                      </PrivateRoute>
                    }
                    path="/list"
                  />
                  <Route
                    element={
                      <PrivateRoute>
                        <AddItem docs={docs} />
                      </PrivateRoute>
                    }
                    path="/add-item"
                  />
                </Routes>
              </div>
              {/* <Nav /> */}
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
