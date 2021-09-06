import * as actionTypes from './../actions/actionTypes';
const initState = {
  token: null,
  userId: null,
  role: null,
};
export const authReducer = (state = initState, action) => {
  if (action.type === actionTypes.AUTH_SET_INFO) {
    return {
      token: action.payload.token,
      userId: action.payload.id,
      role: action.payload.role,
    };
  }
  if (action.type === actionTypes.AUTH_LOG_OUT) {
    return {
      token: null,
      userId: null,
    };
  }
  if (action.type === actionTypes.AUTH_RESET_INFO) {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      role: localStorage.getItem('role'),
    };
  }
  return state;
};
