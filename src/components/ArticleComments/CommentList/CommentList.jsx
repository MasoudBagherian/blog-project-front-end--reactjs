import React, { useState, useEffect, Fragment } from 'react';
import Comment from './Comment/Comment';
import AlertPrimary from './../../../UI/alerts/AlertPrimary';
import { axiosInstance as axios } from './../../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

const CommentList = () => {
  const token = useSelector((state) => state.auth.token);
  const match = useRouteMatch();
  const articleId = match.params.articleId;
  const [fetchErr, setFetchErr] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setFetchErr(false);
    setFetchEnd(false);
    axios
      .get(`/comments/article/${articleId}?token=${token}`)
      .then(({ data }) => {
        // console.log(data);
        setComments(data.comments);
        setFetchEnd(true);
      })
      .catch((err) => {
        setFetchErr(true);
        setFetchEnd(true);
      });
  }, []);
  let commentList = null;
  if (fetchEnd) {
    if (fetchErr) {
      commentList = (
        <AlertPrimary message="Fetching comments from server failed!" />
      );
    } else {
      commentList = (
        <AlertPrimary message="There is not any comment for this article. You can type the first comment now." />
      );
      if (comments.length) {
        commentList = (
          <Fragment>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                firstname={comment.author.firstname}
                lastname={comment.author.lastname}
                avatar={comment.author.avatar}
                date={comment.date}
                content={comment.content}
              />
            ))}
          </Fragment>
        );
      }
    }
  }
  return <div className="comment-list">{commentList}</div>;
};

export default CommentList;
