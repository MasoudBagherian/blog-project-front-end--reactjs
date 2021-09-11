import React, { useEffect, useState } from 'react';
import Welcome from '../../../components/Welcome/Welcome';
import Main from './../../../hoc/Main';
import AddArticleForm from './../../../components/forms/AddArticle/AddArticleForm';
import { axiosInstance as axios } from '../../../utils/axiosConfig';
import { useSelector } from 'react-redux';

const AddArticle = () => {
  return (
    <Main>
      <AddArticleForm />
    </Main>
  );
};

export default AddArticle;
