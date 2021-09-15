import React, { useState, useEffect, Fragment } from 'react';

import Loader from './../../../UI/Loader/Loader';
import Modal from './../../../UI/Modal/Modal';
import ModalAlert from './../../../UI/Modal/ModalAlert/ModalAlert';
import AlertPrimary from './../../../UI/alerts/AlertPrimary';

import Main from './../../../hoc/Main';
import FullArticle from './FullArticle/FullArticle';
import ArticleComments from './ArticleComments/ArticleComments';

import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { axiosInstance as axios } from './../../../utils/axiosConfig';

const ArticlePage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const match = useRouteMatch();
  const articleId = match.params.articleId;
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
  useEffect(() => {
    setFetchEnd(false);
    setFetchSuccess(false);
    setLoading(true);
    setFetchErr(false);
    axios
      .get(`/articles/${articleId}?token=${token}`)
      .then(({ data }) => {
        const { title, content, date, image: poster } = data.article;
        const { firstname, lastname, avatar } = data.author;
        setArticle({ title, content, date, poster });
        setAuthor({ firstname, lastname, avatar });
        setLoading(false);
        setFetchSuccess(true);
        setFetchEnd(true);
      })
      .catch((err) => {
        // console.log(err.response);
        setLoading(false);
        setFetchSuccess(false);
        setFetchEnd(true);
        setFetchErr(true);
      });
  }, []);
  let fullArticle = null;
  if (fetchEnd) {
    if (fetchSuccess) {
      fullArticle = (
        <Fragment>
          <FullArticle
            article={article}
            author={author}
            noEdit={props.noEdit}
            noDelete={props.noDelete}
          />
          <ArticleComments />
        </Fragment>
      );
    } else {
      fullArticle = (
        <AlertPrimary message="Fetching article info from server failed!" />
      );
    }
  }
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Modal show={fetchErr} backdropClickHandler={() => setFetchErr(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
      <Main>{fullArticle}</Main>
    </Fragment>
  );
};

export default ArticlePage;
