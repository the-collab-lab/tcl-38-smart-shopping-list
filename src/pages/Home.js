import React from 'react';
import {
  getToken,
  words,
  calculateEstimate,
} from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const createToken = () => {
    let token;
    token = localStorage.setItem('token', getToken());
    navigate('/list');
  };
  return (
    <>
      <h3>Welcome to your Smart Shopping list</h3>
      <button onClick={createToken}>Create a new list</button>
    </>
  );
};

export default Home;
