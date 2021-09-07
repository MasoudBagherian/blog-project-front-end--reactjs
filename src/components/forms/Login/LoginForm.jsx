import React, { useState, useRef, Fragment } from 'react';
import FormFooter from '../FormFooter';
import FormGroup from '../FormGroup';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import Loader from './../../../UI/Loader/Loader';
import Toast from './../../../UI/Toast/Toast';
import Modal from './../../../UI/Modal/Modal';
import ModalAlert from '../../../UI/Modal/ModalAlert/ModalAlert';
import { connect } from 'react-redux';
import { allActions } from './../../../redux/actions/allActions';
import { Redirect } from 'react-router-dom';
import { LOGIN_TOAST_CLOSE_TIME } from '../../../globals';
import { LOGIN_INFO } from './loginInfo';

const LoginForm = (props) => {
  const submitBtnRef = useRef();
  const [form, setForm] = useState(LOGIN_INFO);
  const [showLoader, setShowLoader] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    type: null,
    show: false,
    message: null,
  });
  const [fetchErr, setFetchErr] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
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
    setShowLoader(true);
    setFetchErr(false);
    axios
      .post('/auth/login', data)
      .then(({ data }) => {
        // console.log(data);
        setShowLoader(false);
        showSuccessToast();
        setAuthSuccess(true);
        props.fetchAuthInfo(data);
        setTimeout(() => {
          setRedirect(true);
        }, LOGIN_TOAST_CLOSE_TIME);
        submitBtnRef.current.disabled = true;
      })
      .catch((err) => {
        setShowLoader(false);
        if (err.response) {
          const response = err.response.data;
          if (response.errCode === 100) {
            showErrorToast();
          } else {
            setFetchErr(true);
          }
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
  if (redirect || (!authSuccess && props.isAuth)) {
    if (props.role === 'admin') {
      dashboardRedirect = <Redirect to="/admin" />;
    }
    if (props.role === 'blogger') {
      dashboardRedirect = <Redirect to="/dashboard" />;
    }
  }
  return (
    <Fragment>
      {dashboardRedirect}
      {showLoader ? <Loader /> : null}
      {toastInfo.show ? (
        <Toast
          type={toastInfo.type}
          message={toastInfo.message}
          closeClickHandler={closeToast}
          autoCloseTime={LOGIN_TOAST_CLOSE_TIME}
        />
      ) : null}
      <Modal show={fetchErr} backdropClickHandler={() => setFetchErr(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
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
const mapStateToProps = (state) => ({
  role: state.auth.role,
  isAuth: state.auth.token !== null,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAuthInfo: (data) => dispatch(allActions.authFetchInfo(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
