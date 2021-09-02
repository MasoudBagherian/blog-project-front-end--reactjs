import React, { useState, Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import FormGroup from './FromGroup';
import { checkImageName, checkValidity } from '../utils';
import FormImage from '../FormImage/FormImage';
import Modal from './../../../UI/Modal/Modal';
import ImageAlert from '../ImageAlert/ImageAlert';
import { axiosInstance as axios } from './../../../utils/axiosConfig';

const SignupForm = () => {
  const inputFileRef = useRef();
  const imgRef = useRef();
  const [form, setForm] = useState({
    firstname: {
      focused: false,
      value: '',
      validation: {
        isRequired: true,
        minLength: 2,
        isName: true,
        defaultErrMsg: 'First name is required',
        mainErrMsg:
          'First name should have at least 2 characters and contains only space and alphabet characters',
      },

      errMsg: null,
      isValid: false,
      touched: false,
    },
    lastname: {
      focused: false,
      value: '',
      validation: {
        isRequired: true,
        minLength: 2,
        isName: true,
        defaultErrMsg: 'Last name is required',
        mainErrMsg:
          'Last name should have at least 2 characters and contains only space and alphabet characters',
      },

      errMsg: null,
      isValid: false,
      touched: false,
    },
    email: {
      focused: false,
      value: '',
      validation: {
        isRequired: true,
        isEmail: true,
        defaultErrMsg: 'Email is required',
        mainErrMsg: 'Please enter a valid E-Mail',
      },

      errMsg: null,
      isValid: false,
      touched: false,
    },
    username: {
      focused: false,
      value: '',
      validation: {
        isRequired: true,
        minLength: 8,
        maxLength: 20,
        defaultErrMsg: 'Username is required',
        mainErrMsg: 'Username should have between 8 and 20 characters',
      },

      errMsg: null,
      isValid: false,
      touched: false,
    },
    password: {
      focused: false,
      value: '',
      validation: {
        isRequired: true,
        minLength: 8,
        maxLength: 20,
        isPassword: true,
        defaultErrMsg: 'Password is required',
        mainErrMsg:
          'Password should have between 8 and 20 characters and only alphabet and numeric characters and contain at least one capital letter and at least one small letter and at least one numeric character',
      },

      errMsg: null,
      isValid: false,
      touched: false,
    },
    passwordConfirm: {
      focused: false,
      value: '',
      isValid: false,
      errMsg: null,
      touched: false,
    },
    image: {
      isValid: true,
      data: null,
    },
  });
  const [imgAlert, setImgAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const confirmChangeHandler = (e) => {
    const value = e.target.value;
    const formInfo = { ...form };
    const password = formInfo.password;
    const confirm = formInfo.passwordConfirm;
    confirm.touched = false;
    confirm.isValid = false;
    confirm.errMsg = null;
    if (password.isValid) {
      confirm.touched = true;
      if (value.trim() === password.value.trim()) {
        confirm.isValid = true;
      } else {
        confirm.errMsg = 'Please confirm your password correctly';
      }
    }
    formInfo.passwordConfirm.value = value;
    setForm(formInfo);
  };
  const inputChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const formInfo = { ...form };
    if (key === 'password') {
      formInfo.passwordConfirm = {
        focused: false,
        value: '',
        isValid: false,
        errMsg: null,
        touched: false,
      };
    }
    const { isValid: validStatus, errMsg: message } = checkValidity(
      value,
      formInfo[key].validation
    );
    formInfo[key].value = value;
    formInfo[key].isValid = validStatus;
    formInfo[key].errMsg = message;
    formInfo[key].touched = true;
    setForm(formInfo);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formInfo = { ...form };
    const formData = new FormData();
    formData.append('image', formInfo.image.data);
    for (const key in formInfo) {
      formData.append(key, formInfo[key].value);
    }
    axios
      .post('/auth/signup', formData)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        const response = err.response.data;
        if (response.code === 100) {
          const errMsgs = response.errMsgs;
          const formInfo = { ...form };
          errMsgs.forEach((err) => {
            const key = err.param;
            const message = err.msg;
            formInfo[key].errMsg = message;
            formInfo[key].focused = false;
            formInfo[key].isValid = false;
            formInfo[key].touched = true;
          });
          setForm(formInfo);
        }
      });
    // console.log(formData)
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
      // e.target.value = ''
      formInfo.image.data = image;
      setForm(formInfo);
      return;
    }
    setShowModal(true);
    setImgAlert(imageAlert);
    e.target.value = '';
  };
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <Fragment>
      <Modal show={showModal} backdropClickHandler={hideModal}>
        <ImageAlert message={imgAlert} />
      </Modal>
      <form className="form" autoComplete="off" onSubmit={submitHandler}>
        <div className="form__body">
          <h1 className="form__heading">sign up in BlogCenter</h1>
          <FormImage
            clickIconHandler={clickIconHandler}
            changeImageHandler={changeImageHandler}
            inputRef={inputFileRef}
            imgRef={imgRef}
          />
          <FormGroup
            label="first name"
            formField={form.firstname}
            name="firstname"
            inputChangeHandler={inputChangeHandler}
            inputFocusHandler={inputFocusHandler}
            inputBlurHandler={inputBlurHandler}
          />
          <FormGroup
            label="last name"
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
          <FormGroup
            label="password"
            formField={form.password}
            name="password"
            inputChangeHandler={inputChangeHandler}
            inputFocusHandler={inputFocusHandler}
            inputBlurHandler={inputBlurHandler}
          />
          <FormGroup
            label="confirm password"
            formField={form.passwordConfirm}
            name="passwordConfirm"
            inputChangeHandler={confirmChangeHandler}
            inputFocusHandler={inputFocusHandler}
            inputBlurHandler={inputBlurHandler}
          />
          <button
            disabled={!isFormValid()}
            className="btn-primary form__btn"
            type="submit">
            sign up
          </button>
        </div>
        <div className="form__footer">
          <p className="form__message">
            If you have an account, You can log in
          </p>
          <Link to="/auth/login" className="form__btn btn-secondary">
            log in
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

export default SignupForm;
