import React from 'react';
import { Link } from 'react-router-dom';

const Frontis = () => {
  return (
    <div>
      Frontis
      <Link to="/home">home</Link>
      <Link to="/how-to-use">how to use</Link>
    </div>
  );
};

export default Frontis;
