'use strict';

var user;
class FilterConfig {
    constructor(byName, byDate, byAuthor, byTags) {
        this._byName = byName;
        this._byDate = byDate;
        this._byAuthor = byAuthor;
        this._byTags = byTags;
    }

    byName() {
        return this._byName;
    }

    byDate() {
        return this._byDate;
    }

    byAuthor() {
        return this._byAuthor;
    }

    byTags() {
        return this._byTags;
    }
}
var articleModel = (function () {
    var tags = ["MWC 2017", "Гаджеты", "Смартфоны", "Выставки", "Дизайн"];
    var articles = requestHandler.getArticles().slice();

    logArray(articles);

    function clone(obj) {
        if (!obj || "object" != typeof obj) {
            return obj;
        }
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    function getArticle(id) {
        return requestHandler.getArticle(id);
    }

    function getArticles(skip, top, filterConfig) {
        var approvedArticles = [];
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
        approvedArticles.sort(function (a, b) {
            return a.createdAt > b.createdAt ? 1 : -1;
        });
        return approvedArticles.slice(skip, skip + top);
    }

    function getArticlesByFilter(filterConfig) {
        var filteredArray = [];
        for (var i = 0; i < articles.length; i++) {
            if (filterConfig.byName()) {
                if (articles[i].title.indexOf(filterConfig.byName()) != -1) {
                    filteredArray.push(articles[i]);
                }
            }
            if (filterConfig.byDate()) {
                if (articles[i].createdAt - filterConfig.byDate() < 100000) {
                    filteredArray.push(articles[i]);
                }
            }
            if (filterConfig.byAuthor()) {
                if (articles[i].author === filterConfig.byAuthor()) {
                    filteredArray.push(articles[i]);
                }
            }
            if (filterConfig.byTags()) {
                for (var j = 0; j < filterConfig.byTags().length; j++) {
                    if (articles[i].tags.indexOf(filterConfig.byTags()[j]) != -1) {
                        filteredArray.push(articles[i]);
                    }
                }
            }
        }
        return filteredArray;
    }

    function validateArticle(article) {
        if (!article) {
            console.log('Invalid article');
            return false;
        }
        if (typeof article.id !== "string") {
            console.log('Invalid id');
            return false;
        }
        if (typeof article.title !== "string" || article.title.length > 100 || article.title.length < 1) {
            console.log('Invalid title');
            return false;
        }
        if (typeof article.summary !== "string" || article.summary.length > 200) {
            console.log('Invalid summary');
            return false;
        }
        if (!article.createdAt instanceof Date) {
            console.log('Invalid created at');
            return false;
        }
        if (typeof article.author !== "string" || article.author.length < 1) {
            console.log('Invalid author');
            return false;
        }
        if (typeof article.content !== "string" || article.content.length < 1) {
            console.log('Invalid content');
            return false;
        }
        if (typeof article.imageSrc !== "string" || article.imageSrc.length < 1) {
            console.log('Invalid imageSrc');
            return false;
        }
        if (Object.prototype.toString.call(article.tags) !== '[object Array]' || article.tags.length == 0 || article.tags.length > 5) {
            console.log('Invalid tags');
            return false;
        }
        for (var i = 0; i < articles.length; i++) {
            if (articles[i] != null) {
                if (articles[i].id === article.id) {
                    console.log('Invalid id');
                    return false;
                }
            }
        }
        for (var i = 0; i < article.tags.length; i++) {
            if (tags.indexOf(article.tags[i]) == -1) {
                console.log('Invalid tags');
                return false;
            }
        }
        return true;
    }

    function addArticle(article) {
        try {
            if (!article) {
                console.log('Article not added. It is null or undefined');
                return false;
            }
            if (!validateArticle(article)) {
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
    function editArticle(id, article) {
        const currentArticle = getArticle(id);
        const articleCopy = clone(currentArticle);
        let isEdited = true;
        removeArticle(currentArticle.id);
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
            requestHandler.addArticle(articleCopy);
        }
        articles = requestHandler.getArticles();
        alert(isEdited);
        return isEdited;
    }
    /*
    function editArticle(id, article) {
        if (!id) {
            console.log("ID is null or undefined");
            return false;
        }

        var currentArticle = getArticle(id);
        var articleCopy = clone(currentArticle);
        var index = 0;

        removeArticle(currentArticle.id);

        for (var key in articles) {
            if (articleCopy.hasOwnProperty(key)) {
                articleCopy[key] = article[key];
            }
        }

        if (!validateArticle(articleCopy)) {
            console.log("Post not validated");
            requestHandler.addArticle(currentArticle);
            return false;
        }
        articleCopy.id = articleCopy.id.toString();
        addArticle(articleCopy);

        console.log("Post successfully edited");
        console.log(articles.length);
        return true;
    }
*/

    function removeArticle(id) {
        var articleToDelete = requestHandler.getArticle(id);
        if (!articleToDelete) {
            return false;
        }

        requestHandler.deleteArticle(id);
        articles = requestHandler.getArticles().slice();
        console.log("Post successfully removed");
        return true;
    }


    function addTag(tag) {
        if (tags.indexOf(tag) == -1) {
            tags.push(tag);
            console.log("Tag successfully added");
            return true;
        }
        console.log("Tag not added");
        return false;
    }

    function removeTag(tag) {
        if (tags.indexOf(tag) != -1) {
            tags.splice(articles.indexOf(tag), 1);
            console.log("Tag successfully removed");
            return true;
        }
        console.log("Tag not removed");
        return false;
    }

    function logArray(array) {
        for (var i = 0; i < array.length; i++) {
            console.log(array[i]);
        }
    }

    function getArticlesSize() {
        return articles.length;
    }


// here localstorage used to be, but I removed it.

    return {
        getArticle: getArticle,
        getArticles: getArticles,
        validateArticle: validateArticle,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        addTag: addTag,
        removeTag: removeTag,
        logArray: logArray,
        getArticlesSize: getArticlesSize
    };
}());
var postLoader = (function () {
    var COLUMN;
    var CONTENT_AREA;

    var POST_TEMPLATE;
    var DETAILED_POST_TEMPLATE;
    var EDIT_POST_TEMPLATE;
    var ERROR_TEMPLATE;
    var LOGIN_TEMPLATE;
    var FILTER_TEMPLATE;

    function init() {
        COLUMN = document.querySelector(".column");
        CONTENT_AREA = document.querySelector(".content");
        POST_TEMPLATE = document.querySelector('#template-post-item');
        DETAILED_POST_TEMPLATE = document.querySelector('#detailed-post-template');
        EDIT_POST_TEMPLATE = document.querySelector('#edit-post-template');
        ERROR_TEMPLATE = document.querySelector('#error-window-template');
        LOGIN_TEMPLATE = document.querySelector('#login-window-template');
        FILTER_TEMPLATE = document.querySelector('#filter');
    }

    function insertPostInDOM(article) {
        articleModel.addArticle(article);
        CONTENT_AREA.appendChild(loadPost(article));
    }

    function insertPostsInDOM(articles) {
        //Пользователь
        loadUserElements(user);

        /* для массива объектов статей получим соотвествующие HTML элементы */
        var postsNodes = loadPosts(articles);
        /* вставим HTML элементы в '.article-list' элемент в DOM. */
        postsNodes.forEach(function (node) {
            CONTENT_AREA.appendChild(node);
        });
    }

    function removePostFromDom(id) {
        var post = document.getElementById(id.toString());
        if (post) {
            post.className = 'removed-item';
            post.id = 'removed-item';
            var contentStartPadding = 130, contentEndPadding = 330, coef = 0.7;
            if (CONTENT_AREA.contains(document.querySelector(".login-window"))) {
                contentStartPadding = 120;
                contentEndPadding = 120;
                coef = 0;
            }
            if (CONTENT_AREA.contains(document.querySelector(".detailed-post"))) {
                contentStartPadding = 130;
                contentEndPadding = 130;
                coef = 0;
            }
            document.getElementById('removed-item').addEventListener('animationend', function (e) {
                CONTENT_AREA.style.paddingTop = contentEndPadding + 'px';
                CONTENT_AREA.removeChild(post);
                articleModel.removeArticle(id);
                var ANIMATION_TIME = 300;
                var start = Date.now();
                var timer = setInterval(function () {
                    var timePassed = Date.now() - start;
                    if (timePassed >= ANIMATION_TIME) {
                        clearInterval(timer);
                        CONTENT_AREA.style.paddingTop = contentStartPadding + 'px';
                        return;
                    }
                    draw(timePassed);
                }, 10);
            });
        }
        function draw(timePassed) {
            CONTENT_AREA.style.paddingTop = contentEndPadding - timePassed * coef + 'px';
        }

        articleModel.removeArticle(id);
        // Holly fucking shit, 2.5 часа тыкался и заработало
    }

    function removePostsFromDom() {
        COLUMN.innerHTML = '';
        CONTENT_AREA.innerHTML = '';
        document.querySelector(".column").appendChild(CONTENT_AREA);
    }

    function removeDetailedPostFromDom(id) {
        var post = document.getElementById(id.toString());
        if (post) {
            post.className = 'det-removed-item';
            post.id = 'det-removed-item';
            var contentStartPadding = 130, contentEndPadding = 430, coef = 0.6;
            document.getElementById('det-removed-item').addEventListener('animationend', function (e) {
                CONTENT_AREA.style.paddingTop = contentEndPadding + 'px';
                CONTENT_AREA.removeChild(post);
                var ANIMATION_TIME = 500;
                var start = Date.now();
                var timer = setInterval(function () {
                    var timePassed = Date.now() - start;
                    if (timePassed >= ANIMATION_TIME) {
                        clearInterval(timer);
                        CONTENT_AREA.style.paddingTop = contentStartPadding + 'px';
                        return;
                    }
                    draw(timePassed);
                }, 10);
            });
        }
        function draw(timePassed) {
            CONTENT_AREA.style.paddingTop = contentEndPadding - timePassed * coef + 'px';
        }
    }

    function loadPost(article) {
        var temp = POST_TEMPLATE.cloneNode(true);
        temp.content.querySelector(".post").id = article.id;
        temp.content.querySelector(".post-title").textContent = article.title;
        temp.content.querySelector(".post-short-description").textContent = article.summary;
        temp.content.querySelector(".post-date").textContent = formatDate(article.createdAt);
        temp.content.querySelector(".post-author").textContent = article.author;
        temp.content.querySelector(".image-cropper").lastElementChild.src = article.imageSrc;
        temp.content.querySelector(".post-tags").innerHTML = article.tags;


        var controlButtons = temp.content.querySelector(".control-buttons");
        if (!user) {
            if (controlButtons) {
                temp.content.querySelector(".post").removeChild(controlButtons);
            }
        }
        return temp.content.querySelector('.post').cloneNode(true);
    }

    function loadPosts(articles) {
        return articles.map(function (article) {
            return loadPost(article);
        });
    }

    function loadUserElements(user) {
        var addPostButton = document.querySelector(".header-row").querySelector(".add-button");
        var addPostButtonTemplate = document.querySelector("#add-button").cloneNode(true);
        if (user) {
            document.querySelector(".user-info").lastElementChild.src = "images/userlogo.png";
            if (!addPostButton) {
                document.querySelector(".header-row").appendChild(addPostButtonTemplate.content.querySelector('.add-button').cloneNode(true));
            }
        } else {
            document.querySelector(".user-info").lastElementChild.src = "images/notuserlogo.png";
            if (addPostButton) {
                document.querySelector(".header-row").removeChild(addPostButton);
            }
        }
    }

    function returnToMain(filterConfig) {
        var removedContent = document.querySelector(".content").cloneNode(true);
        removedContent.className = 'removed-content';
        removedContent.id = 'removed-content';
        document.querySelector(".column").removeChild(CONTENT_AREA);

        removePostsFromDom();
        renderPosts(0, articleModel.getArticlesSize(), filterConfig);
    }

    function searchResult() {
        var title = document.querySelector(".header-search-input").value || null;
        var filterConfig = new FilterConfig(title);
        returnToMain(filterConfig);
    }

    function applyFilter() {
        var title, date = null, author, tags;
        title = document.querySelector(".filter-input-title").value || null;
        author = document.querySelector(".filter-input-author").value || null;
        tags = document.querySelector(".filter-input-tags").value.split(",");
        if (!tags.length) {
            tags = null;
        }
        if (document.querySelector(".filter-button-date").textContent !== 'Дата') {
            date = document.querySelector(".filter-button-date").textContent;
        }
        var filterConfig = new FilterConfig(title, date, author, tags);
        returnToMain(filterConfig);
    }

    function checkAuthInput() {
        var inputUser = document.querySelector(".login-input").value;
        var inputPass = document.querySelector(".pass-input").value;

        if (checkLogin(inputUser, inputPass)) {
            returnToMain();
        } else {
            insertError("Неправильный пользователь");
        }
    }

    function checkLogin(log, pass) {
        if (log === 'admin' && pass === 'admin') {
            user = 'admin';
            return true;
        }
        if (log === 'Brama' && pass === 'Brama') {
            user = 'Brama';
            return true;
        }
        return false;
    }

    function editPostInDom(id, article) {
        var articleId = document.querySelector('.edit-post-id').innerHTML;
        articleId = articleId.substr(3, articleId.length);
        var newArticle = {
            id: articleId,
            title: document.querySelector(".edit-post-title").value,
            summary: document.querySelector(".edit-post-short-description").value,
            createdAt: new Date(),
            author: document.querySelector(".edit-post-author").textContent,
            tags: document.querySelector(".edit-post-tags").value.split(","),
            content: document.querySelector(".edit-post-description").value,
            imageSrc: document.querySelector(".edit-image-cropper").lastElementChild.src
        };

        console.log(articleId);
        if (articleModel.getArticle(articleId)) {
            if (articleModel.editArticle(parseInt(articleId), newArticle)) {
                document.querySelector('.edit-enter').textContent = "Изменено успешно!";
                document.querySelector('.edit-enter').style.background = "#5188E8";
                setTimeout(postLoader.returnToMain, 2000);
            } else {
                alert("Измененный пост не проходит модерацию на проверку!");
            }
        } else {
            if (articleModel.addArticle(newArticle)) {
                document.querySelector('.edit-enter').textContent = "Добавлено успешно!";
                document.querySelector('.edit-enter').style.background = "#5188E8";
                setTimeout(postLoader.returnToMain, 2000);
            }
        }

    }

    function insertEditPost(article) {
        //not remove all
        var renderedArticle = EDIT_POST_TEMPLATE;
        var removedContent = document.querySelector(".content").cloneNode(true);
        removedContent.className = 'removed-content';
        removedContent.id = 'removed-content';
        document.querySelector(".column").removeChild(CONTENT_AREA);
        document.querySelector(".column").appendChild(removedContent);
        document.getElementById('removed-content').addEventListener('animationend', function (e) {
            removePostsFromDom();
            if (article) {
                renderedArticle.content.querySelector(".edit-post").id = article.id;
                renderedArticle.content.querySelector(".edit-post-title").value = article.title;
                renderedArticle.content.querySelector(".edit-post-tags").value = article.tags;
                renderedArticle.content.querySelector(".edit-image-cropper").lastElementChild.src = article.imageSrc;

                renderedArticle.content.querySelector(".edit-post-id").textContent = 'ID-' + article.id;
                renderedArticle.content.querySelector(".edit-post-author").textContent = article.author;
                renderedArticle.content.querySelector(".edit-post-date").textContent = formatDate(article.createdAt);

                renderedArticle.content.querySelector(".edit-post-short-description").textContent = article.summary;
                renderedArticle.content.querySelector(".edit-post-description").textContent = article.content;
                renderedArticle.content.querySelector(".edit-enter").textContent = "Изменить";
            } else {
                console.log(articleModel.getArticlesSize());
                renderedArticle.content.querySelector(".edit-post").id = articleModel.getArticlesSize() + 1;
                renderedArticle.content.querySelector(".edit-post-title").value = '';
                renderedArticle.content.querySelector(".edit-post-tags").value = '';
                renderedArticle.content.querySelector(".edit-image-cropper").lastElementChild.src = "images/userlogo.png";

                renderedArticle.content.querySelector(".edit-post-id").textContent = 'ID-' + (articleModel.getArticlesSize() + 1);
                renderedArticle.content.querySelector(".edit-post-author").textContent = user;
                renderedArticle.content.querySelector(".edit-post-date").textContent = formatDate(new Date());

                renderedArticle.content.querySelector(".edit-post-short-description").textContent = '';
                renderedArticle.content.querySelector(".edit-post-description").textContent = '';
                renderedArticle.content.querySelector(".edit-enter").textContent = "Добавить";
                // adding new post
            }
            CONTENT_AREA.insertBefore(renderedArticle.content.querySelector(".edit-post").cloneNode(true), CONTENT_AREA.firstChild);
            document.querySelector('.edit-enter').addEventListener('click', editPostInDom);
        });
    }

    function insertError(errCode) {
        var removedContent = document.querySelector(".content").cloneNode(true);
        removedContent.className = 'removed-content';
        removedContent.id = 'removed-content';
        document.querySelector(".column").removeChild(CONTENT_AREA);
        document.querySelector(".column").appendChild(removedContent);
        document.getElementById('removed-content').addEventListener('animationend', function (e) {
            removePostsFromDom();

            var template = ERROR_TEMPLATE;
            template.content.querySelector(".error-window-code").textContent = 'Код ошибки : ' + errCode;
            CONTENT_AREA.insertBefore(template.content.querySelector(".error-window").cloneNode(true), CONTENT_AREA.firstChild);
            document.querySelector('.error-window').addEventListener('click', returnToMain);
        });
    }

    function insertFilter() {
        if (!CONTENT_AREA.contains(document.querySelector(".filter"))) {
            var temp = FILTER_TEMPLATE;
            CONTENT_AREA.insertBefore(temp.content.querySelector(".filter").cloneNode(true), CONTENT_AREA.firstChild);
            document.querySelector('.filter-button-apply').addEventListener('click', applyFilter);
        }
    }

    function insertLogin() {
        var temp = LOGIN_TEMPLATE;
        if (!CONTENT_AREA.contains(document.querySelector(".login-window"))) {
            var ANIMATION_TIME = 300;
            var start = Date.now();
            var timer = setInterval(function () {
                var timePassed = Date.now() - start;
                if (timePassed >= ANIMATION_TIME) {
                    clearInterval(timer);
                    CONTENT_AREA.style.paddingTop = 120 + 'px';
                    CONTENT_AREA.insertBefore(temp.content.querySelector(".login-window").cloneNode(true), CONTENT_AREA.firstChild);
                    document.querySelector('.login-window-enter-button').addEventListener('click', checkAuthInput);
                    return;
                }
                draw(timePassed);
            }, 25);
        }
        function draw(timePassed) {
            CONTENT_AREA.style.paddingTop = timePassed * 2 + 'px';
        }
    }

    function insertDetailedInDOM(article) {
        // fix --> авториз = !авториз
        if (CONTENT_AREA.contains(document.getElementById(article.id))) {
            var temp = DETAILED_POST_TEMPLATE;
            temp.content.querySelector(".detailed-post").id = article.id + '999';
            temp.content.querySelector(".detailed-post-title").textContent = article.title;
            temp.content.querySelector(".detailed-post-description").textContent = article.content;
            temp.content.querySelector(".detailed-post-date").textContent = formatDate(article.createdAt);
            temp.content.querySelector(".detailed-post-author").textContent = article.author;
            temp.content.querySelector(".detailed-image-cropper").lastElementChild.src = article.imageSrc;
            temp.content.querySelector(".detailed-post-tags").innerHTML = article.tags;

            //если нет юзера - удаляем
            if (!user) {
                var controlButtons = temp.content.querySelector(".detailed-control-buttons");
                var userInfo = document.querySelector(".user-info").lastElementChild.src = "images/notuserlogo.png";
                var addPostButton = document.querySelector(".add-button");
                if (controlButtons && addPostButton) {
                    temp.content.querySelector(".detailed-post").removeChild(controlButtons);
                    document.querySelector(".header-row").removeChild(addPostButton);
                }
                console.log('deleted');
            }
            var ANIMATION_TIME = 300;
            var start = Date.now();
            var timer = setInterval(function () {
                var timePassed = Date.now() - start;
                if (timePassed >= ANIMATION_TIME) {
                    clearInterval(timer);
                    CONTENT_AREA.style.paddingTop = 130 + 'px';
                    CONTENT_AREA.insertBefore(temp.content.querySelector('.detailed-post').cloneNode(true), CONTENT_AREA.firstChild);
                    return;
                }
                draw(timePassed);
            }, 25);
            event.stopPropagation();
        }
        function draw(timePassed) {
            CONTENT_AREA.style.paddingTop = timePassed * 1.5 + 'px';
        }

    }

    function formatDate(d) {
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
            d.getUTCHours() + ':' + d.getMinutes();
    }

    return {
        init: init,
        insertPostsInDOM: insertPostsInDOM,
        removePostsFromDom: removePostsFromDom,
        removePostFromDom: removePostFromDom,
        removeDetailedPostFromDom: removeDetailedPostFromDom,
        insertPostInDOM: insertPostInDOM,
        insertLoginInDom: insertLogin,
        insertErrorInDom: insertError,
        insertFilterInDom: insertFilter,
        insertEditInDom: insertEditPost,
        insertDetailedPostInDom: insertDetailedInDOM,
        editPostInDom: editPostInDom,
        searchResult: searchResult,
        returnToMain: returnToMain
    };
}());

var pagination = (function () {
    var ITEMS_PER_СLICK = 10; // статей на 1-ой странице
    var ITEMS_SHOWN = 10;
    var filterConfig;
    var total; // всего статей
    var showMoreButton;
    var showMoreCallback;


    function init(_total, _showMoreCallback, _filterConfig) {
        total = _total;
        showMoreCallback = _showMoreCallback;
        _filterConfig = filterConfig;
        showMoreButton = document.querySelector('.more-button');
        showMoreButton.addEventListener('click', handleShowMoreClick);

        /* Не показывать кнопку если статей нет */
        showOrHideMoreButton();

        /* Вернуть skip, top для начальной отрисовки статей */
        return getParams();
    }

    function handleShowMoreClick() {
        var postsShown = nextPage();
        showMoreCallback(postsShown.skip, postsShown.top, filterConfig);
        console.log(ITEMS_SHOWN);
    }

    function nextPage() {
        ITEMS_SHOWN += ITEMS_PER_СLICK;
        /* возможно, статей больше нет, спрятать кнопку */
        showOrHideMoreButton();
        return getParams();
    }

    function getParams() {
        return {
            top: ITEMS_SHOWN,
            skip: 0,
            filterConfig: filterConfig
        };
    }

    function showOrHideMoreButton() {
        showMoreButton.hidden = total <= ITEMS_SHOWN;
    }

    return {
        init: init,
        getParams: getParams
    }

}());

function addEventListeners() {
    var headerRowElements = document.querySelector('.header-row')
    var postListNodes = document.querySelector('.content');

    headerRowElements.addEventListener('click', eventHeader);
    postListNodes.addEventListener('click', eventPost);

}
function eventHeader(event) {
    var elementClassName = event.target.className;
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
    }
}
function eventPost(event) {
    switch (event.target.className) {
        case  'button-delete-img':
            var articleToDelete = parseInt(event.target.parentElement.parentElement.parentElement.getAttribute('id'));
            postLoader.removePostFromDom(articleToDelete);
            break;
        case  'detailed-button-delete-img':
            var articleToDelete = parseInt(event.target.parentElement.parentElement.parentElement.getAttribute('id'));
            postLoader.removeDetailedPostFromDom(articleToDelete);
            break;
        case 'button-change-img':
            var currentEvent = event.target;
            while (!currentEvent.hasAttribute("id")) {
                currentEvent = currentEvent.parentElement;
            }
            var articleToInsertNumber = parseInt(currentEvent.getAttribute('id'));
            postLoader.insertEditInDom(articleModel.getArticle(articleToInsertNumber));
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
            var currentEvent = event.target;
            while (!currentEvent.hasAttribute("id")) {
                currentEvent = currentEvent.parentElement;
            }
            var articleToInsertNumber = parseInt(currentEvent.getAttribute('id'));
            postLoader.insertDetailedPostInDom(articleModel.getArticle(articleToInsertNumber));
            break;
    }
}

document.addEventListener('DOMContentLoaded', startApp);
addEventListeners();

function startApp() {

    postLoader.init();
    pagination.init(articleModel.getArticlesSize(), function (skip, top, filterConfig) {
        renderPosts(skip, top, filterConfig);
    });
    renderPosts(pagination.skip, pagination.top);
    /*
     postLoader.insertPostInDOM({
     id: "21",
     title: "Новый добавленный пост",
     summary: "На выставке MWC 2017 в Барселоне компания HMD Global, которая  на выпуск смартфонов  Nokia, представила новые Android-смартфоны разных ценовыхкатегорий — Nokia 3, Nokia 5 и Nokia 6.",
     createdAt: new Date('2017-02-26T20:31:00'),
     author: "Brama",
     content: "Nokia 3 — самый бюджетный аппарат из всей линейки, он стоит от 147 долларов США.Смартфон получил металлический корпус с задней панелью из поликарбоната, 5,2-дюймовый экран с разрешением 1280 на 720 пикселей, процессор MTK 6737, 2 ГБ оперативной и 16 ГБ встроенной памяти, а также фронтальную и основную камеры на 8 Мп. Емкость батареи — 2650 мАч.",
     imageSrc: "images/10.jpg",
     tags: ["MWC 2017",
     "Гаджеты",
     "Смартфоны",
     "Выставки",
     "Дизайн"]
     });
     //3

     postLoader.removePostFromDom(20);
     //4
     postLoader.editPostInDom(21, {
     title: "Легенда уже вернулась, алло, это сайт ATAC",
     imageSrc: "images/legend.png",
     summary: "Лучший новостной сайт у вас перед глазами!"
     });
     //5
     //Сделана проверка в функции loadPost, ибо нет смысла изначально создавать эти элементы, чтобы потом удалить.
     //6
     //Нет смысла заполнять опции фильтра, так как он отображается только по нажатию на кнопку.

     //Пользователь
     user = "Brama inc."
     renderPosts(0, 25);
     */
}

function renderPosts(skip, top, filterConfig) {
    postLoader.removePostsFromDom();
    var posts = articleModel.getArticles(skip, top, filterConfig);
    postLoader.insertPostsInDOM(posts);
}































