/**
 * Created by Semen on 20-May-17.
 */

/* global XMLHttpRequest reject*/

const requestHandler = (function get() {
  const request = new XMLHttpRequest();

  function getArticles() {
    request.open('GET', '/articles', false);
    request.setRequestHeader('content-type', 'application/json');
    request.send();

    const articles = JSON.parse(request.responseText);
    articles.forEach((currentArticle) => {
      currentArticle.createdAt = new Date(currentArticle.createdAt);
    });
    return articles;
  }

  function editArticle(id, article) {
    request.open('PUT', `/article/${id}`, false);
    request.setRequestHeader('content-type', 'application/json');

    request.onerror = function () {
      reject(new Error('Error'));
    };
    request.send(JSON.stringify(article));
  }

  function getArticle(id) {
    request.open('GET', `/article/${id}`, false);
    request.setRequestHeader('content-type', 'application/json');
    request.send();

    if (request.responseText) {
      const article = JSON.parse(request.responseText);
      article.createdAt = new Date(article.createdAt);
      return article;
    }
    return null;
  }

  function addArticle(article) {
    request.open('POST', '/article', false);
    request.setRequestHeader('content-type', 'application/json');
    request.onerror = function () {
      reject(new Error('Error'));
    };
    request.send(JSON.stringify(article));
  }

  function deleteArticle(id) {
    request.open('DELETE', `/articles/${id}`, false);
    request.setRequestHeader('content-type', 'application/json');
    request.onerror = function () {
      reject(new Error('Error'));
    };
    request.send();
  }

  return {
    getArticles,
    getArticle,
    deleteArticle,
    addArticle,
    editArticle,
  };
}());
