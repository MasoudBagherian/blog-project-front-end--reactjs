import React, { useState, useRef, Fragment } from 'react';
import FormFooter from '../FormFooter';
import FormGroup from '../FormGroup';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import Toast from './../../../UI/Toast/Toast';

import { useSelector, useDispatch } from 'react-redux';
import { allActions } from './../../../redux/actions/allActions';
import { Redirect } from 'react-router-dom';
import { LOGIN_TOAST_CLOSE_TIME } from '../../../globals';
import Loader from './../../../UI/Loader/Loader';
import Modal from './../../../UI/Modal/Modal';
import ModalAlert from './../../../UI/Modal/ModalAlert/ModalAlert';

const LoginForm = (props) => {
  const role = useSelector((state) => state.auth.role);
  const isAuth = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();
  const submitBtnRef = useRef();

  const [form, setForm] = useState({
    email: {
      focused: false,
      value: '',
      isValid: false,
      errMsg: null,
      touched: false,
      defaultErrMsg: 'E-Mail is required',
    },
    password: {
      focused: false,
      value: '',
      isValid: false,
      errMsg: null,
      touched: false,
      defaultErrMsg: 'Password is required',
    },
  });
  const [toastInfo, setToastInfo] = useState({
    type: null,
    show: false,
    message: null,
  });
  const [redirect, setRedirect] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);

  const isFormValid = () => {
    const formInfo = { ...form };
    for (const key in formInfo) {
      if (formInfo[key].value === '') {
        return false;
      }
    }
    return true;
  };
  const inputChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const formInfo = { ...form };
    formInfo[key].value = value;
    formInfo[key].touched = true;
    formInfo[key].isValid = value.trim() === '' ? false : true;
    formInfo[key].errMsg =
      value.trim() === '' ? formInfo[key].defaultErrMsg : null;
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
      formInfo[key].value = '';
      formInfo[key].focused = false;
      formInfo[key].touched = false;
      formInfo[key].isValid = false;
      formInfo[key].errMsg = null;
    }
    setForm(formInfo);
  };
  const showSuccessToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.type = 'success';
    toastInfoCpy.message = 'Login successfully done';
    toastInfoCpy.show = true;
    setToastInfo(toastInfoCpy);
  };
  const showErrorToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.type = 'error';
    toastInfoCpy.message = 'E-Mail or password is incorrect';
    toastInfoCpy.show = true;
    setToastInfo(toastInfoCpy);
  };
  const hideToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.show = false;
    setToastInfo(toastInfoCpy);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formInfo = { ...form };
    const data = {};
    for (const key in formInfo) {
      data[key] = formInfo[key].value.trim();
    }
    hideToast();
    setLoading(true);
    setFetchErr(false);
    axios
      .post('/auth/login', data)
      .then(({ data }) => {
        setLoading(false);
        showSuccessToast();
        setAuthSuccess(true);
        dispatch(allActions.authFetchInfo(data));
        setTimeout(() => {
          setRedirect(true);
        }, LOGIN_TOAST_CLOSE_TIME);
        submitBtnRef.current.disabled = true;
      })
      .catch((err) => {
        const res = err.response;
        setLoading(false);
        if (res && res.data.errCode === 100) {
          showErrorToast();
        } else {
          setFetchErr(true);
        }
      });
  };
  const closeToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.show = false;
    setToastInfo(toastInfoCpy);
  };
  let dashboardRedirect = null;
  if (redirect || (!authSuccess && isAuth)) {
    if (role === 'admin') {
      dashboardRedirect = <Redirect to="/admin" />;
    }
    if (role === 'blogger') {
      dashboardRedirect = <Redirect to="/dashboard" />;
    }
  }
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Modal show={fetchErr} backdropClickHandler={() => setFetchErr(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
      {dashboardRedirect}
      {toastInfo.show ? (
        <Toast
          type={toastInfo.type}
          message={toastInfo.message}
          closeClickHandler={closeToast}
          autoCloseTime={LOGIN_TOAST_CLOSE_TIME}
        />
      ) : null}
      <form className="form" autoComplete="off" onSubmit={submitHandler}>
        <div className="form__body">
          <h1 className="form__heading">Log in to BlogCenter</h1>
          <FormGroup
            label="email"
            name="email"
            formField={form.email}
            inputBlurHandler={inputBlurHandler}
            inputFocusHandler={inputFocusHandler}
            inputChangeHandler={inputChangeHandler}
          />
          <FormGroup
            label="password"
            name="password"
            formField={form.password}
            inputBlurHandler={inputBlurHandler}
            inputFocusHandler={inputFocusHandler}
            inputChangeHandler={inputChangeHandler}
          />
          <button
            disabled={!isFormValid()}
            ref={submitBtnRef}
            className="btn-primary form__btn">
            log in
          </button>
        </div>
        <FormFooter
          message="If you don't have an account, Please sign up"
          href="/auth/signup"
          btnValue="sing up"
        />
      </form>
    </Fragment>
  );
};

export default LoginForm;
