import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import { Route } from 'react-router-dom';
import ProfilePage from './ProfilePage/ProfilePage';
import AddArticle from './AddArticle/AddArticle';
const Dashboard = (props) => {
  const path = props.match.path;
  useEffect(() => {
    if (!props.isAuth) {
      props.history.push('/');
    }
    if (props.role === 'admin' && path === '/dashboard') {
      props.history.push('/admin');
    }
    if (props.role === 'blogger' && path === '/admin') {
      props.history.push('/dashboard');
    }
  }, []);
  return (
    <Fragment>
      <Header role={props.role} />
      <Route path={`${path}`} exact component={ProfilePage} />
      <Route path={`${path}/add-article`} component={AddArticle} />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
  role: state.auth.role,
});
export default connect(mapStateToProps)(Dashboard);
