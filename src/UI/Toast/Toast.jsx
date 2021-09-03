import React, { useEffect, useRef } from 'react';
import { BiCheckShield as SuccessIcon } from 'react-icons/bi';
import { BsExclamationCircleFill as ErrorIcon } from 'react-icons/bs';

import { FaRegWindowClose as CloseIcon } from 'react-icons/fa';
const configToast = (type) => {
  let settings = { class: null, icon: null };
  if (type === 'success') {
    settings.icon = <SuccessIcon />;
    settings.class = 'toast--success';
  }
  if (type === 'error') {
    settings.icon = <ErrorIcon />;
    settings.class = 'toast--error';
  }
  return settings;
};
const Toast = (props) => {
  const closeBtnRef = useRef();
  useEffect(() => {
    let timer;
    if (props.autoCloseTime) {
      timer = setTimeout(() => {
        closeBtnRef.current.click();
      }, props.autoCloseTime);
    }
    return () => {
      if (props.autoCloseTime) {
        clearTimeout(timer);
      }
    };
  }, []);
  return (
    <div className={`toast ${configToast(props.type).class}`}>
      <button
        className="toast__btn"
        onClick={props.closeClickHandler}
        ref={closeBtnRef}>
        <CloseIcon className="toast__close" />
      </button>
      <div className="toast__icon">{configToast(props.type).icon}</div>
      <div className="toast__content">
        <div className="toast__title">{props.type}</div>
        <div className="toast__message">{props.message}</div>
      </div>
    </div>
  );
};

export default Toast;
