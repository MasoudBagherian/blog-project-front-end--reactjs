import React, { useEffect, useState, Fragment } from 'react';
import Welcome from '../../../components/Welcome/Welcome';
import Main from './../../../hoc/Main';
import ProfileCard from './ProfileCard/ProfileCard';
import { BiPlusMedical as PlusIcon } from 'react-icons/bi';
import { Link, useRouteMatch } from 'react-router-dom';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import ProfileArticleList from './ProfileArticleList/ProfileArticleList';
import withAjax from './../../../hoc/withAjax';
import AlertPrimary from './../../../UI/alerts/AlertPrimary';

const ProfilePage = (props) => {
  const match = useRouteMatch();
  const path = match.path;
  const token = useSelector((state) => state.auth.token);
  const [fetchErr, setFetchErr] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  useEffect(() => {
    setFetchErr(false);
    setFetchEnd(false);
    axios
      .get(`/users/info?token=${token}`)
      .then(({ data }) => {
        // console.log(data);
        const { firstname, lastname, email, username, avatar } = data.user;
        setUser({ firstname, lastname, email, avatar, username });
        setArticles(data.articles);
        setFetchEnd(true);
      })
      .catch((err) => {
        setFetchErr(true);
        setFetchEnd(true);
      });
  }, []);
  const [user, setUser] = useState({
    firstname: null,
    lastname: null,
    email: null,
    avatar: null,
    username: null,
  });
  const [articles, setArticles] = useState([]);
  return (
    <Main>
      {!fetchEnd ? null : fetchErr ? (
        <AlertPrimary message="Fething data from server failed!" />
      ) : (
        <Fragment>
          <ProfileCard user={user} />
          <ProfileArticleList
            articles={articles}
            firstname={user.firstname}
            lastname={user.lastname}
            avatar={user.avatar}
          />
          <Link to={`${path}/add-article`} className="add-btn">
            <PlusIcon className="icon-plus" />
          </Link>
        </Fragment>
      )}
    </Main>
  );
};

export default withAjax(ProfilePage, axios);
