import React, { Fragment } from 'react';
import ArticleCard from '../../../../components/ArticleCard/ArticleCard';
import AlertPrimary from '../../../../UI/alerts/AlertPrimary';
import { useRouteMatch } from 'react-router-dom';

const ProfileArticleList = ({
  articles,
  firstname,
  lastname,
  avatar,
  btnRoutePrefix,
  alertMessage,
}) => {
  const match = useRouteMatch();
  return (
    <Fragment>
      {!articles.length ? <AlertPrimary message={alertMessage} /> : null}
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
            btnRoute={`${btnRoutePrefix}/${article._id}`}
            status={article.status}
          />
        ))}
      </section>
    </Fragment>
  );
};

export default ProfileArticleList;
