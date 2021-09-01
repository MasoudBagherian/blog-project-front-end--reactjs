import React, {Fragment} from 'react';
import Backdrop from './../Backdrop/Backdrop';

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.show}
      clickHandler={props.backdropClickHandler}/>
      <div className={props.show? 'modal show': 'modal'}>
        {props.children}
      </div>
    </Fragment>
  )
}

export default Modal;