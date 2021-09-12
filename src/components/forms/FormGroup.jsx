import React from 'react';

const FormGroup = (props) => {
  let className = 'form__input-wrapper';
  if (props.formField.focused) {
    className = 'form__input-wrapper active';
  }
  if (!props.formField.isValid && props.formField.touched) {
    className = 'form__input-wrapper error';
  }
  return (
    <div className="form__group">
      <div className={className}>
        <label className="form__label">{props.label}</label>
        <input
          className="form__input"
          type="text"
          name={props.name}
          value={props.formField.value}
          onChange={props.inputChangeHandler}
          onBlur={props.inputBlurHandler}
          onFocus={props.inputFocusHandler}
        />
      </div>
      <div className="form__alert">{props.formField.errMsg}</div>
    </div>
  );
};

export default FormGroup;
