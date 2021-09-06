import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BookReader from '../../UI/icons/BookReader';
import LoginIcon from '../../UI/icons/Login';

const Intro = (props) => {
  useEffect(() => {
    if (props.isAuth) {
      if (props.role === 'admin') {
        props.history.push('/admin');
      }
      if (props.role === 'blogger') {
        props.history.push('/dashboard');
      }
    }
  }, []);
  return (
    <section className="intro">
      {/* <BookReader/> */}
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
const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
  role: state.auth.role,
});
export default connect(mapStateToProps)(Intro);
