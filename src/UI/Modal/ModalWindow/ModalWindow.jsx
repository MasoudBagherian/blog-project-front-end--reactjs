import React from 'react';

const ModalWindow = (props) => {
  return (
    <div className="modal-window">
      <p className="modal-window__question">{props.question}</p>
      <div className="modal-window__controls">
        <button
          className="modal-window__btn form__btn btn-danger"
          onClick={props.deleteClickHandler}>
          delete
        </button>
        <button
          className="modal-window__btn form__btn btn-tritiary"
          onClick={props.cancelClickHandler}>
          cancel
        </button>
      </div>
    </div>
  );
};
export default ModalWindow;
