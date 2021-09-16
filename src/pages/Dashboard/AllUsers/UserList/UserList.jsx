import React, { useState, Fragment } from 'react';

import UserCard from './UserCard/UserCard';
import { axiosInstance as axios } from './../../../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import { DELETE_USER_TOAST_CLOSE_TIME } from '../../../../globals';
import Toast from './../../../../UI/Toast/Toast';

const UserList = (props) => {
  const token = useSelector((state) => state.auth.token);

  const [toastInfo, setToastInfo] = useState({
    type: null,
    show: false,
    message: null,
  });
  const [loading, setLoading] = useState(false);
  const closeToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.show = false;
    setToastInfo(toastInfoCpy);
  };
  const showSuccessToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.show = true;
    toastInfoCpy.message = 'Deleting blogger successfully done';
    toastInfoCpy.type = 'success';
    setToastInfo(toastInfoCpy);
  };
  const showErrorToast = () => {
    const toastInfoCpy = { ...toastInfo };
    toastInfoCpy.show = true;
    toastInfoCpy.message = 'Deleting blogger failed. Try again';
    toastInfoCpy.type = 'error';
    setToastInfo(toastInfoCpy);
  };
  const deleteUser = (userId) => {
    setLoading(true);
    axios
      .delete(`/users/${userId}?token=${token}`)
      .then(({ data }) => {
        setLoading(false);
        showSuccessToast();
        console.log(data);
        setTimeout(() => {
          props.fetchUsers();
        }, DELETE_USER_TOAST_CLOSE_TIME);
      })
      .catch((err) => {
        setLoading(false);
        showErrorToast();
        console.log(err.response);
      });
  };
  return (
    <Fragment>
      {toastInfo.show ? (
        <Toast
          message={toastInfo.message}
          closeClickHandler={closeToast}
          autoCloseTime={DELETE_USER_TOAST_CLOSE_TIME}
          type={toastInfo.type}
        />
      ) : null}

      <div className="user-cards">
        {props.users.map((user) => (
          <UserCard
            key={user.id}
            avatar={user.avatar}
            username={user.username}
            firstname={user.firstname}
            lastname={user.lastname}
            email={user.email}
            date={user.date}
            id={user.id}
            deleteUser={deleteUser}
            closeToast={closeToast}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default UserList;
