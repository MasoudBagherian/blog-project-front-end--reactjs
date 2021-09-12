import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';
import ProfilePage from './ProfilePage/ProfilePage';
import AddArticle from './AddArticle/AddArticle';
import EditProfile from './EditProfile/EditProfile';
import ChangePassword from './ChangePassword/ChangePassword';
import { allActions } from '../../redux/actions/allActions';

const Dashboard = (props) => {
  const isAuth = useSelector((state) => state.auth.token !== null);
  const avatar = useSelector((state) => state.user.avatar);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

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
  useEffect(() => {
    dispatch(allActions.userFetchInfo());
  });
  return (
    <Fragment>
      <Header role={role} avatar={avatar} username={username} />
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
