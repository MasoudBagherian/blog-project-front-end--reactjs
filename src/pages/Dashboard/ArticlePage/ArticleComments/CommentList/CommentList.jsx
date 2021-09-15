import React, { useState, useEffect, Fragment } from 'react';

import Comment from './Comment/Comment';

import AlertPrimary from './../../../../../UI/alerts/AlertPrimary';

import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { axiosInstance as axios } from './../../../../../utils/axiosConfig';
import Loader from './../../../../../UI/Loader/Loader';
import { DELETE_COMMENT_TOAST_CLOSE_TIME } from '../../../../../globals';
import Toast from './../../../../../UI/Toast/Toast';

const CommentList = () => {
  const token = useSelector((state) => state.auth.token);
  const match = useRouteMatch();
  const articleId = match.params.articleId;
  const [fetchErr, setFetchErr] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    type: null,
    show: false,
    message: null,
  });
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments = () => {
    setFetchErr(false);
    setFetchEnd(false);
    axios
      .get(`/comments/article/${articleId}?token=${token}`)
      .then(({ data }) => {
        // console.log(data);
        setComments(data.comments);
        setFetchEnd(true);
      })
      .catch((err) => {
        setFetchErr(true);
        setFetchEnd(true);
      });
  };

  const deleteComment = (commentId) => {
    setDeleteLoading(true);
    axios
      .delete(`/comments/${commentId}?token=${token}`)
      .then(({ data }) => {
        setDeleteLoading(false);
        if (data.deletedComment) {
          showSuccessToast();
          setTimeout(() => {
            fetchComments();
          }, DELETE_COMMENT_TOAST_CLOSE_TIME);
        } else {
          showErrorToast();
        }
        console.log(data);
      })
      .catch((err) => {
        showErrorToast();
        setDeleteLoading(false);
        console.log(err.response);
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
    toastInfoCpy.message = 'Deleting comment successfully done';
    toastInfoCpy.type = 'success';
    setToastInfo(toastInfoCpy);
  };
  const showErrorToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.show = true;
    toastInfoCpy.message = 'Deleting comment failed. Try again';
    toastInfoCpy.type = 'error';
    setToastInfo(toastInfoCpy);
  };
  let commentList = null;
  if (fetchEnd) {
    if (fetchErr) {
      commentList = (
        <AlertPrimary message="Fetching comments from server failed!" />
      );
    } else {
      commentList = (
        <AlertPrimary message="There is not any comment for this article. You can type the first comment now." />
      );
      if (comments.length) {
        commentList = (
          <Fragment>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                firstname={comment.author.firstname}
                lastname={comment.author.lastname}
                avatar={comment.author.avatar}
                date={comment.date}
                content={comment.content}
                id={comment.id}
                deleteBtnClickHandler={deleteComment}
                closeToast={closeToast}
              />
            ))}
          </Fragment>
        );
      }
    }
  }

  return (
    <Fragment>
      {deleteLoading ? <Loader /> : null}
      {toastInfo.show ? (
        <Toast
          message={toastInfo.message}
          closeClickHandler={closeToast}
          autoCloseTime={DELETE_COMMENT_TOAST_CLOSE_TIME}
          type={toastInfo.type}
        />
      ) : null}
      <div className="comment-list">{commentList}</div>
    </Fragment>
  );
};

export default CommentList;
