import React from 'react';
import logoS from '../assets/logogreyS.png';
import { Link } from 'react-router-dom';

const HowToUse = () => {
  return (
    <>
      <img
        src={logoS}
        alt="Logo: Welcome to Your Smart Shopping List"
        className="logo"
      />
      <div className="outer-box">
        <div className="inner-box">
          how to use
          <Link to="/home">home</Link>
        </div>
      </div>
    </>
  );
};

export default HowToUse;
