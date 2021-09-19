import React from 'react';
import { SERVER_IMAGE_FOLDER, DEFAULT_USER_AVATAR } from '../../globals';

const Welcome = (props) => {
  const image = props.avatar ? `${SERVER_IMAGE_FOLDER}/${props.avatar}` : null;
  return (
    <div className="welcome">
      <div className="welcome__avatar">
        <img src={image} alt="" />
      </div>
      <h2 className="welcome__text">
        welcome
        <span className="welcome__username">{props.username}</span>
      </h2>
    </div>
  );
};
export default Welcome;
