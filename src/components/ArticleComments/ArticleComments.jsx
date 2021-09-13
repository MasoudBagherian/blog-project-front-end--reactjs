import React, { useState } from 'react';
import { SERVER_IMAGE_FOLDER } from '../../globals';
import { DEFAULT_USER_AVATAR } from './../../globals';
import CommentList from './CommentList/CommentList';
import CommentTabs from './CommentTabs/CommentTabs';
import CommentForm from './CommentForm/CommentForm';

const ArticleComments = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const tabClickHandler = (e) => {
    const tabIndex = +e.target.getAttribute('index');
    setTabIndex(tabIndex);
  };
  let commentArea = null;
  if (tabIndex === 1) {
    commentArea = <CommentList />;
  }
  if (tabIndex === 2) {
    commentArea = <CommentForm />;
  }
  return (
    <section className="comments">
      <CommentTabs tabClickHandler={tabClickHandler} tabIndex={tabIndex} />
      <div className="comment-area">{commentArea}</div>
    </section>
  );
};

export default ArticleComments;
