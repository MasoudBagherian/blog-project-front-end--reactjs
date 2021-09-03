import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
// import { axiosInstance as axios } from './utils/axiosConfig';
import Intro from './pages/Intro/Intro';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Toast from './UI/Toast/Toast';

const App = () => {
  return (
    <Fragment>
      {/* <Toast message="Registration successfully done" /> */}
      <Route path="/" exact component={Intro} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
    </Fragment>
  );
};

export default App;
