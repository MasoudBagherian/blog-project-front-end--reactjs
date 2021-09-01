import React from 'react';

const Main = (props) => {
  return (
    <div className="main">
      <div className="inner-container">
{props.children}
      </div>
      </div>
  )
}

export default Main;