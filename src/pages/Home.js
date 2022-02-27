import { useState } from 'react';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import useFirebaseSnapshot from '../hooks/useFirebaseSnapshot.js';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext.js';
import logo from '../assets/logogrey.png';
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
        src={logo}
        alt="Logo: Welcome to Your Smart Shopping List"
        className="max-w-screen max-h-72 mx-auto mr-3 -mt-12"
      />
      <div className="w-4/5 border-1 border-solid border-white/50 -mt-20 mb-0 mx-auto">
        <div className="flex text-center flex-col m-0.5 border-2 border-dotted border-[99%] border-white/50">
          <button onClick={createToken} className="btn-primary mt-3">
            Create a new list
          </button>
          <img src={or} alt="or" className="max-w-xl max-h-44 mx-auto -mt-6" />
          <span className="text-2xl text-white/80 -mt-8">
            Join an <br /> existing shopping list <br /> by entering a
          </span>

          <form>
            <label htmlFor="shared-token" className="hidden">
              Share Token
            </label>
            <br />
            <input
              className="btn-primary text-white/80 hover:border-transparent text-2xl w-4/5 m-auto"
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
              className="btn-primary uppercase mt-20 mb-4"
            >
              Join an existing list
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
