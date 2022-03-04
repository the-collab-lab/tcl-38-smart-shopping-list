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
          <div className="md:flex md:flex-col md:items-center md:mx-auto md:max-w-sm md:h-[90%] md:my-[2%] md:border-2 md:border-white/50 md:border-dotted md:border-t-transparent md:border-b-transparent">
            <button
              onClick={createToken}
              className="btn-primary mt-8 md:w-44 md:mb-2"
            >
              Create a new list
            </button>
            <img
              src={or}
              alt="or"
              className="max-h-44 mx-auto -mt-3 -ml-7 scale-75 -mb-6 md:mr-0"
            />

            <span className="text-xl text-white/80 uppercase tracking-wide md:text-2xl">
              Join an <br />
              existing shopping list <br /> by entering a
            </span>

            <form>
              <label htmlFor="shared-token" className="hidden">
                Share Token
              </label>
              <br />
              <input
                className="btn-primary text-white/80 hover:border-transparent -mb-3 text-2xl w-4/5 m-auto md:w-72"
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
                className="btn-secondary md:w-44"
              >
                Join an existing list
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
