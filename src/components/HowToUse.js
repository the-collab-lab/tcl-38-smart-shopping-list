import React from 'react';
import logoS from '../assets/logogreyS.png';
import { Link } from 'react-router-dom';

import { AiFillLinkedin } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';

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
          <div className="mx-auto w-[80%] bg-transparent overflow-y-auto h-[80%] mt-[1%]">
            <h4 className="text-3xl text-green-500/70 uppercase tracking-wide mt-[10%] -mb-[3%]">
              how to use
            </h4>
            <p className="how-to text-white/80">
              Get started by selecting "Create a new list" from the homepage.
              Or, if someone has already shared a token with you, enter that
              into the "Share Token" field and select "Join an existing list."{' '}
            </p>
            <p className="how-to">
              Once you create a new list, select "Add Item" to start adding your
              items. As you purchase your items, check them off your list. If
              you don't plan to buy that item again, delete it. If you leave it,
              the item will reappear unchecked after 24 hours. As you repeatedly
              buy a particular item over time, the app will learn how often you
              need it, and categorize items as to be purchased "soon," "kind of
              soon," or "not soon".
            </p>
            <p className="how-to">
              To share your list, click the "Share Token" button and your token
              will be copied to the clipboard so you can send it to others.
            </p>
            <h4 className="text-3xl text-green-500/70 uppercase tracking-wide mt-[10%] -mb-[3%]">
              about us
            </h4>
            <p className="how-to">
              Our team of four collaborated remotely using Agile methodology for
              eight weeks to build this app. We were mentored by three amazing
              engineering leaders: April Leone, Skyler Shaw, and Lars Brekken.
            </p>
            <h4 className="text-3xl text-green-500/70 uppercase tracking-wide mt-[10%] -mb-[3%]">
              team
            </h4>
            <h5 className="team-name ">Cynthia Eddy</h5>
            <a href="https://www.linkedin.com/in/cynthiaeddy">
              <AiFillLinkedin className="text-white mr-3 hover:text-sky-400 " />
            </a>
            <a href="https://github.com/cynthiaeddy">
              <AiFillGithub className="text-white mr-3 hover:text-yellow-400" />
            </a>
            <h5 className="team-name">Chris Korsak</h5>
            <a href="https://www.linkedin.com/in/chriskorsak">
              <AiFillLinkedin className="text-white mr-3 hover:text-sky-400 " />
            </a>
            <a href="https://github.com/chriskorsak">
              <AiFillGithub className="text-white mr-3 hover:text-yellow-400" />
            </a>
            <h5 className="team-name">Kristen Monnik</h5>
            <a href="https://www.linkedin.com/in/kristenmonnik/">
              <AiFillLinkedin className="text-white mr-3 hover:text-sky-400 " />
            </a>
            <a href="https://github.com/k-monnik">
              <AiFillGithub className="text-white mr-3 hover:text-yellow-400" />
            </a>
            <h5 className="team-name">Diyana Mendoza-Price</h5>
            <a href="https://www.linkedin.com/in/diyana-mendoza-price/">
              <AiFillLinkedin className="text-white mr-3 hover:text-sky-400 " />
            </a>
            <a href="https://github.com/diyanamendoza">
              <AiFillGithub className="text-white mr-3 hover:text-yellow-400" />
            </a>
            <Link to="/home" className="btn-secondary  ">
              home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToUse;
