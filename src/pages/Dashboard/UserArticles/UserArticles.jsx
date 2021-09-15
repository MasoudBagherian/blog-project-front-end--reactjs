import React, { useEffect, useState, Fragment } from 'react';
import Modal from '../../../UI/Modal/Modal';
import Main from './../../../hoc/Main';
import Loader from './../../../UI/Loader/Loader';
import ModalAlert from './../../../UI/Modal/ModalAlert/ModalAlert';
import { useSelector } from 'react-redux';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import LabelSecondary from './../../../UI/labels/LabelSecondary';
import ProfileArticleList from './../ProfilePage/ProfileArticleList/ProfileArticleList';
import AlertPrimary from './../../../UI/alerts/AlertPrimary';
import { useRouteMatch } from 'react-router-dom';

const UserArticles = () => {
  const token = useSelector((state) => state.auth.token);
  const match = useRouteMatch();
  const userId = match.params.userId;

  const btnRoutePrefix = `${match.path.split('/:')[0]}/article`;

  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState(null);

  const [fetchErr, setFetchErr] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  useEffect(() => {
    setFetchErr(false);
    setFetchEnd(false);
    setLoading(true);
    setFetchSuccess(false);
    axios
      .get(`/users/${userId}?token=${token}`)
      .then(({ data }) => {
        // console.log(data);
        setLoading(false);
        const { firstname, lastname, email, username, avatar } = data.user;
        setUser({ firstname, lastname, email, avatar, username });
        setArticles(data.articles);
        setFetchSuccess(true);
        setFetchEnd(true);
      })
      .catch((err) => {
        setLoading(false);
        setFetchErr(true);
        setFetchEnd(true);
      });
  }, []);

  let userArticles = null;
  if (fetchEnd) {
    if (fetchSuccess) {
      userArticles = (
        <Fragment>
          {articles.length ? (
            <LabelSecondary label={`${user.username} articles`} />
          ) : null}
          <ProfileArticleList
            articles={articles}
            firstname={user.firstname}
            lastname={user.lastname}
            avatar={user.avatar}
            btnRoutePrefix={btnRoutePrefix}
            alertMessage="This blogger has no article!"
          />
        </Fragment>
      );
    } else {
      userArticles = (
        <AlertPrimary message="Fething data from server failed!" />
      );
    }
  }

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Modal show={fetchErr} backdropClickHandler={() => setFetchErr(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
      <Main>{userArticles}</Main>
    </Fragment>
  );
};

export default UserArticles;
