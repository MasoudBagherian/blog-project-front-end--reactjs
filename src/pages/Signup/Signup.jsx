import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SignupForm from '../../components/forms/Signup/SignupForm';
import Main from '../../hoc/Main';

const Signup = (props) => {
  useEffect(() => {
    if (props.isAuth) {
      if (props.role === 'admin') {
        props.history.push('/admin');
      }
      if (props.role === 'blogger') {
        props.history.push('/dashboard');
      }
    }
  }, []);
  return (
    <Main>
      <SignupForm />
    </Main>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null,
  role: state.auth.role,
});
export default connect(mapStateToProps)(Signup);
