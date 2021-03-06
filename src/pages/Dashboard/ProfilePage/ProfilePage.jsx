import React, { useEffect, useState, Fragment } from 'react';
import Main from './../../../hoc/Main';
import ProfileCard from './ProfileCard/ProfileCard';
import { BiPlusMedical as PlusIcon } from 'react-icons/bi';
import { Link, useRouteMatch } from 'react-router-dom';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import ProfileArticleList from './ProfileArticleList/ProfileArticleList';
import AlertPrimary from './../../../UI/alerts/AlertPrimary';
import LabelSecondary from './../../../UI/labels/LabelSecondary';
import Loader from './../../../UI/Loader/Loader';
import Modal from '../../../UI/Modal/Modal';
import ModalAlert from './../../../UI/Modal/ModalAlert/ModalAlert';

const ProfilePage = (props) => {
  const match = useRouteMatch();
  const path = match.path;

  const token = useSelector((state) => state.auth.token);

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
      .get(`/users/info?token=${token}`)
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

  let profilePage = null;
  if (fetchEnd) {
    if (fetchSuccess) {
      profilePage = (
        <Fragment>
          <ProfileCard user={user} />
          <LabelSecondary label="your articles" />
          <ProfileArticleList
            articles={articles}
            firstname={user.firstname}
            lastname={user.lastname}
            avatar={user.avatar}
            btnRoutePrefix={`${path}/articles`}
            alertMessage="You have no article. You can click the plus button at the right bottom corner of the page to write an article"
          />
          <Link to={`${path}/add-article`} className="add-btn">
            <PlusIcon className="icon-plus" />
          </Link>
        </Fragment>
      );
    } else {
      profilePage = <AlertPrimary message="Fething data from server failed!" />;
    }
  }
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Modal show={fetchErr} backdropClickHandler={() => setFetchErr(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
      <Main>{profilePage}</Main>
    </Fragment>
  );
};

export default ProfilePage;
