import React, { useRef, useState, Fragment } from 'react';
import { checkImageName } from '../utils';
import Modal from './../../../UI/Modal/Modal';
import ModalAlert from './../../../UI/Modal/ModalAlert/ModalAlert';
import {
  EDIT_PROFILE_TOAST_CLOSE_TIME,
  SERVER_IMAGE_FOLDER,
} from './../../../globals';
import FormImage from './../FormImage/FormImage';
import FormGroup from './../FormGroup';
import { checkValidity } from './../utils';
import FormControls from '../FormControls/FormControls';
import { useSelector, useDispatch } from 'react-redux';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import withAjax from './../../../hoc/withAjax';
import { allActions } from './../../../redux/actions/allActions';

import { useHistory } from 'react-router-dom';
import Toast from './../../../UI/Toast/Toast';
import Loader from './../../../UI/Loader/Loader';

const EditProfileForm = ({ user }) => {
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const history = useHistory();

  const inputFileRef = useRef();
  const imgRef = useRef();
  const submitBtnRef = useRef();
  const cancelBtnRef = useRef();
  const [form, setForm] = useState({
    image: {
      data: null,
      isValid: true,
    },
    firstname: {
      focused: true,
      value: user.firstname,
      errMsg: null,
      isValid: true,
      touched: false,
      validation: {
        isRequired: true,
        minLength: 2,
        isName: true,
        defaultErrMsg: 'First name is required',
        mainErrMsg:
          'First name should have at least 2 characters and contains only space and alphabet characters',
      },
    },
    lastname: {
      focused: true,
      value: user.lastname,
      errMsg: null,
      isValid: true,
      touched: false,
      validation: {
        isRequired: true,
        minLength: 2,
        isName: true,
        defaultErrMsg: 'Last name is required',
        mainErrMsg:
          'Last name should have at least 2 characters and contains only space and alphabet characters',
      },
    },
    email: {
      focused: true,
      value: user.email,
      errMsg: null,
      isValid: true,
      touched: false,
      validation: {
        isRequired: true,
        isEmail: true,
        defaultErrMsg: 'Email is required',
        mainErrMsg: 'Please enter a valid E-Mail',
      },
    },
    username: {
      focused: true,
      value: user.username,
      errMsg: null,
      isValid: true,
      touched: false,
      validation: {
        isRequired: true,
        minLength: 8,
        maxLength: 20,
        defaultErrMsg: 'Username is required',
        mainErrMsg: 'Username should have between 8 and 20 characters',
      },
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [imgAlert, setImgAlert] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
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
      formInfo[key].value = '';
      formInfo[key].errMsg = null;
      formInfo[key].touched = false;
    }
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
    const formData = new FormData();
    const formInfo = { ...form };
    formData.append('image', formInfo.image.data);
    for (const key in formInfo) {
      if (key !== 'image') {
        formData.append(key, formInfo[key].value);
      }
    }
    setLoading(true);
    setFetchErr(false);
    axios
      .put(`/users/edit-profile?token=${token}`, formData)
      .then(({ data }) => {
        setShowToast(true);
        setLoading(false);
        setTimeout(() => {
          history.push(role === 'admin' ? '/admin' : '/dashboard');
        }, EDIT_PROFILE_TOAST_CLOSE_TIME);
        dispatch(allActions.userFetchInfo());
      })
      .catch((err) => {
        const res = err.response;
        setLoading(false);
        if (res && res.data.errCode === 100) {
          const errMsgs = err.response.data.errMsgs;
          const formInfo = { ...form };
          errMsgs.forEach((err) => {
            const key = err.param;
            formInfo[key].errMsg = err.msg;
            formInfo[key].touched = true;
            formInfo[key].isValid = false;
          });
          setForm(formInfo);
        } else {
          setFetchErr(true);
        }
      });
  };
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Modal show={fetchErr} backdropClickHandler={() => setFetchErr(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
      {showToast ? (
        <Toast
          message="Profile updated successfuly"
          closeClickHandler={() => setShowToast(false)}
          autoCloseTime={EDIT_PROFILE_TOAST_CLOSE_TIME}
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
        <h2 className="form__heading">Edit your profile</h2>
        <FormImage
          clickIconHandler={clickIconHandler}
          changeImageHandler={changeImageHandler}
          inputRef={inputFileRef}
          imgRef={imgRef}
          imagePath={`${SERVER_IMAGE_FOLDER}/${user.avatar}`}
        />
        <FormGroup
          label="firstname"
          formField={form.firstname}
          name="firstname"
          inputChangeHandler={inputChangeHandler}
          inputFocusHandler={inputFocusHandler}
          inputBlurHandler={inputBlurHandler}
        />
        <FormGroup
          label="lastname"
          formField={form.lastname}
          name="lastname"
          inputChangeHandler={inputChangeHandler}
          inputFocusHandler={inputFocusHandler}
          inputBlurHandler={inputBlurHandler}
        />
        <FormGroup
          label="email"
          formField={form.email}
          name="email"
          inputChangeHandler={inputChangeHandler}
          inputFocusHandler={inputFocusHandler}
          inputBlurHandler={inputBlurHandler}
        />
        <FormGroup
          label="username"
          formField={form.username}
          name="username"
          inputChangeHandler={inputChangeHandler}
          inputFocusHandler={inputFocusHandler}
          inputBlurHandler={inputBlurHandler}
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

export default EditProfileForm;
