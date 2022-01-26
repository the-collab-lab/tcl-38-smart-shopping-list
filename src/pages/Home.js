import { useState } from 'react';
import {
  getToken,
  words,
  calculateEstimate,
} from '@the-collab-lab/shopping-list-utils';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState('');

  const createToken = () => {
    localStorage.setItem('token', getToken());
    navigate('/list');
  };

  const saveToken = () => {
    localStorage.setItem('token', userToken);
  };

  const useAToken = userToken;

  const getUserToken = (e) => {
    e.preventDefault();
    if (userToken !== 'token' || userToken === '') {
      alert('Token does not exist, please create a list.');
      navigate('/');
      setUserToken('');
    }

    const q = query(
      collection(db, 'shopping-list'),
      where('token', '==', userToken),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (('token', '==', useAToken)) {
          console.log(true);
          saveToken(useAToken);
          navigate('/list');
        }
      });
    });
    return () => {
      unsubscribe();
    };
  };

  return (
    <>
      <h3>Welcome to your Smart Shopping list</h3>
      <button onClick={createToken}>Create a new list</button>
      <p>- or -</p>
      <p>Join an existing shopping list by entering a three word token</p>

      <form>
        <label htmlFor="shared-token">Share Token</label>
        <br />
        <input
          style={{ marginTop: '10px', textAlign: 'center' }}
          id="shared-token"
          type="text"
          name="shared-token"
          value={userToken}
          placeholder="three word token"
          onChange={(e) => setUserToken(e.target.value)}
        />{' '}
        <br />
        <button
          type="submit"
          onClick={getUserToken}
          style={{ marginTop: '20px' }}
        >
          Join an existing list
        </button>
      </form>
    </>
  );
};

export default Home;
