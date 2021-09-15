import React, { useState, useRef, useEffect, Fragment } from 'react';
import {
  EDIT_ARTICLE_TOAST_CLOSE_TIME,
  SERVER_IMAGE_FOLDER,
} from '../../../globals';
import FormImage from './../FormImage/FormImage';
import Modal from './../../../UI/Modal/Modal';
import ModalAlert from './../../../UI/Modal/ModalAlert/ModalAlert';
import { checkImageName, checkValidity } from '../utils';
import FormGroup from '../FormGroup';
import ArticleStatus from './../AddArticle/ArticleStatus/ArticleStatus';
import ArticleContent from '../AddArticle/ArticleContent';
import { useSelector } from 'react-redux';
import FormControls from '../FormControls/FormControls';
import { useRouteMatch } from 'react-router-dom';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import Loader from './../../../UI/Loader/Loader';
import Toast from './../../../UI/Toast/Toast';

const EditArticleForm = ({ article }) => {
  const token = useSelector((state) => state.auth.token);
  const match = useRouteMatch();
  const articleId = match.params.articleId;
  const backRoutePrefix = match.path
    .split('/:')[0]
    .split('/')
    .filter((_, index, arr) => index !== arr.length - 1)
    .join('/');
  const backRoute = `${backRoutePrefix}/${articleId}`;

  const inputFileRef = useRef();
  const imgRef = useRef();
  const editorRef = useRef();
  const submitBtnRef = useRef();
  const cancelBtnRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [imgAlert, setImgAlert] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);

  const [showToast, setShowToast] = useState(false);

  const [form, setForm] = useState({
    image: {
      data: null,
      isValid: true,
    },
    title: {
      value: article.title,
      validation: {
        isRequired: true,
        minLength: 5,
        defaultErrMsg: 'Title is required',
        mainErrMsg: 'Title should have at least 5 characters',
      },
      isValid: true,
      touched: false,
      focused: true,
      errMsg: null,
    },
    status: {
      isValid: true,
      value: article.status,
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
  useEffect(() => {
    editorRef.current.editor.setData(article.content);
  }, []);
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
  const editorChangeHandler = () => {
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
  const submitHandler = (e) => {
    e.preventDefault();
    const formInfo = { ...form };
    const formData = new FormData();
    formData.append('image', formInfo.image.data);
    for (const key in formInfo) {
      if (key !== 'image') {
        formData.append(key, formInfo[key].value);
      }
    }
    setLoading(true);
    setFetchErr(false);
    setShowToast(false);
    axios
      .put(`/articles/${articleId}?token=${token}`, formData)
      .then(({ data }) => {
        // console.log(data);
        setLoading(false);
        setShowToast(true);
        disableButtons();
        setTimeout(() => {
          cancelBtnRef.current.click();
        }, EDIT_ARTICLE_TOAST_CLOSE_TIME);
      })
      .catch((err) => {
        setLoading(false);
        const res = err.response;
        if (res && res.data.errCode === 100) {
          const errMsgs = res.data.errMsgs;
          const formInfo = { ...form };
          errMsgs.forEach((err) => {
            const key = err.param;
            formInfo[key].errMsg = err.msg;
            formInfo[key].isValid = false;
            formInfo[key].touched = true;
          });
          setForm(formInfo);
        } else {
          setFetchErr(true);
        }
      });
  };
  const disableButtons = () => {
    submitBtnRef.current.disabled = true;
    cancelBtnRef.current.classList.add('disabled');
  };
  return (
    <Fragment>
      {showToast ? (
        <Toast
          message="Article updated successfully"
          closeClickHandler={() => setShowToast(false)}
          autoCloseTime={EDIT_ARTICLE_TOAST_CLOSE_TIME}
          type="success"
        />
      ) : null}
      {loading ? <Loader /> : null}
      <Modal show={fetchErr} backdropClickHandler={() => setFetchErr(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
      <Modal show={showModal} backdropClickHandler={() => setShowModal(false)}>
        <ModalAlert message={imgAlert} />
      </Modal>
      <form
        className="form form--secondary"
        autoComplete="off"
        onSubmit={submitHandler}>
        <h2 className="form__heading">Edit your article</h2>
        <FormImage
          clickIconHandler={clickIconHandler}
          changeImageHandler={changeImageHandler}
          inputRef={inputFileRef}
          imgRef={imgRef}
          imagePath={`${SERVER_IMAGE_FOLDER}/${article.poster}`}
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
          cancelRoute={backRoute}
          disabled={!isFormValid()}
          submitBtnRef={submitBtnRef}
          cancelBtnRef={cancelBtnRef}
        />
      </form>
    </Fragment>
  );
};

export default EditArticleForm;
