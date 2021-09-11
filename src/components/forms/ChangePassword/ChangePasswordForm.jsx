import React, { useState, useRef, Fragment } from 'react';
import FormGroup from './../FormGroup';
import { checkValidity } from './../utils';
import { useSelector } from 'react-redux';
import FormControls from '../FormControls/FormControls';
import { axiosInstance as axios } from '../../../utils/axiosConfig';
import withAjax from './../../../hoc/withAjax';
import Toast from './../../../UI/Toast/Toast';
import { CHANGE_PASSWORD_TOAST_CLOSE_TIME } from '../../../globals';
import { useHistory } from 'react-router-dom';

const ChangePasswordForm = (props) => {
  const history = useHistory();
  const submitBtnRef = useRef();
  const cancelBtnRef = useRef();
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);
  const [showToast, setShowToast] = useState(false);
  const [form, setForm] = useState({
    password: {
      value: '',
      focused: false,
      touched: false,
      isValid: '',
      validation: {
        isRequired: true,
        defaultErrMsg: 'Password is Required',
      },
      errMsg: null,
    },
    newPassword: {
      focused: false,
      value: '',
      validation: {
        isRequired: true,
        minLength: 8,
        maxLength: 20,
        isPassword: true,
        defaultErrMsg: 'New password is required',
        mainErrMsg:
          'Password should have between 8 and 20 characters and only alphabet and numeric characters and contain at least one capital letter and at least one small letter and at least one numeric character',
      },
      errMsg: null,
      isValid: false,
      touched: false,
    },
    newPasswordConfirm: {
      focused: false,
      value: '',
      isValid: false,
      errMsg: null,
      touched: false,
    },
  });
  const inputChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const formInfo = { ...form };
    if (key === 'newPassword') {
      formInfo.newPasswordConfirm = {
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
  const confirmChangeHandler = (e) => {
    const value = e.target.value;
    const formInfo = { ...form };
    const password = formInfo.newPassword;
    const confirm = formInfo.newPasswordConfirm;
    confirm.touched = false;
    confirm.isValid = false;
    confirm.errMsg = null;
    if (password.isValid) {
      confirm.touched = true;
      if (value.trim() === password.value.trim()) {
        confirm.isValid = true;
      } else {
        confirm.errMsg = 'Please confirm your new password correctly';
      }
    }
    formInfo.newPasswordConfirm.value = value;
    setForm(formInfo);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formInfo = { ...form };
    const data = {
      password: formInfo.password.value.trim(),
      newPassword: formInfo.newPassword.value.trim(),
      newPasswordConfirm: formInfo.newPasswordConfirm.value.trim(),
    };
    setShowToast(false);
    axios
      .put(`/users/change-password?token=${token}`, data)
      .then(({ data }) => {
        console.log(data);
        setShowToast(true);
        setTimeout(() => {
          history.push('/logout');
        }, CHANGE_PASSWORD_TOAST_CLOSE_TIME);
      })
      .catch((err) => {
        if (err.response && err.response.data.errCode === 100) {
          console.log(err.response.data.errMsgs);
          const errMsgs = err.response.data.errMsgs;
          const formInfo = { ...form };
          errMsgs.forEach((err) => {
            const key = err.param;
            formInfo[key].isValid = false;
            formInfo[key].errMsg = err.msg;
            formInfo[key].touched = true;
            formInfo[key].focused = false;
          });
          setForm(formInfo);
        }
      });
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
  return (
    <Fragment>
      {showToast ? (
        <Toast
          message="Changing password successfully done"
          closeClickHandler={() => setShowToast(false)}
          autoCloseTime={CHANGE_PASSWORD_TOAST_CLOSE_TIME}
          type="success"
        />
      ) : null}
      <form
        className="form form--secondary"
        autoComplete="off"
        onSubmit={submitHandler}>
        <h2 className="form__heading">Change your password</h2>
        <FormGroup
          label="current password"
          formField={form.password}
          name="password"
          inputChangeHandler={inputChangeHandler}
          inputFocusHandler={inputFocusHandler}
          inputBlurHandler={inputBlurHandler}
        />
        <FormGroup
          label="new password"
          formField={form.newPassword}
          name="newPassword"
          inputChangeHandler={inputChangeHandler}
          inputFocusHandler={inputFocusHandler}
          inputBlurHandler={inputBlurHandler}
        />
        <FormGroup
          label="confirm new password"
          formField={form.newPasswordConfirm}
          name="newPasswordConfirm"
          inputChangeHandler={confirmChangeHandler}
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

export default withAjax(ChangePasswordForm, axios, { errCode: 100 });
