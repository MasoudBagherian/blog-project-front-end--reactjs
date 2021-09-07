import React, { useState, useRef, Fragment } from 'react';
import Modal from '../../../UI/Modal/Modal';
import ModalAlert from '../../../UI/Modal/ModalAlert/ModalAlert';
import FormGroup from '../FormGroup';
import FormImage from '../FormImage/FormImage';
import { checkImageName, checkValidity } from '../utils';
import ArticleContent from './ArticleContent';
import { ARTICLE_INFO } from './articleInfo';
import ArticleStatus from './ArticleStatus/ArticleStatus';

const AddArticleForm = () => {
  const inputFileRef = useRef();
  const imgRef = useRef();
  const editorRef = useRef();

  const [form, setForm] = useState(ARTICLE_INFO);
  const [showModal, setShowModal] = useState(false);
  const [imgAlert, setImgAlert] = useState(null);

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
  return (
    <Fragment>
      <Modal show={showModal} backdropClickHandler={() => setShowModal(false)}>
        <ModalAlert message={imgAlert} />
      </Modal>
      <form className="form form--secondary" autoComplete="off">
        <h2 className="form__heading">Add an article</h2>
        <FormImage
          clickIconHandler={clickIconHandler}
          changeImageHandler={changeImageHandler}
          inputRef={inputFileRef}
          imgRef={imgRef}
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
        {/* <pre>{JSON.stringify(form.content, null, 2)}</pre> */}
      </form>
    </Fragment>
  );
};

export default AddArticleForm;
