import { useState } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext.js';
import logoS from '../assets/logogreyS.png';
import or from '../assets/orshade.png';

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
      <img
        src={logoS}
        alt="Logo: Welcome to Your Smart Shopping List"
        className="logo"
      />
      <div className="outer-box">
        <div className="inner-box">
          <button onClick={createToken} className="btn-primary  mt-8">
            Create a new list
          </button>
          <img
            src={or}
            alt="or"
            className="max-h-44 mx-auto -mt-3 -ml-7 scale-75 -mb-6"
          />

          <span className="text-3xl text-white/80 uppercase tracking-wide">
            Join an <br />
            existing shopping list <br /> by entering a
          </span>

          <form>
            <label htmlFor="shared-token" className="hidden">
              Share Token
            </label>
            <br />
            <input
              className="btn-primary hover:border-transparent -mb-3 text-2xl w-[80%]"
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
              className="btn-primary btn-secondary"
            >
              Join existing list
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
