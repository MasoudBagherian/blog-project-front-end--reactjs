import React, { useState, Fragment } from 'react';

import { SERVER_IMAGE_FOLDER } from './../../../../../../globals';

import moment from 'moment';
import { FaTrashAlt as DeleteIcon } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Modal from '../../../../../../UI/Modal/Modal';
import ModalWindow from './../../../../../../UI/Modal/ModalWindow/ModalWindow';

const Comment = (props) => {
  const role = useSelector((state) => state.auth.role);
  const [showModal, setShowModal] = useState(false);
  const deleteComment = () => {
    setShowModal(false);
    props.deleteBtnClickHandler(props.id);
  };
  return (
    <Fragment>
      <Modal show={showModal} backdropClickHandler={() => setShowModal(false)}>
        <ModalWindow
          question="Are you sure you want to delete this comment?"
          cancelClickHandler={() => setShowModal(false)}
          deleteClickHandler={deleteComment}
        />
      </Modal>

      <div className="comment">
        <div className="comment__profile">
          <div className="comment__avatar-wrapper">
            <div className="comment__avatar">
              <img src={`${SERVER_IMAGE_FOLDER}/${props.avatar}`} alt="" />
            </div>
          </div>
          <div className="comment__info">
            <div className="author">
              <span className="author__firstname">{props.firstname}</span>
              <span className="author__lastname"> {props.lastname}</span>
            </div>
            <div className="date">
              <span className="date__time" id="date">
                {moment(props.date).format('MMMM Do YYYY h:mm a')}
              </span>
            </div>
          </div>
        </div>
        <pre className="comment__text">{props.content}</pre>
        {role === 'admin' ? (
          <button
            className="comment__btn"
            onClick={() => {
              setShowModal(true);
              props.closeToast();
            }}>
            <div className="icon">
              <DeleteIcon className="icon-delete" />
            </div>
            <div className="text">delete</div>
          </button>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Comment;
