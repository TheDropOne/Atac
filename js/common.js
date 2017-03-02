class Post {
    id;
    title;
    summary;
    createdAt;
    author;
    content;
    imageSrc;
    tags;

    constructor(id, title, summary, createdAt, author, content, imageSrc, tags) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.createdAt = createdAt;
        this.author = author;
        this.content = content;
        this.imageSrc = imageSrc;
        this.tags = tags;
    }
}
class FilterConfig {
    byName;
    byDate;
    byAuthor;
    byTags;

    constructor(byName, byDate, byAuthor, byTags) {
        this.byName = byName;
        this.byDate = byDate;
        this.byAuthor = byAuthor;
        this.byTags = byTags;
    }
}

var articles = [
    Post(
        1,
        "Возвращение легенды: представлены новые смартфоны под брендом Nokia",
        "На выставке MWC 2017 в Барселоне компания HMD Global, которая владеетправами на выпуск смартфонов под брендом Nokia, представила новые Android-смартфоны разных ценовыхкатегорий — Nokia 3, Nokia 5 и Nokia 6.",
        new Date('2017-02-26T21:02:00'),
        "Brama",
        "Nokia 3 — самый бюджетный аппарат из всей линейки, он стоит от 147 долларов США.Смартфон получил металлический корпус с задней панелью из поликарбоната, 5,2-дюймовый экран с разрешением 1280 на 720 пикселей, процессор MTK 6737, 2 ГБ оперативной и 16 ГБ встроенной памяти, а также фронтальную и основную камеры на 8 Мп. Емкость батареи — 2650 мАч.",
        "images/10.jpg",
        ["MWC 2017", "Гаджеты", "Смартфоны", "Выставки", "Дизайн"]
    ),
    Post(
        1,
        "Возвращение легенды: представлены новые смартфоны под брендом Nokia",
        "На выставке MWC 2017 в Барселоне компания HMD Global, которая владеетправами на выпуск смартфонов под брендом Nokia, представила новые Android-смартфоны разных ценовыхкатегорий — Nokia 3, Nokia 5 и Nokia 6.",
        new Date('2017-02-26T21:02:00'),
        "Brama",
        "Nokia 3 — самый бюджетный аппарат из всей линейки, он стоит от 147 долларов США.Смартфон получил металлический корпус с задней панелью из поликарбоната, 5,2-дюймовый экран с разрешением 1280 на 720 пикселей, процессор MTK 6737, 2 ГБ оперативной и 16 ГБ встроенной памяти, а также фронтальную и основную камеры на 8 Мп. Емкость батареи — 2650 мАч.",
        "images/10.jpg",
        ["MWC 2017", "Гаджеты", "Смартфоны", "Выставки", "Дизайн"]
    ),
    Post(
        1,
        "Возвращение легенды: представлены новые смартфоны под брендом Nokia",
        "На выставке MWC 2017 в Барселоне компания HMD Global, которая владеетправами на выпуск смартфонов под брендом Nokia, представила новые Android-смартфоны разных ценовыхкатегорий — Nokia 3, Nokia 5 и Nokia 6.",
        new Date('2017-02-26T21:02:00'),
        "Brama",
        "Nokia 3 — самый бюджетный аппарат из всей линейки, он стоит от 147 долларов США.Смартфон получил металлический корпус с задней панелью из поликарбоната, 5,2-дюймовый экран с разрешением 1280 на 720 пикселей, процессор MTK 6737, 2 ГБ оперативной и 16 ГБ встроенной памяти, а также фронтальную и основную камеры на 8 Мп. Емкость батареи — 2650 мАч.",
        "images/10.jpg",
        ["MWC 2017", "Гаджеты", "Смартфоны", "Выставки", "Дизайн"]
    ),
    Post(
        1,
        "Возвращение легенды: представлены новые смартфоны под брендом Nokia",
        "На выставке MWC 2017 в Барселоне компания HMD Global, которая владеетправами на выпуск смартфонов под брендом Nokia, представила новые Android-смартфоны разных ценовыхкатегорий — Nokia 3, Nokia 5 и Nokia 6.",
        new Date('2017-02-26T21:02:00'),
        "Brama",
        "Nokia 3 — самый бюджетный аппарат из всей линейки, он стоит от 147 долларов США.Смартфон получил металлический корпус с задней панелью из поликарбоната, 5,2-дюймовый экран с разрешением 1280 на 720 пикселей, процессор MTK 6737, 2 ГБ оперативной и 16 ГБ встроенной памяти, а также фронтальную и основную камеры на 8 Мп. Емкость батареи — 2650 мАч.",
        "images/10.jpg",
        ["MWC 2017", "Гаджеты", "Смартфоны", "Выставки", "Дизайн"]
    ),
    Post(
        1,
        "Возвращение легенды: представлены новые смартфоны под брендом Nokia",
        "На выставке MWC 2017 в Барселоне компания HMD Global, которая владеетправами на выпуск смартфонов под брендом Nokia, представила новые Android-смартфоны разных ценовыхкатегорий — Nokia 3, Nokia 5 и Nokia 6.",
        new Date('2017-02-26T21:02:00'),
        "Brama",
        "Nokia 3 — самый бюджетный аппарат из всей линейки, он стоит от 147 долларов США.Смартфон получил металлический корпус с задней панелью из поликарбоната, 5,2-дюймовый экран с разрешением 1280 на 720 пикселей, процессор MTK 6737, 2 ГБ оперативной и 16 ГБ встроенной памяти, а также фронтальную и основную камеры на 8 Мп. Емкость батареи — 2650 мАч.",
        "images/10.jpg",
        ["MWC 2017", "Гаджеты", "Смартфоны", "Выставки", "Дизайн"]
    )];

function getArticles(skip, top, filterConfig) {
    var approvedArticles = [];
    if (filterConfig != null) {
        approvedArticles = getArticlesByFilter(filteS1352rConfig);
    }
    articles.sort(function (a, b) {
        return a.createdAt - b.createdAt;
    });
}
function getArticlesByFilter(filterConfig) {
    var filteredArray = [];
    for (var post in articles) {
        if (filterConfig.byName != null) {
            if (post.title.includes(filterConfig.byName)) {
                filteredArray.push(post);
            }
        }
        if (filterConfig.byDate != null) {
            if (post.createdAt - filterConfig.byDate < 100000) {
                filteredArray.push(post);
            }
        }
        if (filterConfig.byAuthor != null) {
            if (post.author === filterConfig.byAuthor) {
                filteredArray.push(post);
            }
        }
        if (filterConfig.byTags != null) {
            for (var tag in filterConfig.byTags) {
                if (post.tags.includes(tag)) {
                    filteredArray.push(post);
                }
            }
        }
    }
    return filteredArray;
}

