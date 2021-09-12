import React, { useState, useEffect, Fragment } from 'react';
import Main from './../../../hoc/Main';
import { useRouteMatch } from 'react-router-dom';
import FullArticle from '../../../components/FullArticle/FullArticle';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import Loader from './../../../UI/Loader/Loader';
import Modal from './../../../UI/Modal/Modal';
import ModalAlert from './../../../UI/Modal/ModalAlert/ModalAlert';
import withAjax from './../../../hoc/withAjax';
import AlertPrimary from './../../../UI/alerts/AlertPrimary';

const ArticlePage = (props) => {
  const token = useSelector((state) => state.auth.token);

  const match = useRouteMatch();
  const [fetchEnd, setFetchEnd] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  useEffect(() => {
    const articleId = match.params.articleId;

    setFetchEnd(false);
    setFetchSuccess(false);
    axios
      .get(`/articles/${articleId}?token=${token}`)
      .then(({ data }) => {
        const { title, content, date, image: poster } = data.article;
        const { firstname, lastname, avatar } = data.author;
        setArticle({ title, content, date, poster });
        setAuthor({ firstname, lastname, avatar });
        setFetchEnd(true);
        setFetchSuccess(true);
      })
      .catch((err) => {
        console.log(err.response);
        setFetchEnd(true);
        setFetchSuccess(false);
      });
  }, []);
  let fullArticle = null;
  if (fetchEnd) {
    if (fetchSuccess) {
      fullArticle = <FullArticle article={article} author={author} />;
    } else {
      fullArticle = (
        <AlertPrimary message="Fetching article info from server failed!" />
      );
    }
  }
  return (
    <Fragment>
      <Main>{fullArticle}</Main>
    </Fragment>
  );
};

export default withAjax(ArticlePage, axios);
