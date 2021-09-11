import React, { Fragment } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import LabelSecondary from './../../UI/labels/LabelSecondary';
import AlertPrimary from '../../UI/alerts/AlertPrimary';

const ArticleList = ({ articles, firstname, lastname, avatar }) => {
  // console.log(articles);
  return (
    <Fragment>
      <LabelSecondary label="your articles" />
      {!articles.length ? (
        <AlertPrimary message="You have no article. You can click the plus button at the right bottom corner of the page to write an article" />
      ) : null}
      <section className="article-cards">
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            content={article.content}
            date={article.createdAt}
            poster={article.image}
            title={article.title}
            firstname={firstname}
            lastname={lastname}
            avatar={avatar}
            id={article._id}
          />
        ))}
      </section>
    </Fragment>
  );
};

export default ArticleList;
