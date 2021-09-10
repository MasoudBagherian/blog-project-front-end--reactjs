import React from 'react';
import CardButton from '../../../../components/CardButton/CardButton';
import { FaEdit as EditIcon } from 'react-icons/fa';
import { SERVER_IMAGE_FOLDER, DEFAULT_USER_AVATAR } from '../../../../globals';
const ProfileCard = ({ user }) => {
  const image = user.avatar ? user.avatar : DEFAULT_USER_AVATAR;
  return (
    <div className="profile">
      <CardButton type="profile" />
      <div className="profile__body">
        <div className="profile__image">
          <div className="image">
            <img src={`${SERVER_IMAGE_FOLDER}/${image}`} alt="" />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <span className="firstname">{user.firstname}</span>
            <span className="lastname">{user.lastname}</span>
          </div>
          <div className="profile__email" id="email">
            {user.email}
          </div>
        </div>
      </div>
      <a className="profile__btn" id="edit-profile-link">
        <EditIcon className="icon-edit-profile" />
        edit profile
      </a>
    </div>
  );
};

export default ProfileCard;
