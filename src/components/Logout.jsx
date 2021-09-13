import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { allActions } from './../redux/actions/allActions';
const Logout = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allActions.authLogout());
  }, []);
  return <Redirect to="/auth/login" />;
};

export default Logout;
