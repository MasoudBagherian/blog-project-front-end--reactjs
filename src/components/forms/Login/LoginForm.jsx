import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormFooter from '../FormFooter';
import FormGroup from '../FromGroup';
import { axiosInstance as axios } from './../../../utils/axiosConfig';

const LoginForm = () => {
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
  const submitHandler = (e) => {
    e.preventDefault();
    const formInfo = { ...form };
    const data = {};
    for (const key in formInfo) {
      data[key] = formInfo[key].value.trim();
    }
    axios
      .post('/auth/login', data)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
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
          // disabled={!isFormValid()}
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
  );
};

export default LoginForm;
