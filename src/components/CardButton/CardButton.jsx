import React from 'react';
import { Link } from 'react-router-dom';
import { RiLockPasswordFill as KeyIcon } from 'react-icons/ri';
const configButton = (type) => {
  const settings = { icon: null, btnClass: null, overlayText: null };
  if (type === 'profile') {
    settings.btnClass = 'card-btn--profile';
    settings.icon = <KeyIcon className="icon-password" />;
    settings.overlayText = 'change password';
  }
  return settings;
};
const CardButton = (props) => {
  return (
    <Link
      to={props.btnRoute}
      className={`card-btn ${configButton(props.type).btnClass}`}>
      <div className="icon">{configButton(props.type).icon}</div>
      <div className="overlay">{configButton(props.type).overlayText}</div>
    </Link>
  );
};

export default CardButton;
