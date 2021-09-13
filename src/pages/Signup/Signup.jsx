import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignupForm from '../../components/forms/Signup/SignupForm';
import Main from '../../hoc/Main';
import { useHistory } from 'react-router-dom';
const Signup = (props) => {
  const history = useHistory();
  const role = useSelector((state) => state.auth.role);
  const isAuth = useSelector((state) => state.auth.token !== null);
  useEffect(() => {
    if (isAuth) {
      if (role === 'admin') {
        history.push('/admin');
      }
      if (role === 'blogger') {
        history.push('/dashboard');
      }
    }
  }, []);
  return (
    <Main>
      <SignupForm />
    </Main>
  );
};

export default Signup;
