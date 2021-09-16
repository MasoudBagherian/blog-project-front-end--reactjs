import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Intro from './pages/Intro/Intro';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import { allActions } from './redux/actions/allActions';
import Logout from './components/Logout';
import { connect } from 'react-redux';
class App extends Component {
  constructor(props) {
    super(props);
    props.resetAuthInfo();
  }
  componentDidUpdate() {
    console.log('app.js re-rendered');
  }
  render() {
    return (
      <Fragment>
        <Route path="/" exact component={Intro} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin" component={Dashboard} />
        <Route path="/logout" component={Logout} />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetAuthInfo: () => dispatch(allActions.authResetInfo()),
});

export default connect(null, mapDispatchToProps)(App);
