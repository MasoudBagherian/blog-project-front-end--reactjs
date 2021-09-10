import React, { useEffect, useState } from 'react';
import Welcome from '../../../components/Welcome/Welcome';
import Main from './../../../hoc/Main';
import AddArticleForm from './../../../components/forms/AddArticle/AddArticleForm';
import { axiosInstance as axios } from '../../../utils/axiosConfig';
import { useSelector } from 'react-redux';

const AddArticle = () => {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState({ avatar: null, username: null });
  useEffect(() => {
    axios.get(`/users/info?token=${token}`).then(({ data }) => {
      const { username, avatar } = data.user;
      setUser({ username, avatar });
    });
  }, []);
  return (
    <Main>
      <Welcome username={user.username} avatar={user.avatar} />
      <AddArticleForm />
    </Main>
  );
};

export default AddArticle;
