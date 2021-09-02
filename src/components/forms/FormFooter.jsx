import React from 'react';
import { Link } from 'react-router-dom';

const FormFooter = (props) => {
  return (
    <div className="form__footer">
      <p className="form__message">{props.message}</p>
      <Link to={props.href} className="form__btn btn-secondary">
        {props.btnValue}
      </Link>
    </div>
  );
};

export default FormFooter;
