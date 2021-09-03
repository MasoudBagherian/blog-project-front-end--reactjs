import React from 'react';

const ModalAlert = (props) => {
  return (
    <div className="modal-alert">
      <p className="modal-alert__text">{props.message}</p>
    </div>
  );
};

export default ModalAlert;
