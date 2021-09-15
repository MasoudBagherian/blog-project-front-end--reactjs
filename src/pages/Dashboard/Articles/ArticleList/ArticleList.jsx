import React, { useEffect, useState, Fragment } from 'react';

import ArticleCard from './../../../../components/ArticleCard/ArticleCard';
import { axiosInstance as axios } from './../../../../utils/axiosConfig';
import { useSelector } from 'react-redux';
import Loader from './../../../../UI/Loader/Loader';
import Modal from './../../../../UI/Modal/Modal';
import ModalAlert from './../../../../UI/Modal/ModalAlert/ModalAlert';
import AlertPrimary from './../../../../UI/alerts/AlertPrimary';
import LabelSecondary from './../../../../UI/labels/LabelSecondary';
import { useRouteMatch } from 'react-router-dom';

const ArticleList = (props) => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const match = useRouteMatch();

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [fetchEnd, setFetchEnd] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFetchErr(false);
    setFetchSuccess(false);
    setFetchEnd(false);

    axios
      .get(`/articles?token=${token}`)
      .then(({ data }) => {
        setLoading(false);
        setFetchSuccess(true);
        let allArticles = data.articles;
        if (role !== 'admin') {
          allArticles = data.articles.filter(
            (article) => article.status.toLowerCase() === 'public'
          );
        }
        setArticles(allArticles);
        setFetchEnd(true);
      })
      .catch((err) => {
        setLoading(false);
        setFetchErr(true);
        setFetchEnd(true);
      });
  }, []);
  let articleList = null;
  if (fetchEnd) {
    if (fetchSuccess) {
      articleList = (
        <Fragment>
          <LabelSecondary
            label={role === 'admin' ? 'all articles' : 'public articles'}
          />

          <section className="article-cards">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                content={article.content}
                date={article.date}
                poster={article.poster}
                title={article.title}
                firstname={article.author.firstname}
                lastname={article.author.lastname}
                avatar={article.author.avatar}
                btnRoute={`${match.path}/${article.id}`}
                showBadge={props.showBadge}
                status={article.status}
              />
            ))}
          </section>
        </Fragment>
      );
    } else {
      articleList = (
        <AlertPrimary message="Fetching public articles from server failed!" />
      );
    }
  }
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <Modal show={fetchErr} backdropClickHandler={() => setFetchErr(false)}>
        <ModalAlert message="There is something wrong with server" />
      </Modal>
      {articleList}
    </Fragment>
  );
};

export default ArticleList;
