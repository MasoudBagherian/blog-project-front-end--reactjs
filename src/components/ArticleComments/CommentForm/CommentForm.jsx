import React, { useState, useRef, useEffect, Fragment } from 'react';
import LabelPrimary from './../../../UI/labels/LabelPrimary';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import Modal from '../../../UI/Modal/Modal';
import ModalAlert from '../../../UI/Modal/ModalAlert/ModalAlert';
import Loader from './../../../UI/Loader/Loader';
import { useRouteMatch } from 'react-router-dom';
import { ADD_COMMENT_TOAST_CLOSE_TIME } from '../../../globals';
import Toast from './../../../UI/Toast/Toast';

const CommentForm = (props) => {
  const token = useSelector((state) => state.auth.token);
  const match = useRouteMatch();
  const articleId = match.params.articleId;
  const textRef = useRef();
  const submitBtnRef = useRef();
  const cancelBtnRef = useRef();
  const [comment, setComment] = useState({
    value: '',
    isValid: false,
    errMsg: null,
    touched: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setFetchErr(false);
    setShowToast(false);
    axios
      .post(`/comments/?token=${token}`, {
        comment: comment.value.trim(),
        articleId,
      })
      .then(({ data }) => {
        setLoading(false);
        setShowToast(true);
        disableButtons();
        const tabChangeTimer = setTimeout(() => {
          cancelBtnRef.current.disabled = false;
          cancelBtnRef.current.click();
        }, ADD_COMMENT_TOAST_CLOSE_TIME);
        setTimer(tabChangeTimer);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        const res = err.response;
        if (res && res.data.errCode === 100) {
          const commentCpy = { ...comment };
          const err = res.data.errMsgs[0];
          commentCpy.errMsg = err.msg;
          commentCpy.touched = true;
          commentCpy.isValid = false;
          setComment(commentCpy);
        } else {
          setFetchErr(true);
        }
      });
  };
  const disableButtons = () => {
    submitBtnRef.current.disabled = true;
    cancelBtnRef.current.disabled = true;
  };
  const commentChangeHandler = (e) => {
    const commentCpy = { ...comment };
    const value = e.target.value;
    const { isValid, errMsg } = checkValidity(value);
    commentCpy.value = value;
    commentCpy.isValid = isValid;
    commentCpy.errMsg = errMsg;
    commentCpy.touched = true;
    setComment(commentCpy);
  };
  const checkValidity = (value) => {
    let errMsg = null;
    let isValid = true;
    if (value.trim() === '') {
      return { errMsg: 'You should type something', isValid: false };
    }
    if (
      value
        .replace(/\n/g, ' ')
        .split(' ')
        .filter((el) => el !== '').length < 5
    ) {
      return { errMsg: 'You should type at least 5 words', isValid: false };
    }
    return { errMsg, isValid };
  };
  return (
    <Fragment>
      {showToast ? (
        <Toast
          message="Comment added successfully"
          closeClickHandler={() => setShowToast(false)}
          autoCloseTime={ADD_COMMENT_TOAST_CLOSE_TIME}
          type="success"
        />
      ) : null}
      {loading ? <Loader /> : null}
      <Modal show={fetchErr} backdropClickHandler={() => setFetchErr(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
      <form autoComplete="off" onSubmit={submitHandler}>
        <LabelPrimary label="type your comment" />
        <textarea
          ref={textRef}
          className={
            comment.isValid || !comment.touched
              ? 'comment__input'
              : 'comment__input error'
          }
          cols="30"
          rows="8"
          value={comment.value}
          onChange={commentChangeHandler}></textarea>
        <p className="comment__alert">{comment.errMsg}</p>
        <div className="form__controls ">
          <button
            className="form__btn btn-primary"
            style={{ marginRight: '1rem' }}
            // disabled={!comment.isValid}
            ref={submitBtnRef}>
            send
          </button>
          <button
            type="button"
            className="form__btn btn-tritiary"
            onClick={props.cancelCommentHanlder}
            ref={cancelBtnRef}>
            cancel
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default CommentForm;
