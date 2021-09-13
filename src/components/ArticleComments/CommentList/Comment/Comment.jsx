import React from 'react';
import { SERVER_IMAGE_FOLDER, DEFAULT_USER_AVATAR } from '../../../../globals';

const Comment = (props) => {
  return (
    <div className="comment">
      <div className="comment__profile">
        <div className="comment__avatar-wrapper">
          <div className="comment__avatar">
            <img src={`${SERVER_IMAGE_FOLDER}/${DEFAULT_USER_AVATAR}`} alt="" />
          </div>
        </div>
        <div className="comment__info">
          <div class="author">
            <span class="author__firstname">emma</span>
            <span class="author__lastname"> stone</span>
          </div>
          <div class="date">
            <span class="date__time" id="date">
              July 20th 2021 5:11 Pm
            </span>
          </div>
        </div>
      </div>
      <div className="comment__text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
        molestias amet dolore, ea unde reiciendis eveniet sint illum ipsa
        repudiandae dolores non autem laudantium? Corporis maiores est expedita
        numquam assumenda.
      </div>
    </div>
  );
};

export default Comment;
