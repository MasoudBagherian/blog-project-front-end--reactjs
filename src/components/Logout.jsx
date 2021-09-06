import React, { useEffect } from 'react';
import { allActions } from '../redux/actions/allActions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Logout = (props) => {
  useEffect(() => {
    props.logout();
  }, []);
  return <Redirect to="/auth/login" />;
};
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(allActions.authLogout()),
});
export default connect(null, mapDispatchToProps)(Logout);
