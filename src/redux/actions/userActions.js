import * as actionTypes from './actionTypes';
import { axiosInstance as axios } from './../../utils/axiosConfig';
const userSetInfo = (username, avatar) => ({
  type: actionTypes.USER_SET_INFO,
  payload: { username, avatar },
});

export const userFetchInfo = () => {
  return (dispatch, getState) => {
    axios.get(`/users/info?token=${getState().auth.token}`).then(({ data }) => {
      const { username, avatar } = data.user;
      dispatch(userSetInfo(username, avatar));
    });
  };
};
