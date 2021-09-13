import React, { useRef, useEffect } from 'react';
import {
  SERVER_IMAGE_FOLDER,
  DEFAULT_USER_AVATAR,
  DEFAULT_ARTICLE_IMAGE,
} from './../../globals';
import CardButton from './../CardButton/CardButton';
import moment from 'moment';
import { useRouteMatch } from 'react-router-dom';
const FullArticle = ({ article, author }) => {
  const match = useRouteMatch();
  const editRoutePrefix = match.path.split('/:')[0];
  const id = match.params.articleId;
  const editRoute = `${editRoutePrefix}/edit-article/${id}`;
  const contentRef = useRef();
  useEffect(() => {
    contentRef.current.innerHTML = article.content;
  }, []);
  return (
    <div className="article">
      <div className="article__image">
        <img src={`${SERVER_IMAGE_FOLDER}/${article.poster}`} />
      </div>
      {/* <div className="article__detail">
        <div className="article__views">
          views: <span className="views-count" id="viewer-count"></span>
        </div>
        <div className="article__like">
          <span className="like-icon" id="like-icon"></span>
          <span className="like-count" id="like-count"></span>
        </div>
      </div> */}
      <div className="article__header">
        <div className="article__avatar">
          <img src={`${SERVER_IMAGE_FOLDER}/${author.avatar}`} />
        </div>

        <div className="article__info">
          <div className="author autor--flex">
            Written by
            <span className="author__firstname" id="firstname">
              {' '}
              {author.firstname}
            </span>
            <span className="author__lastname" id="lastname">
              {' '}
              {author.lastname}
            </span>
          </div>
          <div className="date date--flex">
            Published at
            <span className="date__time" id="date">
              {' '}
              {moment(article.date).format('MMMM Do YYYY h:mm a')}
            </span>
          </div>
        </div>
      </div>
      <div className="article__body">
        <h2 className="article__title">{article.title}</h2>
        <div className="article__text" ref={contentRef}>
          {article.content}
        </div>
      </div>
      <CardButton type="delete" noLink />
      <CardButton type="edit" btnRoute={editRoute} />
    </div>
  );
};

export default FullArticle;