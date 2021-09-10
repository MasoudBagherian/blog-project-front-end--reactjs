import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignupForm from '../../components/forms/Signup/SignupForm';
import Main from '../../hoc/Main';

const Signup = (props) => {
  const role = useSelector((state) => state.auth.role);
  const isAuth = useSelector((state) => state.auth.token !== null);
  useEffect(() => {
    if (isAuth) {
      if (role === 'admin') {
        props.history.push('/admin');
      }
      if (role === 'blogger') {
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
// const mapStateToProps = (state) => ({
//   isAuth: state.auth.token !== null,
//   role: state.auth.role,
// });
// export default connect(mapStateToProps)(Signup);
export default Signup;
