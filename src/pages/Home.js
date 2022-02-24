import { useState } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext.js';
import logogrey from '../assets/logogrey.png';
import orshade from '../assets/orshade.png';

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
      <img src={logogrey} alt="logo" className="logo" />
      <div className="home-container">
        <div className="inner-container">
          <button className="btn primary" onClick={createToken}>
            <h4>Create a new list</h4>
          </button>
          <img src={orshade} className="or" alt="or" />

          <h3 className="home">
            Join an <br />
            existing shopping list <br /> by entering a
          </h3>
          <form>
            <label htmlFor="shared-token" style={{ color: 'transparent' }}>
              Share Token
            </label>
            <br />
            <input
              className="input-field"
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
              className="btn primary existing-list"
              onClick={getUserToken}
            >
              join the list
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
