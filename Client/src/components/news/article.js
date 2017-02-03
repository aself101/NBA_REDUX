import React from 'react';

const Article = ({ article }) => {
  if (!article) return <span></span>;
  return (
    <li className="list-group-item">
      <h3>{ article.title }</h3>
      <p className="help-block"><b>Published: </b> { article.published.split('T')[0] }</p>
      <div className="row">
        <div className="col-sm-3">
          <a className="btn btn-block btn-primary" href={article.link} target="_blank">Source</a>
        </div>
      </div>
    </li>
  );
};

export default Article;
