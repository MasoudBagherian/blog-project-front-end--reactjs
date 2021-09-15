import React from 'react';

import { SERVER_IMAGE_FOLDER } from './../../../../../../globals';

import moment from 'moment';

const Comment = (props) => {
  return (
    <div className="comment">
      <div className="comment__profile">
        <div className="comment__avatar-wrapper">
          <div className="comment__avatar">
            <img src={`${SERVER_IMAGE_FOLDER}/${props.avatar}`} alt="" />
          </div>
        </div>
        <div className="comment__info">
          <div className="author">
            <span className="author__firstname">{props.firstname}</span>
            <span className="author__lastname"> {props.lastname}</span>
          </div>
          <div className="date">
            <span className="date__time" id="date">
              {moment(props.date).format('MMMM Do YYYY h:mm a')}
            </span>
          </div>
        </div>
      </div>
      <pre className="comment__text">{props.content}</pre>
    </div>
  );
};

export default Comment;
