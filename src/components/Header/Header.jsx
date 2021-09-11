import React, { useState, useEffect } from 'react';
import { axiosInstance as axios } from '../../utils/axiosConfig';
import Welcome from '../Welcome/Welcome';
import HeaderNav from './HeaderNav/HeaderNav';
import { useSelector } from 'react-redux';

const Header = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState({ avatar: null, username: null });

  const [navShow, setNavShow] = useState(false);
  useEffect(() => {
    // if (token) {
    axios.get(`/users/info?token=${token}`).then(({ data }) => {
      const { username, avatar } = data.user;
      setUser({ username, avatar });
    });
    // }
  }, []);
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
          <Welcome username={user.username} avatar={user.avatar} />
        </div>
      </div>
    </div>
  );
};

export default Header;
