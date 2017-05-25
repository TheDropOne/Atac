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

  function getArticle(id, sync) {
    if (sync) {
      return new Promise((resolve, reject) => {
        request.open('GET', `/article/${id}`, true);
        request.setRequestHeader('content-type', 'application/json');
        request.send();

        request.onload = function load() {
          if (this.status === 200) {
            if (request.responseText) {
              const article = JSON.parse(request.responseText);
              article.createdAt = new Date(article.createdAt);
              resolve(article);
            }
          } else {
            const error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };
        request.onerror = function error() {
          reject(new Error('Get Article request error'));
        };
      });
    }
    request.open('GET', `/article/${id}`, false);
    request.setRequestHeader('content-type', 'application/json');
    request.send();
    if (request.responseText) {
      const article = JSON.parse(request.responseText);
      article.createdAt = new Date(article.createdAt);
      return article;
    }
  }

  function addArticle(article) {
    return new Promise((resolve, reject) => {
      request.open('POST', '/article', false);
      request.setRequestHeader('content-type', 'application/json');
      request.send(JSON.stringify(article));
      request.onload = function load() {
        if (this.status === 200) {
          resolve();
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      request.onerror = function () {
        reject(new Error('Add Article request error'));
      };
    });
  }

  function deleteArticle(id) {
    return new Promise((resolve, reject) => {
      request.open('DELETE', `/articles/${id}`, false);
      request.setRequestHeader('content-type', 'application/json');
      request.send();
      request.onload = function load() {
        if (this.status === 200) {
          resolve();
        } else {
          const error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      request.onerror = function () {
        reject(new Error('Delete Article request error'));
      };
    });
  }

  return {
    getArticles,
    getArticle,
    deleteArticle,
    addArticle,
    editArticle,
  };
}());