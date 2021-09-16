import React, { useState, Fragment } from 'react';
import { SERVER_IMAGE_FOLDER } from './../../../../../globals';

import { formatDate } from './../../../../../utils/formatDate';
import { Link } from 'react-router-dom';

import ModalWindow from './../../../../../UI/Modal/ModalWindow/ModalWindow';
import Modal from '../../../../../UI/Modal/Modal';

const UserCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <Modal show={showModal} backdropClickHandler={() => setShowModal(false)}>
        <ModalWindow
          question="Are you sure you want to delete this blogger?"
          cancelClickHandler={() => setShowModal(false)}
          deleteClickHandler={() => {
            setShowModal(false);
            props.deleteUser(props.id);
          }}
        />
      </Modal>
      <div className="user-card-wrapper">
        <div className="user-card">
          <div className="user-card__avatar">
            <img src={`${SERVER_IMAGE_FOLDER}/${props.avatar}`} alt="" />
          </div>
          <div className="user-card__info">
            <ul className="user-card__list">
              <li className="user-card__item">
                <span className="user-card__badge">username</span>
                <span className="user-card__value">{props.username}</span>
              </li>
              <li className="user-card__item">
                <span className="user-card__badge">firstname</span>
                <span className="user-card__value">{props.firstname}</span>
              </li>
              <li className="user-card__item">
                <span className="user-card__badge">lastname</span>
                <span className="user-card__value">{props.lastname}</span>
              </li>
              <li className="user-card__item">
                <span className="user-card__badge">email</span>
                <span className="user-card__value">{props.email}</span>
              </li>
              <li className="user-card__item">
                <span className="user-card__badge">joined at</span>
                <span className="user-card__value">
                  {formatDate(props.date)}
                </span>
              </li>
            </ul>
          </div>
          <div className="user-card__controls">
            <Link
              to={`/admin/user-articles/${props.id}`}
              className="user-card__btn user-card__btn--articles">
              view articles
            </Link>
            <button
              className="user-card__btn user-card__btn--delete"
              onClick={() => {
                props.closeToast();
                setShowModal(true);
              }}>
              delete user
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserCard;
