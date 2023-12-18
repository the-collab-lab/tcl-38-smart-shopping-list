import { useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../lib/firebase.js';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext.js';
import logoS from '../assets/logogreyS.png';
import or from '../assets/orshade.png';

const Home = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState('');
  const { setHasToken } = useToken();

  const getAllDocs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'shopping-list'));
      const snapshotDocs = [];
      querySnapshot.forEach((doc) => snapshotDocs.push(doc.data()));
      return snapshotDocs;
    } catch (error) {
      console.log(error.message);
    }
  };

  const createToken = () => {
    // const newToken = getToken();
    // localStorage.setItem('token', newToken);
    // setHasToken(newToken);
    // navigate('/list');
    console.log('Creating new lists is no longer supported.');
  };

  const saveToken = () => {
    localStorage.setItem('token', userToken);
  };

  const getUserToken = async (e) => {
    e.preventDefault();
    const allDocs = await getAllDocs();
    const existingTokens = allDocs.map((doc) => doc.token);
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
          <div className="md:flex md:flex-col md:items-center md:mx-auto md:max-w-sm md:h-[90%] md:my-[2%]">
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

            <span className="text-3xl text-white/80 uppercase tracking-wide md:text-2xl">
              Join an <br />
              existing shopping list <br /> by entering a
            </span>

            <form>
              <label htmlFor="shared-token" className="hidden">
                Share Token
              </label>
              <br />
              <input
                className="btn-primary hover:border-transparent -mb-3 text-2xl w-[80%] md:w-72"
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
                className="btn-primary btn-secondary md:w-44"
              >
                Join existing list
              </button>
            </form>
          </div>
        </div>
        <ArchivalNoticeModal />
      </div>
    </>
  );
};

export default Home;
