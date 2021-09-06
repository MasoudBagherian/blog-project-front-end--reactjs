import * as actionTypes from './actionTypes';
let timer;
const saveAuthInfo = (token, id, role) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', id);
  localStorage.setItem('role', role);
};
const removeAuthInfo = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
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
export const authResetInfo = () => ({
  type: actionTypes.AUTH_RESET_INFO,
});
export const authFetchInfo = (authData) => {
  const { token, userId: id, expiresIn, role } = authData;
  return (dispatch) => {
    dispatch(authSetInfo(token, id, role));
    saveAuthInfo(token, id, role);
    timer = setTimeout(() => {
      dispatch(authLogout());
    }, expiresIn);
  };
};
