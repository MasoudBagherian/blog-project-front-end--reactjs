import * as actionTypes from './actionTypes';
let timer;
const saveAuthInfo = (token, id, role, expirationDate) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', id);
  localStorage.setItem('role', role);
  localStorage.setItem('expirationDate', expirationDate);
};
const removeAuthInfo = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
  localStorage.removeItem('expirationDate');
};
const authSetInfo = (token, id, role) => ({
  type: actionTypes.AUTH_SET_INFO,
  payload: { token, id, role },
});
export const authLogout = () => {
  removeAuthInfo();
  clearTimeout(timer);
  return {
    type: actionTypes.AUTH_LOG_OUT,
  };
};
const authInit = () => ({
  type: actionTypes.AUTH_INIT,
});
export const authResetInfo = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return dispatch(authLogout());
    }
    const expirationDate = localStorage.getItem('expirationDate');
    const timeDiff = new Date(expirationDate).getTime() - new Date().getTime();
    if (timeDiff >= 0) {
      dispatch(authInit());
      console.log(`timer in authResetInfo: ${timer}`);
      timer = setTimeout(() => {
        dispatch(authLogout());
      }, timeDiff);
    } else {
      dispatch(authLogout());
    }
  };
  return {
    type: actionTypes.AUTH_RESET_INFO,
  };
};
export const authFetchInfo = (authData) => {
  const { token, userId: id, expiresIn, role } = authData;
  return (dispatch) => {
    dispatch(authSetInfo(token, id, role));
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    saveAuthInfo(token, id, role, expirationDate);

    timer = setTimeout(() => {
      dispatch(authLogout());
    }, expiresIn);
  };
};
