import React from 'react';
import CardButton from '../../../../components/CardButton/CardButton';
import { FaEdit as EditIcon } from 'react-icons/fa';
const ProfileCard = () => {
  return (
    <div className="profile">
      <CardButton type="profile" />
      <div className="profile__body">
        <div className="profile__image">
          <div className="image">
            <img src="http://localhost:5000/assets/image/ragnar.jpg" alt="" />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <span className="firstname" id="firstname">
              emma
            </span>
            <span className="lastname" id="lastname">
              stone
            </span>
          </div>
          <div className="profile__email" id="email">
            emma@test.com
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
