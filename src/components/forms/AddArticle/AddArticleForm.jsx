import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../UI/Modal/Modal';
import ModalAlert from '../../../UI/Modal/ModalAlert/ModalAlert';
import FormControls from '../FormControls/FormControls';
import FormGroup from '../FormGroup';
import FormImage from '../FormImage/FormImage';
import { checkImageName, checkValidity } from '../utils';
import ArticleContent from './ArticleContent';

import ArticleStatus from './ArticleStatus/ArticleStatus';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import Toast from './../../../UI/Toast/Toast';
import {
  ADD_ARTICLE_TOAST_CLOSE_TIME,
  DEFAULT_ARTICLE_IMAGE,
  SERVER_IMAGE_FOLDER,
} from '../../../globals';
import withAjax from './../../../hoc/withAjax';

import { useHistory } from 'react-router-dom';
const AddArticleForm = (props) => {
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const inputFileRef = useRef();
  const imgRef = useRef();
  const editorRef = useRef();

  const submitBtnRef = useRef();
  const cancelBtnRef = useRef();

  const [form, setForm] = useState({
    title: {
      value: '',
      validation: {
        isRequired: true,
        minLength: 5,
        defaultErrMsg: 'Title is required',
        mainErrMsg: 'Title should have at least 5 characters',
      },
      isValid: false,
      touched: false,
      focused: false,
      errMsg: null,
    },
    image: {
      isValid: true,
      data: null,
    },
    status: {
      isValid: true,
      value: 'public',
      focused: false,
    },
    content: {
      isValid: false,
      value: '',
      errMsg: null,
      validation: {
        isRequired: true,
        minWords: 30,
        defaultErrMsg: 'Content is required',
        mainErrMsg: 'Your arcticle should has at least 30 words',
      },
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [imgAlert, setImgAlert] = useState(null);

  const [showToast, setShowToast] = useState(false);

  const inputChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const formInfo = { ...form };
    const { isValid: validStatus, errMsg: message } = checkValidity(
      value,
      formInfo[key].validation
    );
    formInfo[key].value = value;
    formInfo[key].touched = true;
    formInfo[key].isValid = validStatus;
    formInfo[key].errMsg = message;
    setForm(formInfo);
  };
  const inputFocusHandler = (e) => {
    const key = e.target.name;
    const formInfo = { ...form };
    formInfo[key].focused = true;
    setForm(formInfo);
  };
  const inputBlurHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const formInfo = { ...form };
    if (value.trim() === '') {
      formInfo[key].focused = false;
      formInfo[key].touched = false;
      formInfo[key].errMsg = null;
      formInfo[key].value = '';
    }
    setForm(formInfo);
  };
  const clickIconHandler = () => {
    inputFileRef.current.click();
  };
  const changeImageHandler = (e) => {
    const formInfo = { ...form };
    const image = e.target.files[0];
    const photoUrl = URL.createObjectURL(image);
    const { isValid, imageAlert } = checkImageName(image);
    if (isValid) {
      imgRef.current.src = photoUrl;
      formInfo.image.data = image;
      setForm(formInfo);
      return;
    }
    setShowModal(true);
    setImgAlert(imageAlert);
    e.target.value = '';
  };
  const selectFocusHandler = (e) => {
    const key = e.target.name;
    const formInfo = { ...form };
    formInfo[key].focused = !formInfo[key].focused;
    setForm(formInfo);
  };
  const selectBlurHandler = (e) => {
    const key = e.target.name;
    const formInfo = { ...form };
    formInfo[key].focused = false;
    setForm(formInfo);
  };
  const selectItemClickHndler = (e) => {
    const { value } = e.target.attributes.value;
    const { value: key } = e.target.attributes.name;
    const formInfo = { ...form };
    formInfo[key].value = value;
    formInfo[key].focused = false;
    setForm(formInfo);
  };
  const editorChangeHandler = (e) => {
    const editor = editorRef.current.editor;
    const value = editor.getData();
    const formInfo = { ...form };
    formInfo.content.value = value;
    const { isValid, errMsg } = checkValidity(
      value,
      formInfo.content.validation
    );
    formInfo.content.isValid = isValid;
    formInfo.content.errMsg = errMsg;
    setForm(formInfo);
  };
  const isFormValid = () => {
    const formInfo = { ...form };
    for (const key in formInfo) {
      if (!formInfo[key].isValid) {
        return false;
      }
    }
    return true;
  };
  const disableButtns = () => {
    submitBtnRef.current.disabled = true;
    cancelBtnRef.current.classList.add('disabled');
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formInfo = { ...form };
    const formData = new FormData();
    formData.append('image', formInfo.image.data);
    formData.append('title', formInfo.title.value.trim());
    formData.append('status', formInfo.status.value);
    formData.append('content', formInfo.content.value);
    setShowToast(false);
    axios
      .post(`/articles?token=${token}`, formData)
      .then(({ data }) => {
        setShowToast(true);
        disableButtns();
        setTimeout(() => {
          const path = role === 'admin' ? '/admin' : '/dashboard';
          history.push(path);
        }, ADD_ARTICLE_TOAST_CLOSE_TIME);
      })
      .catch((err) => {
        if (err.response && err.response.data.errCode === 100) {
          const errMsgs = err.response.data.errMsgs;
          const formInfo = { ...form };
          errMsgs.forEach((err) => {
            const key = err.param;
            formInfo[key].errMsg = err.msg;
            formInfo[key].isValid = false;
            formInfo[key].touched = true;
          });
          setForm(formInfo);
        }
      });
  };
  console.log(props);
  return (
    <Fragment>
      {showToast ? (
        <Toast
          message="Article added successfully"
          closeClickHandler={() => setShowToast(false)}
          autoCloseTime={ADD_ARTICLE_TOAST_CLOSE_TIME}
          type="success"
        />
      ) : null}
      <Modal show={showModal} backdropClickHandler={() => setShowModal(false)}>
        <ModalAlert message={imgAlert} />
      </Modal>
      <form
        className="form form--secondary"
        autoComplete="off"
        onSubmit={submitHandler}>
        <h2 className="form__heading">Add an article</h2>
        <FormImage
          clickIconHandler={clickIconHandler}
          changeImageHandler={changeImageHandler}
          inputRef={inputFileRef}
          imgRef={imgRef}
          imagePath={`${SERVER_IMAGE_FOLDER}/${DEFAULT_ARTICLE_IMAGE}`}
        />
        <FormGroup
          label="title"
          formField={form.title}
          name="title"
          inputChangeHandler={inputChangeHandler}
          inputFocusHandler={inputFocusHandler}
          inputBlurHandler={inputBlurHandler}
        />
        <ArticleStatus
          formField={form.status}
          selectFocusHandler={selectFocusHandler}
          selectBlurHandler={selectBlurHandler}
          selectItemClickHndler={selectItemClickHndler}
          name="status"
        />
        <ArticleContent
          editorRef={editorRef}
          editorChangeHandler={editorChangeHandler}
          formField={form.content}
        />
        <FormControls
          cancelRoute={role === 'admin' ? '/admin' : '/dashboard'}
          disabled={!isFormValid()}
          submitBtnRef={submitBtnRef}
          cancelBtnRef={cancelBtnRef}
        />
      </form>
    </Fragment>
  );
};

export default withAjax(AddArticleForm, axios, { errCode: 100 });
