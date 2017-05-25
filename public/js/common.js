/* global document requestHandler usersController  event*/
/* eslint no-underscore-dangle: "error"*/

let currentUser;
class FilterConfig {
  constructor(byName, byDate, byAuthor, byTags) {
    this.byName = byName;
    this.byDate = byDate;
    this.byAuthor = byAuthor;
    this.byTags = byTags;
  }

  getByName() {
    return this.byName;
  }

  getByDate() {
    return this.byDate;
  }

  getByAuthor() {
    return this.byAuthor;
  }

  getByTags() {
    return this.byTags;
  }
}
const articleModel = (function () {
  const tags = ['MWC 2017', 'Гаджеты', 'Смартфоны', 'Выставки', 'Дизайн'];
  let articles = requestHandler.getArticles();

  function clone(obj) {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }
    const copy = obj.constructor();
    Object.keys(obj).forEach((attr) => {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) copy[attr] = obj[attr];
    });
    return copy;
  }

  function getArticle(id) {
    requestHandler.getArticle(id, true).then(result => result);
  }

  function getArticlesByFilter(filterConfig) {
    if (filterConfig.byName) {
      const filteredArray = [];
      for (let i = 0; i < articles.length; i++) {
        if (filterConfig.getByName()) {
          if (articles[i].title.indexOf(filterConfig.getByName()) !== -1) {
            filteredArray.push(articles[i]);
          }
        }
        if (filterConfig.getByDate()) {
          if (articles[i].createdAt - filterConfig.getByDate() < 100000) {
            filteredArray.push(articles[i]);
          }
        }
        if (filterConfig.getByAuthor()) {
          if (articles[i].author === filterConfig.getByAuthor()) {
            filteredArray.push(articles[i]);
          }
        }
        if (filterConfig.getByTags()) {
          for (let j = 0; j < filterConfig.getByTags().length; j++) {
            if (articles[i].tags.indexOf(filterConfig.getByTags()[j]) !== -1) {
              filteredArray.push(articles[i]);
            }
          }
        }
      }
      return filteredArray;
    }
    return articles;
  }

  function getArticles(skip, top, filterConfig) {
    let approvedArticles = [];
    if (filterConfig) {
      approvedArticles = getArticlesByFilter(filterConfig);
    } else {
      approvedArticles = articles;
    }
    skip = skip || 0;
    top = top || 10;
    if (articles.length < top) {
      top = articles.length;
    }
    approvedArticles.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1;
    });
    return approvedArticles.slice(skip, skip + top);
  }

  function validateArticle(article) {
    if (!article) {
      console.log('Invalid article');
      return false;
    }
    if (typeof article.id !== 'string') {
      console.log('Invalid id');
      return false;
    }
    if (typeof article.title !== 'string' || article.title.length > 100 || article.title.length < 1) {
      console.log('Invalid title');
      return false;
    }
    if (typeof article.summary !== 'string' || article.summary.length > 200) {
      console.log('Invalid summary');
      return false;
    }
    if (!(article.createdAt instanceof Date)) {
      console.log('Invalid created at');
      return false;
    }
    if (typeof article.author !== 'string' || article.author.length < 1) {
      console.log('Invalid author');
      return false;
    }
    if (typeof article.content !== 'string' || article.content.length < 1) {
      console.log('Invalid content');
      return false;
    }
    if (typeof article.imageSrc !== 'string' || article.imageSrc.length < 1) {
      console.log('Invalid imageSrc');
      return false;
    }
    if (Object.prototype.toString.call(
        article.tags) !== '[object Array]' || article.tags.length === 0 || article.tags.length > 5) {
      console.log('Invalid tags');
      return false;
    }
    for (let i = 0; i < articles.length; i++) {
      if (articles[i] != null) {
        if (articles[i].id === article.id) {
          console.log('Invalid id');
          return false;
        }
      }
    }
    for (let i = 0; i < article.tags.length; i++) {
      if (tags.indexOf(article.tags[i]) === -1) {
        console.log('Invalid tags');
        return false;
      }
    }
    return true;
  }

  function addArticle(article) {
    try {
      if (!article) {
        return false;
      }
      if (!validateArticle(article)) {
        alert('Модерация не пройдена');
        console.log('Article not validated');
        return false;
      }
      article.id = article.id.toString();
      requestHandler.addArticle(article);
      articles = requestHandler.getArticles();
      console.log('Article successfully added');
      return true;
    } catch (exception) {
      console.log('Article not added');
      console.log(exception);
      return false;
    }
  }

  function removeArticle(id) {
    requestHandler.deleteArticle(id).then(() => {
      articles = requestHandler.getArticles();
    });
  }

  function editArticle(id, article) {
    const currentArticle = requestHandler.getArticle(id, false);
    const articleCopy = clone(currentArticle);
    let isEdited = true;
    requestHandler.deleteArticle(currentArticle.id).then(() => {
      articles = requestHandler.getArticles();
      Object.keys(article).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(articleCopy, key)) {
          articleCopy[key] = article[key];
        }
      });
      if (!validateArticle(articleCopy)) {
        isEdited = false;
        requestHandler.addArticle(currentArticle);
      } else {
        articleCopy.id = articleCopy.id.toString();
        isEdited = true;
        requestHandler.addArticle(articleCopy);
      }
      articles = requestHandler.getArticles();
      return isEdited;
    });
  }


  function addTag(tag) {
    if (tags.indexOf(tag) === -1) {
      tags.push(tag);
      console.log('Tag successfully added');
      return true;
    }
    console.log('Tag not added');
    return false;
  }

  function removeTag(tag) {
    if (tags.indexOf(tag) !== -1) {
      tags.splice(articles.indexOf(tag), 1);
      console.log('Tag successfully removed');
      return true;
    }
    console.log('Tag not removed');
    return false;
  }

  function logArray(array) {
    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
    }
  }

  function getArticlesSize() {
    return articles.length;
  }

  function getMaxId() {
    let maxId = 0;
    for (let i = 0; i < articles.length; i++) {
      if (parseInt(articles[i].id, 10) > maxId) {
        maxId = parseInt(articles[i].id, 10);
      }
    }
    return maxId;
  }


