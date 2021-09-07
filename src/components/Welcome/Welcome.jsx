import React from 'react';

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome__avatar">
        <img src="http://localhost:5000/assets/image/ragnar.jpg" alt="" />
      </div>
      <h2 className="welcome__text">
        welcome
        <span className="welcome__username" id="username">
          emma1988
        </span>
      </h2>
    </div>
  );
};
export default Welcome;
