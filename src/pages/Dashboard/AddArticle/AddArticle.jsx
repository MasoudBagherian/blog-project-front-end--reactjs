import React from 'react';
import Welcome from '../../../components/Welcome/Welcome';
import Main from './../../../hoc/Main';
import AddArticleForm from './../../../components/forms/AddArticle/AddArticleForm';

const AddArticle = () => {
  return (
    <Main>
      <Welcome />
      <AddArticleForm />
    </Main>
  );
};

export default AddArticle;
