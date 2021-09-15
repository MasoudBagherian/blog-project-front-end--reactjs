import React, { useState } from 'react';
import Welcome from '../Welcome/Welcome';
import HeaderNav from './HeaderNav/HeaderNav';

const Header = (props) => {
  const [navShow, setNavShow] = useState(false);
  return (
    <div className="header">
      <HeaderNav
        show={navShow}
        hideNav={() => setNavShow(false)}
        role={props.role}
      />
      <div className="header__top">
        <div className="inner-container">
          <div className="header__body">
            <button
              className="header__nav-btn"
              onClick={() => setNavShow(true)}>
              <div className="line"></div>
            </button>
            <h1 className="header__logo">BlogCenter</h1>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="inner-container">
          <Welcome username={props.username} avatar={props.avatar} />
        </div>
      </div>
    </div>
  );
};

export default Header;
