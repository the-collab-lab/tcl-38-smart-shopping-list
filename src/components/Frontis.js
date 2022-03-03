import React from 'react';
import { Link } from 'react-router-dom';
import logoS from '../assets/logogreyS.png';

const Frontis = () => {
  return (
    <>
      <img
        src={logoS}
        alt="Logo: Welcome to Your Smart Shopping List"
        className="logo mt-[40%]"
      />
      <div className="frontis-rule "></div>

      <Link
        to="/how-to-use"
        className="text-3xl text-white/80 uppercase tracking-wide no-underline mt-10 frontis"
      >
        don't know how to use me?
      </Link>
      <div className="frontis-rule"></div>
      <Link
        to="/home"
        className="text-3xl text-white/80 uppercase tracking-wide no-underline frontis"
      >
        i'm good, let me in
      </Link>
    </>
  );
};

export default Frontis;
