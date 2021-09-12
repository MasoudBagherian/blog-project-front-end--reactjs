import React, { useState, useEffect } from 'react';
import EditProfileForm from '../../../components/forms/EditProfile/EditProfileForm';
import Main from './../../../hoc/Main';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import AlertPrimary from './../../../UI/alerts/AlertPrimary';
import Loader from './../../../UI/Loader/Loader';
import Modal from './../../../UI/Modal/Modal';
import ModalAlert from './../../../UI/Modal/ModalAlert/ModalAlert';

const EditProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState({
    firstname: null,
    lastname: null,
    email: null,
    avatar: null,
    username: null,
  });
  const [fetchErr, setFetchErr] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showErrModal, setShowErrModal] = useState(false);
  useEffect(() => {
    setFetchErr(false);
    setFetchEnd(false);
    setLoading(true);
    setShowErrModal(false);
    axios
      .get(`/users/info?token=${token}`)
      .then(({ data }) => {
        const { username, avatar, firstname, lastname, email } = data.user;
        setUser({ username, avatar, firstname, lastname, email });
        setLoading(false);
        setFetchEnd(true);
      })
      .catch((err) => {
        setFetchErr(true);
        setShowErrModal(true);
        setLoading(false);
        setFetchEnd(true);
      });
  }, []);
  return (
    <Main>
      {loading ? <Loader /> : null}
      <Modal
        show={showErrModal}
        backdropClickHandler={() => setShowErrModal(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
      {!fetchEnd ? null : fetchErr ? (
        <AlertPrimary message="Fetching user data from server failed!" />
      ) : (
        <EditProfileForm user={user} />
      )}
    </Main>
  );
};

export default EditProfile;
