import React from 'react';
import { SERVER_IMAGE_FOLDER, DEFAULT_USER_AVATAR } from '../../globals';

const Welcome = (props) => {
  const image = props.avatar ? props.avatar : DEFAULT_USER_AVATAR;
  return (
    <div className="welcome">
      <div className="welcome__avatar">
        <img src={`${SERVER_IMAGE_FOLDER}/${image}`} alt="" />
      </div>
      <h2 className="welcome__text">
        welcome
        <span className="welcome__username">{props.username}</span>
      </h2>
    </div>
  );
};
export default Welcome;
