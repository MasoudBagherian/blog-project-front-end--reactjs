import React, { useEffect, useState } from 'react';
import Welcome from '../../../components/Welcome/Welcome';
import Main from './../../../hoc/Main';
import ProfileCard from './ProfileCard/ProfileCard';
import { BiPlusMedical as PlusIcon } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import ArticleList from './../../../components/ArticleList/ArticleList';

const ProfilePage = (props) => {
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    axios
      .get(`/users/info?token=${token}`)
      .then(({ data }) => {
        // console.log(data);
        const { firstname, lastname, email, username, avatar } = data.user;
        setUser({ firstname, lastname, email, avatar, username });
        setArticles(data.articles);
      })
      .catch((err) => {
        console.log(err.response);
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
  const pathname = props.location.pathname;
  return (
    <Main>
      <Welcome username={user.username} avatar={user.avatar} />
      <ProfileCard user={user} />
      <ArticleList
        articles={articles}
        firstname={user.firstname}
        lastname={user.lastname}
        avatar={user.avatar}
      />
      <Link to={`${pathname}/add-article`} className="add-btn">
        <PlusIcon className="icon-plus" />
      </Link>
    </Main>
  );
};

export default ProfilePage;
