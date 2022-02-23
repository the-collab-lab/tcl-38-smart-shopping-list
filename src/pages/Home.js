import { useState } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext.js';

const Home = () => {
  const navigate = useNavigate();
  const { docs } = useFirebaseSnapshot();
  const [userToken, setUserToken] = useState('');
  const existingTokens = docs.map((doc) => doc.data.token);
  const { setHasToken } = useToken();

  const createToken = () => {
    const newToken = getToken();
    localStorage.setItem('token', newToken);
    setHasToken(newToken);
    navigate('/list');
  };

  const saveToken = () => {
    localStorage.setItem('token', userToken);
  };

  const getUserToken = (e) => {
    e.preventDefault();
    if (existingTokens.includes(userToken) && userToken !== '') {
      saveToken(userToken);
      setHasToken(userToken);
      navigate('/list');
    } else {
      alert('Token does not exist, please try again or create a new list.');
      setUserToken('');
    }
  };

  return (
    <>
      {/* logo goes here */}
      <button className=" uppercase bg-black text-white" onClick={createToken}>
        Create a new list
      </button>
      {/* or image goes here */}

      <p>Join an existing shopping list by entering a</p>

      <form>
        <label htmlFor="shared-token" style={{ color: 'transparent' }}>
          Share Token
        </label>
        <br />
        <input
          className=" uppercase bg-black text-white"
          id="shared-token"
          type="text"
          name="shared-token"
          value={userToken}
          placeholder="three word token"
          onChange={(e) => setUserToken(e.target.value)}
        />{' '}
        <br />
        <button
          className=" uppercase bg-black text-white"
          type="submit"
          onClick={getUserToken}
        >
          Join an existing list
        </button>
      </form>
    </>
  );
};

export default Home;
