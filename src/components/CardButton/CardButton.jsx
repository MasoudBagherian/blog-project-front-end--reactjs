import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { RiLockPasswordFill as KeyIcon } from 'react-icons/ri';
import { FaTrashAlt as DeleteIcon } from 'react-icons/fa';
import { FaCheck as EditIcon } from 'react-icons/fa';
const configButton = (type) => {
  const settings = { icon: null, btnClass: null, overlayText: null };
  if (type === 'profile') {
    settings.btnClass = 'card-btn--profile';
    settings.icon = <KeyIcon className="icon-password" />;
    settings.overlayText = 'change password';
  }
  if (type === 'delete') {
    settings.btnClass = 'card-btn--delete';
    settings.icon = <DeleteIcon className="icon-delete" />;
    settings.overlayText = 'delete';
  }
  if (type === 'edit') {
    settings.btnClass = 'card-btn--edit';
    settings.icon = <EditIcon className="icon-edit" />;
    settings.overlayText = 'edit';
  }
  return settings;
};
const CardButton = (props) => {
  return (
    <Fragment>
      {props.noLink ? (
        <button
          className={`card-btn ${configButton(props.type).btnClass}`}
          onClick={props.clickHandler}>
          <div className="icon">{configButton(props.type).icon}</div>
          <div className="overlay">{configButton(props.type).overlayText}</div>
        </button>
      ) : (
        <Link
          to={props.btnRoute}
          className={`card-btn ${configButton(props.type).btnClass}`}>
          <div className="icon">{configButton(props.type).icon}</div>
          <div className="overlay">{configButton(props.type).overlayText}</div>
        </Link>
      )}
    </Fragment>
  );
};

export default CardButton;
