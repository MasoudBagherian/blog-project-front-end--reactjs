import React from 'react';

const CommentTabs = (props) => {
  return (
    <ul className="comment-tabs" onClick={props.tabClickHandler}>
      <li
        className={
          props.tabIndex === 1
            ? 'comment-tabs__item active'
            : 'comment-tabs__item'
        }
        index={1}>
        Comments
      </li>
      <li
        className={
          props.tabIndex === 2
            ? 'comment-tabs__item active'
            : 'comment-tabs__item'
        }
        index={2}>
        Add a Comment
      </li>
    </ul>
  );
};

export default CommentTabs;
