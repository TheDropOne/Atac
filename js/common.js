'use strict';

var user  ;

var articleModel = (function () {
    var tags = ["MWC 2017", "Гаджеты", "Смартфоны", "Выставки", "Дизайн"];
    var articles = [
        {
            id: "1",
            title: "MWC 2017: Samsung показала, как должны выглядеть современные компьютеры",
            summary: "В «нулевой» день выставки MWC 2017 компания Samsung провела большую пресс-конференцию, на которой показала свое видение современных компьютеров – это легкие и мощные планшеты с клавиатурами и стилусами.",
            createdAt: new Date('2017-02-27T01:34:00'),
            author: "Brama",
            content: "В «нулевой» день выставки MWC 2017 компания Samsung провела большуюпресс-конференцию, на которой показала свое видение современных компьютеров – это легкие и мощные планшеты с клавиатурами и стилусами.",
            imageSrc: "images/1.jpg",
            tags: ["MWC 2017",
                "Гаджеты",
                "Wireless"]
        },
        {
            id: "2",
            title: "Путин и Назарбаев вместе покатались на лыжах",
            summary: "Президенты России и Казахстана Владимир Путин и Нурсултан Назарбаев вместе покатались на горнолыжном курорте неподалеку от Алма-Аты.",
            createdAt: new Date('2017-02-26T23:26:00'),
            author: "Brama",
            content: "Президенты России и Казахстана Владимир Путин и Нурсултан Назарбаев вместе покатались на горнолыжном курорте неподалеку от Алма-Аты.",
            imageSrc: "images/2.jpg",
            tags: ["Досуш",
                "Хобби",
                "Президент"]
        },
        {
            id: "3",
            title: "Брат Ким Чен Ына умер в муках в течение 15-20 минут",
            summary: "Как заявил министр здравоохранения Малайзии Субраманьям Сатхасивам, брат лидера Северной Кореи Ким Чон Нам был отравлен большой дозой нервно-паралитического токсина VX и умер в муках в течение 15−20 минут.",
            createdAt: new Date('2017-02-26T23:17:00'),
            author: "Brama",
            content: "Как заявил министр здравоохранения Малайзии Субраманьям Сатхасивам, брат лидера Северной Кореи Ким Чон Нам был отравлен большой дозой нервно-паралитического токсина VX и умер в муках в течение 15−20 минут.",
            imageSrc: "images/3.jpg",
            tags: ["Проишествия",
                "ООН"]
        },
        {
            id: "4",
            title: "Как под Минском иглу строили",
            summary: "На последние выходные зимы недалеко от Минска планировалось проведение иглу-фэста, но погода не благоволила энтузиастам. Потому они собрались на Масленицу и заодно построили один снежный домик",
            createdAt: new Date('2017-02-26T23:09:00'),
            author: "Brama",
            content: "На последние выходные зимы недалеко от Минска планировалось проведение иглу-фэста, но погода не благоволила энтузиастам. Потому они собрались на Масленицу и заодно построили один снежный домик",
            imageSrc: "images/4.jpg",
            tags: ["Позитив",
                "Беларусь"]
        },
        {
            id: "5",
            title: "Возвращение легенды: представлены новые смартфоны под брендом Nokia",
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
        },
        {
            id: "6",
            title: "MWC 2017: Samsung показала, как должны выглядеть современные компьютеры",
            summary: "В «нулевой» день выставки MWC 2017 компания Samsung провела большую пресс-конференцию, на которой показала свое видение современных компьютеров – это легкие и мощные планшеты с клавиатурами и стилусами.",
            createdAt: new Date('2017-02-27T01:34:00'),
            author: "Brama",
            content: "В «нулевой» день выставки MWC 2017 компания Samsung провела большуюпресс-конференцию, на которой показала свое видение современных компьютеров – это легкие и мощные планшеты с клавиатурами и стилусами.",
            imageSrc: "images/1.jpg",
            tags: ["MWC 2017",
                "Гаджеты",
                "Wireless"]
        },
        {
            id: "7",
            title: "Путин и Назарбаев вместе покатались на лыжах",
            summary: "Президенты России и Казахстана Владимир Путин и Нурсултан Назарбаев вместе покатались на горнолыжном курорте неподалеку от Алма-Аты.",
            createdAt: new Date('2017-02-26T23:26:00'),
            author: "Brama",
            content: "Президенты России и Казахстана Владимир Путин и Нурсултан Назарбаев вместе покатались на горнолыжном курорте неподалеку от Алма-Аты.",
            imageSrc: "images/2.jpg",
            tags: ["Досуш",
                "Хобби",
                "Президент"]
        },
        {
            id: "8",
            title: "Брат Ким Чен Ына умер в муках в течение 15-20 минут",
            summary: "Как заявил министр здравоохранения Малайзии Субраманьям Сатхасивам, брат лидера Северной Кореи Ким Чон Нам был отравлен большой дозой нервно-паралитического токсина VX и умер в муках в течение 15−20 минут.",
            createdAt: new Date('2017-02-26T23:17:00'),
            author: "Brama",
            content: "Как заявил министр здравоохранения Малайзии Субраманьям Сатхасивам, брат лидера Северной Кореи Ким Чон Нам был отравлен большой дозой нервно-паралитического токсина VX и умер в муках в течение 15−20 минут.",
            imageSrc: "images/3.jpg",
            tags: ["Проишествия",
                "ООН"]
        },
        {
            id: "9",
            title: "Как под Минском иглу строили",
            summary: "На последние выходные зимы недалеко от Минска планировалось проведение иглу-фэста, но погода не благоволила энтузиастам. Потому они собрались на Масленицу и заодно построили один снежный домик",
            createdAt: new Date('2017-02-26T23:09:00'),
            author: "Brama",
            content: "На последние выходные зимы недалеко от Минска планировалось проведение иглу-фэста, но погода не благоволила энтузиастам. Потому они собрались на Масленицу и заодно построили один снежный домик",
            imageSrc: "images/4.jpg",
            tags: ["Позитив",
                "Беларусь"]
        },
        {
            id: "10",
            title: "Возвращение легенды: представлены новые смартфоны под брендом Nokia",
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
        },
        {
            id: "11",
            title: "MWC 2017: Samsung показала, как должны выглядеть современные компьютеры",
            summary: "В «нулевой» день выставки MWC 2017 компания Samsung провела большую пресс-конференцию, на которой показала свое видение современных компьютеров – это легкие и мощные планшеты с клавиатурами и стилусами.",
            createdAt: new Date('2017-02-27T01:34:00'),
            author: "Brama",
            content: "В «нулевой» день выставки MWC 2017 компания Samsung провела большуюпресс-конференцию, на которой показала свое видение современных компьютеров – это легкие и мощные планшеты с клавиатурами и стилусами.",
            imageSrc: "images/1.jpg",
            tags: ["MWC 2017",
                "Гаджеты",
                "Wireless"]
        },
        {
            id: "12",
            title: "Путин и Назарбаев вместе покатались на лыжах",
            summary: "Президенты России и Казахстана Владимир Путин и Нурсултан Назарбаев вместе покатались на горнолыжном курорте неподалеку от Алма-Аты.",
            createdAt: new Date('2017-02-26T23:26:00'),
            author: "Brama",
            content: "Президенты России и Казахстана Владимир Путин и Нурсултан Назарбаев вместе покатались на горнолыжном курорте неподалеку от Алма-Аты.",
            imageSrc: "images/2.jpg",
            tags: ["Досуш",
                "Хобби",
                "Президент"]
        },
        {
            id: "13",
            title: "Брат Ким Чен Ына умер в муках в течение 15-20 минут",
            summary: "Как заявил министр здравоохранения Малайзии Субраманьям Сатхасивам, брат лидера Северной Кореи Ким Чон Нам был отравлен большой дозой нервно-паралитического токсина VX и умер в муках в течение 15−20 минут.",
            createdAt: new Date('2017-02-26T23:17:00'),
            author: "Brama",
            content: "Как заявил министр здравоохранения Малайзии Субраманьям Сатхасивам, брат лидера Северной Кореи Ким Чон Нам был отравлен большой дозой нервно-паралитического токсина VX и умер в муках в течение 15−20 минут.",
            imageSrc: "images/3.jpg",
            tags: ["Проишествия",
                "ООН"]
        },
        {
            id: "14",
            title: "Как под Минском иглу строили",
            summary: "На последние выходные зимы недалеко от Минска планировалось проведение иглу-фэста, но погода не благоволила энтузиастам. Потому они собрались на Масленицу и заодно построили один снежный домик",
            createdAt: new Date('2017-02-26T23:09:00'),
            author: "Brama",
            content: "На последние выходные зимы недалеко от Минска планировалось проведение иглу-фэста, но погода не благоволила энтузиастам. Потому они собрались на Масленицу и заодно построили один снежный домик",
            imageSrc: "images/4.jpg",
            tags: ["Позитив",
                "Беларусь"]
        },
        {
            id: "15",
            title: "Возвращение легенды: представлены новые смартфоны под брендом Nokia",
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
        },
        {
            id: "16",
            title: "MWC 2017: Samsung показала, как должны выглядеть современные компьютеры",
            summary: "В «нулевой» день выставки MWC 2017 компания Samsung провела большую пресс-конференцию, на которой показала свое видение современных компьютеров – это легкие и мощные планшеты с клавиатурами и стилусами.",
            createdAt: new Date('2017-02-27T01:34:00'),
            author: "Brama",
            content: "В «нулевой» день выставки MWC 2017 компания Samsung провела большуюпресс-конференцию, на которой показала свое видение современных компьютеров – это легкие и мощные планшеты с клавиатурами и стилусами.",
            imageSrc: "images/1.jpg",
            tags: ["MWC 2017",
                "Гаджеты",
                "Wireless"]
        },
        {
            id: "17",
            title: "Путин и Назарбаев вместе покатались на лыжах",
            summary: "Президенты России и Казахстана Владимир Путин и Нурсултан Назарбаев вместе покатались на горнолыжном курорте неподалеку от Алма-Аты.",
            createdAt: new Date('2017-02-26T23:26:00'),
            author: "Brama",
            content: "Президенты России и Казахстана Владимир Путин и Нурсултан Назарбаев вместе покатались на горнолыжном курорте неподалеку от Алма-Аты.",
            imageSrc: "images/2.jpg",
            tags: ["Досуш",
                "Хобби",
                "Президент"]
        },
        {
            id: "18",
            title: "Брат Ким Чен Ына умер в муках в течение 15-20 минут",
            summary: "Как заявил министр здравоохранения Малайзии Субраманьям Сатхасивам, брат лидера Северной Кореи Ким Чон Нам был отравлен большой дозой нервно-паралитического токсина VX и умер в муках в течение 15−20 минут.",
            createdAt: new Date('2017-02-26T23:17:00'),
            author: "Brama",
            content: "Как заявил министр здравоохранения Малайзии Субраманьям Сатхасивам, брат лидера Северной Кореи Ким Чон Нам был отравлен большой дозой нервно-паралитического токсина VX и умер в муках в течение 15−20 минут.",
            imageSrc: "images/3.jpg",
            tags: ["Проишествия",
                "ООН"]
        },
        {
            id: "19",
            title: "Как под Минском иглу строили",
            summary: "На последние выходные зимы недалеко от Минска планировалось проведение иглу-фэста, но погода не благоволила энтузиастам. Потому они собрались на Масленицу и заодно построили один снежный домик",
            createdAt: new Date('2017-02-26T23:09:00'),
            author: "Brama",
            content: "На последние выходные зимы недалеко от Минска планировалось проведение иглу-фэста, но погода не благоволила энтузиастам. Потому они собрались на Масленицу и заодно построили один снежный домик",
            imageSrc: "images/4.jpg",
            tags: ["Позитив",
                "Беларусь"]
        },
        {
            id: "20",
            title: "Возвращение легенды: представлены новые смартфоны под брендом Nokia",
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
        }];

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
    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    function getArticle(id) {
        if (articles.length != 0) {
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].id && (articles[i].id == id)) {
                    console.log('Post returned');
                    return articles[i];
                }
            }
        }
        console.log('Post with that id doesn\'t exist');
        return null;
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
        if (article == null || article === undefined) {
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
            articles.push(article);
            console.log('Article successfully added');
            return true;
        } catch (exception) {
            console.log('Article not added');
            console.log(exception);
            return false;
        }
    }

    function editArticle(id, article) {
        var index = 0;
        var tempPost = {
            id: "-1",
            title: "-1",
            summary: "-1",
            createdAt: new Date('2017-02-26T20:30:00'),
            author: "-1",
            content: "-1.",
            imageSrc: "-1",
            tags: []
        };
        if (!id) {
            console.log("ID is null or undefined");
            return false;
        }
        for (var i = 0; i < articles.length; i++) {
            if (articles[i].id && (articles[i].id == id)) {
                tempPost = clone(articles[i]);
                index = i;
                break;
            }
        }
        if (!article) {
            console.log("Article is null or undefined");
            return false;
        }
        if (!tempPost) {
            console.log("Post with that id doesn't exist");
            return false;
        }
        if (article.title) {
            tempPost.title = article.title;
        }
        if (article.summary) {
            tempPost.summary = article.summary;
        }
        if (article.content) {
            tempPost.content = article.content;
        }
        if (article.imageSrc) {
            tempPost.imageSrc = article.imageSrc;
        }
        if (article.tags) {
            tempPost.tags = article.tags;
        }
        articles[index] = null;
        if (!validateArticle(tempPost)) {
            console.log("Post not validated");
            articles[index] = tempPost;
            return false;
        }
        articles[index] = tempPost;
        console.log("Post successfully edited");
        return true;
    }

    function removeArticle(id) {
        for (var i = 0; i < articles.length; i++) {
            if (articles[i] !== null && articles[i].id == id) {
                articles.splice(i, 1);
                console.log("Post successfully removed");
                return true;
            }
        }
        console.log('Post with that id not exist');
        return false;
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

    function init() {
        COLUMN = document.querySelector(".column");
        CONTENT_AREA = document.querySelector(".content");
        POST_TEMPLATE = document.querySelector('#template-post-item');
        DETAILED_POST_TEMPLATE = document.querySelector('#detailed-post-template');
        EDIT_POST_TEMPLATE = document.querySelector('#edit-post-template');
        ERROR_TEMPLATE = document.querySelector('#error-window-template');
        LOGIN_TEMPLATE = document.querySelector('#login-window-template');
    }

    function insertPostsInDOM(articles) {
        /* для массива объектов статей получим соотвествующие HTML элементы */
        var postsNodes = loadPosts(articles);
        /* вставим HTML элементы в '.article-list' элемент в DOM. */
        postsNodes.forEach(function (node) {
            CONTENT_AREA.appendChild(node);
        });
    }

    function insertPostInDOM(article) {
        articleModel.addArticle(article);
        CONTENT_AREA.appendChild(loadPost(article));
    }




function removePostsFromDom() {
    COLUMN.innerHTML = '';
    CONTENT_AREA.innerHTML = '';
    document.querySelector(".column").appendChild(CONTENT_AREA);
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


function loadPosts(articles) {
    return articles.map(function (article) {
        return loadPost(article);
    });
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

    //если нет юзера - удаляем
    console.log(user);

    var addPostButton = document.querySelector(".add-button");
    var controlButtons = temp.content.querySelector(".control-buttons");
    if (!user) {
        var userInfo = document.querySelector(".user-info").lastElementChild.src = "images/notuserlogo.png";
        if (controlButtons ) {
            temp.content.querySelector(".post").removeChild(controlButtons);
        }
        if(addPostButton){
            document.querySelector(".header-row").removeChild(addPostButton);
        }
        console.log('deleted');
    }else{
        document.querySelector(".user-info").lastElementChild.src = "images/userlogo.png";
    }
    return temp.content.querySelector('.post').cloneNode(true);
}

function returnToMain() {
    var removedContent = document.querySelector(".content").cloneNode(true);
    removedContent.className = 'removed-content';
    removedContent.id = 'removed-content';
    document.querySelector(".column").removeChild(CONTENT_AREA);

    removePostsFromDom();
    renderPosts(0, articleModel.getArticlesSize());
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

            renderedArticle.content.querySelector(".edit-post-id").textContent = 'ID-'+article.id;
            renderedArticle.content.querySelector(".edit-post-author").textContent = article.author;
            renderedArticle.content.querySelector(".edit-post-date").textContent = formatDate(article.createdAt);

            renderedArticle.content.querySelector(".edit-post-short-description").textContent = article.summary;
            renderedArticle.content.querySelector(".edit-post-description").textContent = article.content;
        } else {
            renderedArticle.content.querySelector(".edit-post").id = articleModel.getArticlesSize();
            renderedArticle.content.querySelector(".edit-post-title").value = '';
            renderedArticle.content.querySelector(".edit-post-tags").value = '';
            renderedArticle.content.querySelector(".edit-image-cropper").lastElementChild.src = "images/notuserlogo.png";

            renderedArticle.content.querySelector(".edit-post-id").textContent = '';
            renderedArticle.content.querySelector(".edit-post-author").textContent = user;
            renderedArticle.content.querySelector(".edit-post-date").textContent = formatDate(new Date());

            renderedArticle.content.querySelector(".edit-post-short-description").textContent = '';
            renderedArticle.content.querySelector(".edit-post-description").textContent = '';
            // adding new post
        }
        CONTENT_AREA.insertBefore(renderedArticle.content.querySelector(".edit-post").cloneNode(true), CONTENT_AREA.firstChild);
        document.querySelector('.edit-enter').addEventListener('click',editPostInDom);
    });
}

