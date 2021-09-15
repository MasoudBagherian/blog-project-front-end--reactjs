import React, { Fragment } from 'react';
import ArticleCard from '../../../../components/ArticleCard/ArticleCard';
import LabelSecondary from '../../../../UI/labels/LabelSecondary';
import AlertPrimary from '../../../../UI/alerts/AlertPrimary';
import { useRouteMatch } from 'react-router-dom';

const ProfileArticleList = ({ articles, firstname, lastname, avatar }) => {
  const match = useRouteMatch();
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
            btnRoute={`${match.path}/articles/${article._id}`}
            status={article.status}
          />
        ))}
      </section>
    </Fragment>
  );
};

export default ProfileArticleList;
