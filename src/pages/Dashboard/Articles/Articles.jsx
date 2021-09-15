import React, { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Main from './../../../hoc/Main';
import ArticleList from './ArticleList/ArticleList';

const Articles = (props) => {
  const role = useSelector((state) => state.auth.role);
  const match = useRouteMatch();
  const page = match.path.split('/').filter((el) => el !== '')[1];
  const history = useHistory();
  console.log(match);
  useEffect(() => {
    if (role === 'admin' && page === 'public-articles') {
      history.push('/admin/all-articles');
    }
    if (role === 'blogger' && page === 'all-articles') {
      history.push('/dashboard/public-articles');
    }
  }, []);
  return (
    <Main>
      <ArticleList showBadge={props.showBadge} />
    </Main>
  );
};

export default Articles;
