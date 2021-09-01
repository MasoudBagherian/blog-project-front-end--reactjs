import React from 'react';

const ImageAlert = (props) => {
  return ( 
    <div className="image-alert">
      <p className="image-alert__text">
        {props.message}
      </p>
    </div>
   );
}
 
export default ImageAlert;