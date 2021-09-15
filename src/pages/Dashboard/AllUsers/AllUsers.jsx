import React, { useState, useEffect, Fragment } from 'react';
import Main from './../../../hoc/Main';
import AlertPrimary from './../../../UI/alerts/AlertPrimary';
import LabelSecondary from './../../../UI/labels/LabelSecondary';
import UserList from './UserList/UserList';

import { useSelector } from 'react-redux';
import ModalAlert from './../../../UI/Modal/ModalAlert/ModalAlert';
import Loader from './../../../UI/Loader/Loader';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import Modal from '../../../UI/Modal/Modal';

const AllUsers = () => {
  const token = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFetchErr(false);
    setFetchSuccess(false);
    setFetchEnd(false);
    axios
      .get(`/users?token=${token}`)
      .then(({ data }) => {
        // console.log(data);
        setLoading(false);
        setFetchSuccess(true);
        const bloggers = data.users.filter((user) => user.role !== 'admin');
        setUsers(bloggers);
        setFetchEnd(true);
      })
      .catch((err) => {
        setLoading(false);
        setFetchErr(true);
        setFetchSuccess(false);
        setFetchEnd(true);
      });
  }, []);

  let userList = null;
  if (fetchEnd) {
    if (fetchSuccess) {
      userList = (
        <Fragment>
          <LabelSecondary label="all users" />
          <UserList users={users} />
        </Fragment>
      );
    } else {
      userList = <AlertPrimary message="Fetching users from server failed!" />;
    }
  }

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Modal show={fetchErr} backdropClickHandler={() => setFetchErr(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
      <Main>{userList}</Main>
    </Fragment>
  );
};

export default AllUsers;
