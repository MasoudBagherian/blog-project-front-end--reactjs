import React, { useEffect, useRef } from 'react';
import { BiCheckShield as SuccessIcon } from 'react-icons/bi';
import { FaRegWindowClose as CloseIcon } from 'react-icons/fa';
const Toast = (props) => {
  const closeBtnRef = useRef();
  let timer;
  useEffect(() => {
    if (props.autoCloseTime) {
      timer = setTimeout(() => {
        closeBtnRef.current.click();
      }, props.autoCloseTime);
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="toast">
      <button
        className="toast__btn"
        onClick={props.closeClickHandler}
        ref={closeBtnRef}>
        <CloseIcon className="toast__close" />
      </button>
      <div className="toast__icon">
        <SuccessIcon className="toast__success" />
      </div>
      <div className="toast__content">
        <div className="toast__title">success</div>
        <div className="toast__message">{props.message}</div>
      </div>
    </div>
  );
};

export default Toast;
