import React from 'react';
import {Link} from 'react-router-dom';
import BookReader from '../../UI/icons/BookReader';
import LoginIcon from '../../UI/icons/Login';


const Intro = (props) => {
  return (
    <section className="intro">
      {/* <BookReader/> */}
      <div className="intro__header">

      <BookReader/>
      <h1 className="intro__heading">BlogCenter</h1>
      </div>
      <h2 className="intro__desc">Create public and private articles</h2>
      <Link to="/auth/login" className="intro__btn">
      <div className="btn-icon">
      <LoginIcon/>
      </div>
        <span className="btn-text">log in</span></Link>
    </section>
  )
}

export default Intro;