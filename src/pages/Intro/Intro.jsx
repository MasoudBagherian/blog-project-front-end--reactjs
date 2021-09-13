import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BookReader from '../../UI/icons/BookReader';
import LoginIcon from '../../UI/icons/Login';
import { useSelector } from 'react-redux';

const Intro = (props) => {
  const history = useHistory();
  const role = useSelector((state) => state.auth.role);
  const isAuth = useSelector((state) => state.auth.token !== null);
  useEffect(() => {
    if (isAuth) {
      if (role === 'admin') {
        history.push('/admin');
      }
      if (role === 'blogger') {
        history.push('/dashboard');
      }
    }
  }, []);
  return (
    <section className="intro">
      <div className="intro__header">
        <BookReader />
        <h1 className="intro__heading">BlogCenter</h1>
      </div>
      <h2 className="intro__desc">Create public and private articles</h2>
      <Link to="/auth/login" className="intro__btn">
        <div className="btn-icon">
          <LoginIcon />
        </div>
        <span className="btn-text">log in</span>
      </Link>
    </section>
  );
};

export default Intro;
