import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormFooter from '../FormFooter';
import FormGroup from './FormGroup';
const LoginForm = () => {
  const [form, setForm] = useState({
    email: {
      focused: false,
      value: '',
    },
    password: {
      focused: false,
      value: '',
    },
  });
  const inputChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    const formInfo = { ...form };
    formInfo[key].value = value;
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
    }
    setForm(formInfo);
  };
  return (
    <form className="form" autoComplete="off">
      {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
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
        <button className="btn-primary form__btn">log in</button>
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