function editPostInDom(id, article) {
    var newArticle = {
        title: document.querySelector(".edit-post-title").value,
        summary: document.querySelector(".edit-post-description").value,
        tags: document.querySelector(".edit-post-tags").value.split(","),
        content: document.querySelector(".edit-post-description").value,
    };
    var articleId = document.querySelector('.edit-post-id').innerHTML;
    if(articleModel.editArticle(parseInt(articleId.substr(3,articleId.length)), newArticle)){
        document.querySelector('.edit-enter').textContent = "Изменено успешно!";
        document.querySelector('.edit-enter').style.background = "#5188E8";
        setTimeout(postLoader.returnToMain,2000);
    }else{
        alert("Измененный пост не проходит модерацию на проверку!");
    }
    //renderPosts(0, 25);
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
    insertEditInDom: insertEditPost,
    insertDetailedPostInDom: insertDetailedInDOM,
    editPostInDom: editPostInDom,
    returnToMain: returnToMain
};}()
);

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
            // fix -->  поиск
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
            postLoader.insertErrorInDom("Sorry no filter yet");
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
    //1
    renderPosts(0, 25);
    //2
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

function renderPosts(skip, top) {
    postLoader.removePostsFromDom();
    var posts = articleModel.getArticles(skip, top);
    console.log(user);
    postLoader.insertPostsInDOM(posts);
}































