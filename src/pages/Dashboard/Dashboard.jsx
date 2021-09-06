import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import { Route } from 'react-router-dom';
import ProfilePage from './ProfilePage/ProfilePage';
const Dashboard = (props) => {
  const pathname = props.location.pathname;

  useEffect(() => {
    if (!props.isAuth) {
      props.history.push('/');
    }
  }, []);
  return (
    <Fragment>
      <Header role={props.role} />
      <Route path={`${pathname}`} component={ProfilePage} />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
  role: state.auth.role,
});
export default connect(mapStateToProps)(Dashboard);