// here localstorage used to be, but I removed it.

  return {
    getArticle,
    getArticles,
    validateArticle,
    addArticle,
    editArticle,
    removeArticle,
    addTag,
    removeTag,
    logArray,
    getArticlesSize,
    getMaxId,
  };
}());
const postLoader = (function () {
  let COLUMN;
  let CONTENT_AREA;

  let POST_TEMPLATE;
  let DETAILED_POST_TEMPLATE;
  let EDIT_POST_TEMPLATE;
  let ERROR_TEMPLATE;
  let LOGIN_TEMPLATE;
  let FILTER_TEMPLATE;

  function init() {
    COLUMN = document.querySelector('.column');
    CONTENT_AREA = document.querySelector('.content');
    POST_TEMPLATE = document.querySelector('#template-post-item');
    DETAILED_POST_TEMPLATE = document.querySelector('#detailed-post-template');
    EDIT_POST_TEMPLATE = document.querySelector('#edit-post-template');
    ERROR_TEMPLATE = document.querySelector('#error-window-template');
    LOGIN_TEMPLATE = document.querySelector('#login-window-template');
    FILTER_TEMPLATE = document.querySelector('#filter');
  }

  function formatDate(d) {
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${
      d.getUTCHours()}:${d.getMinutes()}`;
  }

  function loadPost(article) {
    const temp = POST_TEMPLATE.cloneNode(true);
    temp.content.querySelector('.post').id = article.id;
    temp.content.querySelector('.post-title').textContent = article.title;
    temp.content.querySelector('.post-short-description').textContent = article.summary;
    temp.content.querySelector('.post-date').textContent = formatDate(article.createdAt);
    temp.content.querySelector('.post-author').textContent = article.author;
    temp.content.querySelector('.image-cropper').lastElementChild.src = article.imageSrc;
    temp.content.querySelector('.post-tags').innerHTML = article.tags;


    const controlButtons = temp.content.querySelector('.control-buttons');
    if (!currentUser) {
      if (controlButtons) {
        temp.content.querySelector('.post').removeChild(controlButtons);
      }
    }
    return temp.content.querySelector('.post').cloneNode(true);
  }

  function insertPostInDOM(article) {
    articleModel.addArticle(article);
    CONTENT_AREA.appendChild(loadPost(article));
  }

  function loadUserElements(user) {
    const addPostButton = document.querySelector('.header-row').querySelector('.add-button');
    const addPostButtonTemplate = document.querySelector('#add-button').cloneNode(true);
    if (user) {
      document.querySelector('.user-info').lastElementChild.src = 'images/userlogo.png';
      if (!addPostButton) {
        document.querySelector('.header-row').appendChild(
          addPostButtonTemplate.content.querySelector('.add-button').cloneNode(true));
      }
    } else {
      document.querySelector('.user-info').lastElementChild.src = 'images/notuserlogo.png';
      if (addPostButton) {
        document.querySelector('.header-row').removeChild(addPostButton);
      }
    }
  }

  function loadPosts(articles) {
    return articles.map(article => loadPost(article));
  }

  function insertPostsInDOM(articles) {
    // Пользователь
    loadUserElements(currentUser);

    /* для массива объектов статей получим соотвествующие HTML элементы */
    const postsNodes = loadPosts(articles);
    /* вставим HTML элементы в '.article-list' элемент в DOM. */
    postsNodes.forEach((node) => {
      CONTENT_AREA.appendChild(node);
    });
  }

  function removePostFromDom(id) {
    const post = document.getElementById(id.toString());
    if (post) {
      post.className = 'removed-item';
      post.id = 'removed-item';
      let contentStartPadding = 130;
      let contentEndPadding = 330;
      const coef = 0.7;
      if (CONTENT_AREA.contains(document.querySelector('.login-window'))) {
        contentStartPadding = 120;
        contentEndPadding = 120;
      }
      if (CONTENT_AREA.contains(document.querySelector('.detailed-post'))) {
        contentStartPadding = 130;
        contentEndPadding = 130;
      }
      document.getElementById('removed-item').addEventListener('animationend', () => {
        CONTENT_AREA.style.paddingTop = `${contentEndPadding}px`;
        CONTENT_AREA.removeChild(post);
        articleModel.removeArticle(id);
        const ANIMATION_TIME = 300;
        const start = Date.now();
        const timer = setInterval(() => {
          const timePassed = Date.now() - start;
          if (timePassed >= ANIMATION_TIME) {
            clearInterval(timer);
            CONTENT_AREA.style.paddingTop = `${contentStartPadding}px`;
            return;
          }
          function draw(timePassed) {
            const temp = timePassed * coef;
            CONTENT_AREA.style.paddingTop = `${contentEndPadding - temp}px`;
          }

          draw(timePassed);
        }, 10);
      });
    }
    articleModel.removeArticle(id);
    // Holly fucking shit, 2.5 часа тыкался и заработало
  }

  function removePostsFromDom() {
    COLUMN.innerHTML = '';
    CONTENT_AREA.innerHTML = '';
    document.querySelector('.column').appendChild(CONTENT_AREA);
  }

  function removeDetailedPostFromDom(id) {
    const post = document.getElementById(id.toString());
    if (post) {
      post.className = 'det-removed-item';
      post.id = 'det-removed-item';
      const contentStartPadding = 130;
      const contentEndPadding = 430;
      const coef = 0.6;
      document.getElementById('det-removed-item').addEventListener('animationend', () => {
        CONTENT_AREA.style.paddingTop = `${contentEndPadding}px`;
        CONTENT_AREA.removeChild(post);
        const ANIMATION_TIME = 500;
        const start = Date.now();
        const timer = setInterval(() => {
          const timePassed = Date.now() - start;
          if (timePassed >= ANIMATION_TIME) {
            clearInterval(timer);
            CONTENT_AREA.style.paddingTop = `${contentStartPadding}px`;
            return;
          }
          function draw(timePassed) {
            const temp = timePassed * coef;
            CONTENT_AREA.style.paddingTop = `${contentEndPadding - temp}px`;
          }

          draw(timePassed);
        }, 10);
      });
    }
  }

  function renderPosts(skip, top, filterConfig) {
    postLoader.removePostsFromDom();
    const posts = articleModel.getArticles(skip, top, filterConfig);
    postLoader.insertPostsInDOM(posts);
  }

  function returnToMain(filterConfig) {
    const removedContent = document.querySelector('.content').cloneNode(true);
    removedContent.className = 'removed-content';
    removedContent.id = 'removed-content';
    document.querySelector('.column').removeChild(CONTENT_AREA);

    removePostsFromDom();
    renderPosts(0, articleModel.getArticlesSize(), filterConfig);
  }

  function searchResult() {
    const title = document.querySelector('.header-search-input').value || null;
    const filterConfig = new FilterConfig(title);
    returnToMain(filterConfig);
  }

  function applyFilter() {
    let date = null;
    let tags;
    const title = document.querySelector('.filter-input-title').value || null;
    const author = document.querySelector('.filter-input-author').value || null;
    tags = document.querySelector('.filter-input-tags').value.split(',');
    if (!tags.length) {
      tags = null;
    }
    if (document.querySelector('.filter-button-date').textContent !== 'Дата') {
      date = document.querySelector('.filter-button-date').textContent;
    }
    const filterConfig = new FilterConfig(title, date, author, tags);
    returnToMain(filterConfig);
  }

  function insertError(errCode) {
    const removedContent = document.querySelector('.content').cloneNode(true);
    removedContent.className = 'removed-content';
    removedContent.id = 'removed-content';
    document.querySelector('.column').removeChild(CONTENT_AREA);
    document.querySelector('.column').appendChild(removedContent);
    document.getElementById('removed-content').addEventListener('animationend', () => {
      removePostsFromDom();

      const template = ERROR_TEMPLATE;
      template.content.querySelector('.error-window-code').textContent = `Код ошибки : ${errCode}`;
      CONTENT_AREA.insertBefore(template.content.querySelector('.error-window').cloneNode(true),
        CONTENT_AREA.firstChild);
      document.querySelector('.error-window').addEventListener('click', returnToMain);
    });
  }

  function checkAuthInput() {
    const inputUser = document.querySelector('.login-input').value;
    const inputPass = document.querySelector('.pass-input').value;

    if (usersController.logIn({ username: inputUser, password: inputPass })
        .then((user) => {
          currentUser = user;
          returnToMain();
        })
        .catch(() => {
          usersController.logOut();
          insertError('Неправильный пользователь');
        }));
  }

  function editPostInDom() {
    let articleId = document.querySelector('.edit-post-id').innerHTML;
    articleId = articleId.substr(3, articleId.length);
    const newArticle = {
      id: articleId,
      title: document.querySelector('.edit-post-title').value,
      summary: document.querySelector('.edit-post-short-description').value,
      createdAt: new Date(),
      author: document.querySelector('.edit-post-author').textContent,
      tags: document.querySelector('.edit-post-tags').value.split(','),
      content: document.querySelector('.edit-post-description').value,
      imageSrc: document.querySelector('.edit-image-cropper').lastElementChild.src,
    };

    if (requestHandler.getArticle(articleId, false)) {
      articleModel.editArticle(parseInt(articleId, 10), newArticle);
      document.querySelector('.edit-enter').textContent = 'Изменено';
      document.querySelector('.edit-enter').style.background = '#5188E8';
      setTimeout(postLoader.returnToMain, 2000);
    } else if (articleModel.addArticle(newArticle)) {
      document.querySelector('.edit-enter').textContent = 'Добавлено успешно!';
      document.querySelector('.edit-enter').style.background = '#5188E8';
      setTimeout(postLoader.returnToMain, 2000);
    }
  }


  function insertEditPost(article) {
    // not remove all
    const renderedArticle = EDIT_POST_TEMPLATE;
    const removedContent = document.querySelector('.content').cloneNode(true);
    removedContent.className = 'removed-content';
    removedContent.id = 'removed-content';
    document.querySelector('.column').removeChild(CONTENT_AREA);
    document.querySelector('.column').appendChild(removedContent);
    document.getElementById('removed-content').addEventListener('animationend', () => {
      removePostsFromDom();
      if (article) {
        renderedArticle.content.querySelector('.edit-post').id = article.id;
        renderedArticle.content.querySelector('.edit-post-title').value = article.title;
        renderedArticle.content.querySelector('.edit-post-tags').value = article.tags;
        renderedArticle.content.querySelector('.edit-image-cropper').lastElementChild.src = article.imageSrc;

        renderedArticle.content.querySelector('.edit-post-id').textContent = `ID-${article.id}`;
        renderedArticle.content.querySelector('.edit-post-author').textContent = article.author;
        renderedArticle.content.querySelector('.edit-post-date').textContent = formatDate(article.createdAt);

        renderedArticle.content.querySelector('.edit-post-short-description').textContent = article.summary;
        renderedArticle.content.querySelector('.edit-post-description').textContent = article.content;
        renderedArticle.content.querySelector('.edit-enter').textContent = 'Изменить';
      } else {
        renderedArticle.content.querySelector('.edit-post').id = articleModel.getMaxId() + 1;
        renderedArticle.content.querySelector('.edit-post-title').value = '';
        renderedArticle.content.querySelector('.edit-post-tags').value = '';
        renderedArticle.content.querySelector('.edit-image-cropper').lastElementChild.src = 'images/userlogo.png';

        renderedArticle.content.querySelector('.edit-post-id').textContent = `ID-${articleModel.getMaxId() + 1}`;
        renderedArticle.content.querySelector('.edit-post-author').textContent = currentUser.username;
        renderedArticle.content.querySelector('.edit-post-date').textContent = formatDate(new Date());

        renderedArticle.content.querySelector('.edit-post-short-description').textContent = '';
        renderedArticle.content.querySelector('.edit-post-description').textContent = '';
        renderedArticle.content.querySelector('.edit-enter').textContent = 'Добавить';
        // adding new post
      }
      CONTENT_AREA.insertBefore(renderedArticle.content.querySelector('.edit-post').cloneNode(true),
        CONTENT_AREA.firstChild);
      document.querySelector('.edit-enter').addEventListener('click', editPostInDom);
    });
  }

  function insertFilter() {
    if (!CONTENT_AREA.contains(document.querySelector('.filter'))) {
      const temp = FILTER_TEMPLATE;
      CONTENT_AREA.insertBefore(temp.content.querySelector('.filter').cloneNode(true), CONTENT_AREA.firstChild);
      document.querySelector('.filter-button-apply').addEventListener('click', applyFilter);
    }
  }

  function insertLogin() {
    const temp = LOGIN_TEMPLATE;
    if (!CONTENT_AREA.contains(document.querySelector('.login-window'))) {
      const ANIMATION_TIME = 300;
      const start = Date.now();
      const timer = setInterval(() => {
        const timePassed = Date.now() - start;
        if (timePassed >= ANIMATION_TIME) {
          clearInterval(timer);
          CONTENT_AREA.style.paddingTop = `${120}px`;
          CONTENT_AREA.insertBefore(temp.content.querySelector('.login-window').cloneNode(true),
            CONTENT_AREA.firstChild);
          document.querySelector('.login-window-enter-button').addEventListener('click', checkAuthInput);
          return;
        }
        function draw(timePassed) {
          CONTENT_AREA.style.paddingTop = `${timePassed * 2}px`;
        }

        draw(timePassed);
      }, 25);
    }
  }

  function insertDetailedInDOM(article) {
    // fix --> авториз = !авториз
    if (CONTENT_AREA.contains(document.getElementById(article.id))) {
      const temp = DETAILED_POST_TEMPLATE;
      temp.content.querySelector('.detailed-post').id = `${article.id}999`;
      temp.content.querySelector('.detailed-post-title').textContent = article.title;
      temp.content.querySelector('.detailed-post-description').textContent = article.content;
      temp.content.querySelector('.detailed-post-date').textContent = formatDate(article.createdAt);
      temp.content.querySelector('.detailed-post-author').textContent = article.author;
      temp.content.querySelector('.detailed-image-cropper').lastElementChild.src = article.imageSrc;
      temp.content.querySelector('.detailed-post-tags').innerHTML = article.tags;

      // если нет юзера - удаляем
      if (!currentUser) {
        const controlButtons = temp.content.querySelector('.detailed-control-buttons');
        const addPostButton = document.querySelector('.add-button');
        if (controlButtons && addPostButton) {
          temp.content.querySelector('.detailed-post').removeChild(controlButtons);
          document.querySelector('.header-row').removeChild(addPostButton);
        }
      }
      const ANIMATION_TIME = 300;
      const start = Date.now();
      const timer = setInterval(() => {
        const timePassed = Date.now() - start;
        if (timePassed >= ANIMATION_TIME) {
          clearInterval(timer);
          CONTENT_AREA.style.paddingTop = `${130}px`;
          CONTENT_AREA.insertBefore(temp.content.querySelector('.detailed-post').cloneNode(true),
            CONTENT_AREA.firstChild);
          return;
        }
        function draw(timePassed) {
          CONTENT_AREA.style.paddingTop = `${timePassed * 1.5}px`;
        }

        draw(timePassed);
      }, 25);
      event.stopPropagation();
    }
  }

  return {
    init,
    insertPostsInDOM,
    removePostsFromDom,
    removePostFromDom,
    removeDetailedPostFromDom,
    insertPostInDOM,
    insertLoginInDom: insertLogin,
    insertErrorInDom: insertError,
    insertFilterInDom: insertFilter,
    insertEditInDom: insertEditPost,
    insertDetailedPostInDom: insertDetailedInDOM,
    editPostInDom,
    searchResult,
    returnToMain,
  };
}());

const pagination = (function () {
  const ITEMS_PER_СLICK = 10; // статей на 1-ой странице
  let ITEMS_SHOWN = 10;
  let filterConfig;
  let total; // всего статей
  let showMoreButton;
  let showMoreCallback;

  function showOrHideMoreButton() {
    showMoreButton.hidden = total <= ITEMS_SHOWN;
  }

  function getParams() {
    return {
      top: ITEMS_SHOWN,
      skip: 0,
      filterConfig,
    };
  }

  function nextPage() {
    ITEMS_SHOWN += ITEMS_PER_СLICK;
    /* возможно, статей больше нет, спрятать кнопку */
    showOrHideMoreButton();
    return getParams();
  }

  function handleShowMoreClick() {
    const postsShown = nextPage();
    showMoreCallback(postsShown.skip, postsShown.top, filterConfig);
  }

  function init(_total, _showMoreCallback) {
    total = _total;
    showMoreCallback = _showMoreCallback;
    showMoreButton = document.querySelector('.more-button');
    showMoreButton.addEventListener('click', handleShowMoreClick);

    /* Не показывать кнопку если статей нет */
    showOrHideMoreButton();

    /* Вернуть skip, top для начальной отрисовки статей */
    return getParams();
  }

  return {
    init,
    getParams,
  };
}());
function eventHeader(event) {
  let elementClassName = event.target.className;
  if (!elementClassName) {
    elementClassName = event.target.parentNode.className;
  }
  switch (elementClassName) {
    case 'logo':
      postLoader.returnToMain();
      break;
    case 'find-button':
      postLoader.returnToMain();
      postLoader.searchResult();
      break;
    case 'user-info':
      // fix --> авториз = !авториз
      postLoader.insertLoginInDom();
      break;
    case 'add-button':
      postLoader.insertEditInDom();
      break;
    case 'filter-button':
      // fix --> выезд фильтра справа и заезд обратно
      postLoader.returnToMain();
      postLoader.insertFilterInDom();
      break;
    default:
      break;
  }
}
function eventPost(event) {
  let articleToDelete;
  let currentEvent;
  let articleToInsertNumber;
  switch (event.target.className) {
    case 'button-delete-img':
      articleToDelete = parseInt(event.target.parentElement.parentElement.parentElement.getAttribute('id'), 10);
      postLoader.removePostFromDom(articleToDelete);
      break;
    case 'detailed-button-delete-img':
      articleToDelete = parseInt(event.target.parentElement.parentElement.parentElement.getAttribute('id'), 10);
      postLoader.removeDetailedPostFromDom(articleToDelete);
      break;
    case 'button-change-img':
      currentEvent = event.target;
      while (!currentEvent.hasAttribute('id')) {
        currentEvent = currentEvent.parentElement;
      }
      articleToInsertNumber = parseInt(currentEvent.getAttribute('id'), 10);
      requestHandler.getArticle(articleToInsertNumber, true).then((result) => {
        postLoader.insertEditInDom(result);
      });
      // fix --> Добавить изменение поста
      // fix --> Добавить анимацию удаления всех
      break;
    case 'post':
    case 'post-content':
    case 'post-title':
    case 'post-tags':
    case 'post-author':
    case 'post-date':
    case 'post-short-description':
      currentEvent = event.target;
      while (!currentEvent.hasAttribute('id')) {
        currentEvent = currentEvent.parentElement;
      }
      articleToInsertNumber = parseInt(currentEvent.getAttribute('id'), 10);
      requestHandler.getArticle(articleToInsertNumber, true).then((result) => {
        postLoader.insertDetailedPostInDom(result);
      });
      break;
    default:
      break;
  }
}

function addEventListeners() {
  const headerRowElements = document.querySelector('.header-row');
  const postListNodes = document.querySelector('.content');

  headerRowElements.addEventListener('click', eventHeader);
  postListNodes.addEventListener('click', eventPost);
}

function renderPosts(skip, top, filterConfig) {
  postLoader.removePostsFromDom();
  const posts = articleModel.getArticles(skip, top, filterConfig);
  postLoader.insertPostsInDOM(posts);
}

function startApp() {
  postLoader.init();
  pagination.init(articleModel.getArticlesSize(), (skip, top, filterConfig) => {
    renderPosts(skip, top, filterConfig);
  });
  renderPosts(pagination.skip, pagination.top);
}
document.addEventListener('DOMContentLoaded', startApp);
addEventListeners();
