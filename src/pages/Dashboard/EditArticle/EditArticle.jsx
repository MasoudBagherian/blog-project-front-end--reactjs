import React, { useEffect, useState, Fragment } from 'react';
import Main from './../../../hoc/Main';
import EditArticleForm from './../../../components/forms/EditArticle/EditArticleForm';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './../../../UI/Loader/Loader';
import Modal from '../../../UI/Modal/Modal';
import ModalAlert from '../../../UI/Modal/ModalAlert/ModalAlert';
import AlertPrimary from './../../../UI/alerts/AlertPrimary';

const EditArticle = () => {
  const match = useRouteMatch();
  const articleId = match.params.articleId;

  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const [article, setArticle] = useState(null);
  useEffect(() => {
    setLoading(true);
    setFetchErr(false);
    setFetchEnd(false);
    setFetchSuccess(false);
    axios
      .get(`/articles/${articleId}?token=${token}`)
      .then(({ data }) => {
        setLoading(false);
        const { status, title, image: poster, content } = data.article;
        setArticle({ status, poster, title, content });
        setFetchSuccess(true);
        setFetchEnd(true);
      })
      .catch((err) => {
        setLoading(false);
        setFetchErr(true);
        setFetchEnd(true);
      });
  }, []);
  let editArticleForm = null;
  if (fetchEnd) {
    if (fetchSuccess) {
      editArticleForm = <EditArticleForm article={article} />;
    } else {
      editArticleForm = (
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
      <Main>{editArticleForm}</Main>
    </Fragment>
  );
};

export default EditArticle;
