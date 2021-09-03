import React from 'react';

const Toast = (props) => {
  return (
    <div className="toast">
      <p className="toast__message">{props.message}</p>
    </div>
  );
};

export default Toast;
