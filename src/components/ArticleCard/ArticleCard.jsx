import React, { useRef, useEffect } from 'react';
import { SERVER_IMAGE_FOLDER } from '../../globals';
import { excerptContent } from './../../utils/excerptContent';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
const ArticleCard = (props) => {
  const match = useRouteMatch();
  const path = match.path;
  const role = useSelector((state) => state.auth.role);
  const excerptRef = useRef();
  useEffect(() => {
    excerptRef.current.innerHTML = excerptContent(props.content, 30);
  }, []);

  return (
    <div className="article-card-wrapper">
      <div className="article-card">
        <div className="article-card__top">
          {props.status.toLowerCase() === 'private' ? (
            <div class="article-card__badge">private</div>
          ) : null}
          <div className="article-card__avatar">
            <img src={`${SERVER_IMAGE_FOLDER}/${props.avatar}`} alt="" />
          </div>
          <div className="article-card__poster">
            <img src={`${SERVER_IMAGE_FOLDER}/${props.poster}`} alt="" />
          </div>
          <div className="article-card__content">
            <div className="author">
              Written by
              <span className="author__firstname"> {props.firstname}</span>
              <span className="author__lastname"> {props.lastname}</span>
            </div>
            <div className="date">
              Published at
              <span className="date__time">
                {' '}
                {moment(props.date).format('MMMM Do YYYY h:mm a')}
              </span>
            </div>
            <h3 className="article-card__title">{props.title}</h3>
          </div>
          <div className="article-card__overlay">
            <h3 className="article-card__title">{props.title}</h3>
            <div className="article-card__excerpt" ref={excerptRef}></div>
          </div>
        </div>
        <div className="article-card__bottom">
          <Link to={props.btnRoute} className="article-card__btn">
            read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
