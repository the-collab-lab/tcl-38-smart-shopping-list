import { useState } from 'react';
import {
  getToken,
  words,
  calculateEstimate,
} from '@the-collab-lab/shopping-list-utils';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const docs = useFirebaseSnapshot();
  const [userToken, setUserToken] = useState('');

  const createToken = () => {
    localStorage.setItem('token', getToken());
    navigate('/list');
  };
  const saveToken = () => {
    localStorage.setItem('token', userToken);
  };
  const getUserToken = (e) => {
    e.preventDefault();
    //counting space between words
    const str = userToken.split(' ').length - 1;
    if (userToken === undefined || userToken === '' || str !== 2) {
      alert('Token does not exist, please try again or create a new list.');
      setUserToken('');
    } else {
      docs.forEach((doc) => {
        if (doc.token === userToken) {
          saveToken(userToken);
          navigate('/list');
        }
      });
    }
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
