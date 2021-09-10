import React from 'react';
import { Link } from 'react-router-dom';
const FormControls = (props) => {
  return (
    <div className="form__controls">
      <button
        className="form__btn btn-primary"
        style={{ marginRight: '1rem' }}
        disabled={props.disabled}
        ref={props.submitBtnRef}>
        save
      </button>
      <Link
        to={props.cancelRoute}
        className="form__btn btn-tritiary"
        ref={props.cancelBtnRef}>
        cancel
      </Link>
    </div>
  );
};

export default FormControls;
