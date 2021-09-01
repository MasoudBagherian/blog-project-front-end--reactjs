import React from 'react';


const Backdrop = (props) => {
  return (
<div className={props.show? 'backdrop show': 'backdrop'}
onClick={props.clickHandler}
></div>
  )
}

export default Backdrop;