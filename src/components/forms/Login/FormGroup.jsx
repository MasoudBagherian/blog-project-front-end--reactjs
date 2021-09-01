import React from 'react';

const FormGroup  = (props) => {
  let className = 'form__input-wrapper'
  if(props.formField.focused){
    className = 'form__input-wrapper active'

  }
  return (
    <div className="form__group">
      <div className={className}>
      <label className="form__label">{props.label}</label>
        <input className="form__input" type="text" 
        name={props.name}
        value={props.formField.value}
        onChange={props.inputChangeHandler}
        onFocus={props.inputFocusHandler}
        onBlur={props.inputBlurHandler}/>
      </div>
      <div className="form__alert"></div>
    </div>
  )
}

export default FormGroup;