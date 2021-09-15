import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import ProfilePage from './ProfilePage/ProfilePage';
import AddArticle from './AddArticle/AddArticle';
import EditProfile from './EditProfile/EditProfile';
import ChangePassword from './ChangePassword/ChangePassword';
import { allActions } from '../../redux/actions/allActions';
import ArticlePage from './ArticlePage/ArticlePage';
import EditArticle from './EditArticle/EditArticle';
import Articles from './Articles/Articles';
import AllUsers from './AllUsers/AllUsers';
import UserArticles from './UserArticles/UserArticles';

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
      <Switch>
        <Route path={`${path}`} exact component={ProfilePage} />
        <Route path={`${path}/add-article`} component={AddArticle} />
        <Route path={`${path}/profile/edit-profile`} component={EditProfile} />
        <Route
          path={`${path}/profile/change-password`}
          component={ChangePassword}
        />
        <Route
          path={`${path}/articles/edit-article/:articleId`}
          component={EditArticle}
        />
        <Route path={`${path}/articles/:articleId`}>
          <ArticlePage />
        </Route>
        <Route path={`${path}/public-articles/:articleId`}>
          <ArticlePage noEdit noDelete />
        </Route>
        <Route path={`${path}/public-articles`} component={Articles} />

        <Route path={`${path}/all-articles/:articleId`}>
          <ArticlePage noEdit />
        </Route>
        <Route path={`${path}/all-articles`} component={Articles} />
        <Route path={`${path}/all-users`} component={AllUsers} />
        <Route path={`${path}/user-articles/article/:articleId`}>
          <ArticlePage noEdit />
        </Route>
        <Route
          path={`${path}/user-articles/:userId`}
          component={UserArticles}
        />
      </Switch>
    </Fragment>
  );
};

export default Dashboard;
