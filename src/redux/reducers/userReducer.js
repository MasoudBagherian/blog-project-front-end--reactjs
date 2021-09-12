import * as actionTypes from '../actions/actionTypes';

const initState = {
  avatar: null,
  username: null,
};

export const userReducer = (state = initState, action) => {
  if (action.type === actionTypes.USER_SET_INFO) {
    return {
      username: action.payload.username,
      avatar: action.payload.avatar,
    };
  }
  return state;
};
