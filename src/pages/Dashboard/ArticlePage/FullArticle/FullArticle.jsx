import React, { useRef, useEffect, useState, Fragment } from 'react';

import moment from 'moment';

import {
  SERVER_IMAGE_FOLDER,
  DELETE_ARTICLE_TOAST_CLOSE_TIME,
} from './../../../../globals';

import CardButton from './../../../../components/CardButton/CardButton';
import Toast from './../../../../UI/Toast/Toast';
import Loader from './../../../../UI/Loader/Loader';
import Modal from './../../../../UI/Modal/Modal';
import ModalWindow from './../../../../UI/Modal/ModalWindow/ModalWindow';

import { axiosInstance as axios } from '../../../../utils/axiosConfig';

import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FullArticle = ({ article, author, noEdit, noDelete }) => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.token);
  const history = useHistory();
  const match = useRouteMatch();
  const editRoutePrefix = match.path.split('/:')[0];
  const articleId = match.params.articleId;
  const editRoute = `${editRoutePrefix}/edit-article/${articleId}`;
  const redirectRoute = role === 'admin' ? '/admin' : '/dashboard';
  const contentRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    type: null,
    show: false,
    message: null,
  });
  useEffect(() => {
    contentRef.current.innerHTML = article.content;
  }, []);
  const deleteArticleHandler = () => {
    setLoading(true);
    axios
      .delete(`/articles/${articleId}?token=${token}`)
      .then(({ data }) => {
        setLoading(false);
        setShowModal(false);
        if (!data.deletedArticle) {
          showErrorToast();
        } else {
          showSuccessToast();
          setTimeout(() => {
            history.push(redirectRoute);
          }, DELETE_ARTICLE_TOAST_CLOSE_TIME);
        }
      })
      .catch((err) => {
        setLoading(false);
        setShowModal(false);
        console.log(err.message);
        showErrorToast();
      });
  };
  const closeToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.show = false;
    setToastInfo(toastInfoCpy);
  };
  const showSuccessToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.show = true;
    toastInfoCpy.message = 'Deleting article successfully done';
    toastInfoCpy.type = 'success';
    setToastInfo(toastInfoCpy);
  };
  const showErrorToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.show = true;
    toastInfoCpy.message = 'Deleting article failed. Try again';
    toastInfoCpy.type = 'error';
    setToastInfo(toastInfoCpy);
  };
  const deleteIconclickHandler = () => {
    closeToast();
    setShowModal(true);
  };
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      {toastInfo.show ? (
        <Toast
          message={toastInfo.message}
          closeClickHandler={closeToast}
          autoCloseTime={DELETE_ARTICLE_TOAST_CLOSE_TIME}
          type={toastInfo.type}
        />
      ) : null}
      <Modal show={showModal} backdropClickHandler={() => setShowModal(false)}>
        <ModalWindow
          question="Are you sure you want to delete this article?"
          cancelClickHandler={() => setShowModal(false)}
          deleteClickHandler={deleteArticleHandler}
        />
      </Modal>
      <div className="article">
        <div className="article__image">
          <img src={`${SERVER_IMAGE_FOLDER}/${article.poster}`} />
        </div>
        {/* <div className="article__detail">
        <div className="article__views">
          views: <span className="views-count" ></span>
        </div>
        <div className="article__like">
          <span className="like-icon"></span>
          <span className="like-count"></span>
        </div>
      </div> */}
        <div className="article__header">
          <div className="article__avatar">
            <img src={`${SERVER_IMAGE_FOLDER}/${author.avatar}`} />
          </div>

          <div className="article__info">
            <div className="author autor--flex">
              Written by
              <span className="author__firstname"> {author.firstname}</span>
              <span className="author__lastname"> {author.lastname}</span>
            </div>
            <div className="date date--flex">
              Published at
              <span className="date__time">
                {' '}
                {moment(article.date).format('MMMM Do YYYY h:mm a')}
              </span>
            </div>
          </div>
        </div>
        <div className="article__body">
          <h2 className="article__title">{article.title}</h2>
          <div className="article__text" ref={contentRef}>
            {article.content}
          </div>
        </div>
        {noDelete ? null : (
          <CardButton
            type="delete"
            noLink
            clickHandler={deleteIconclickHandler}
          />
        )}

        {noEdit ? null : <CardButton type="edit" btnRoute={editRoute} />}
      </div>
    </Fragment>
  );
};

export default FullArticle;
