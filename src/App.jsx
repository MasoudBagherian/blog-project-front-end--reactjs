import React, { Fragment } from 'react';
import Intro from './pages/Intro/Intro';
import { Route } from 'react-router-dom';
// import { axiosInstance as axios } from './utils/axiosConfig';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const App = () => {
  return (
    <Fragment>
      <Route path="/" exact component={Intro} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
    </Fragment>
  );
};

export default App;
