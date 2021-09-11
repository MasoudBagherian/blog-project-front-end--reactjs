import React, { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import ProfilePage from './ProfilePage/ProfilePage';
import AddArticle from './AddArticle/AddArticle';
import EditProfile from './EditProfile/EditProfile';
import ChangePassword from './ChangePassword/ChangePassword';
const Dashboard = (props) => {
  const isAuth = useSelector((state) => state.auth.token !== null);
  const role = useSelector((state) => state.auth.role);
  const history = useHistory();
  const match = useRouteMatch();
  const path = match.path;
  useEffect(() => {
    if (!isAuth) {
      history.push('/');
    }
    if (role === 'admin' && path === '/dashboard') {
      history.push('/admin');
    }
    if (role === 'blogger' && path === '/admin') {
      history.push('/dashboard');
    }
  }, []);
  return (
    <Fragment>
      <Header role={role} />
      <Route path={`${path}`} exact component={ProfilePage} />
      <Route path={`${path}/add-article`} component={AddArticle} />
      <Route path={`${path}/profile/edit-profile`} component={EditProfile} />
      <Route
        path={`${path}/profile/change-password`}
        component={ChangePassword}
      />
    </Fragment>
  );
};

export default Dashboard;
