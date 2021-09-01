import React from 'react';
import Camera from '../../../UI/icons/Camera';
const FormImage = (props) => {
  return (
<div className="form__group">
          <div className="form-image">
            <input type="file"
            onChange={props.changeImageHandler}
            ref={props.inputRef} className="form-image__file" />
            <div className="form-image__frame">
              <img src="http://localhost:5000/assets/image/ragnar.jpg" alt=""
              ref={props.imgRef}/>
            </div>
            <button className="form-image__btn" 
            onClick={props.clickIconHandler}
            type="button">
              <div className="form-image__icon">
              <Camera/>
              </div>
              <span className="form-image__badge">set a new photo</span>
            </button>
          </div>
          <div className="form__alert">
            <p className="message"></p>
          </div>
        </div>
  )
}

export default FormImage;