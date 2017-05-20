/**оыщт-зфкыук
 * Created by Semen on 03-Apr-17.
 */
var express = require('express');
var database = require('diskdb');
var bodyParser = require('body-parser');

var app = express();
database.connect('public/db', ['articles']);
app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/articles', function (req, res) {
    res.json(database.articles.find());
});

app.get('/article/:id', function (req, res) {
    res.json(database.articles.findOne({id: req.params.id}));
});

app.post('/article', (req, res) => {
    res.json(database.articles.save(req.body));
});

app.delete('/articles/:id', function (req, res) {
    res.json(database.articles.remove({id: req.params.id}));
});

app.put('/articles/', function (req, res) {
    res.json(database.articles.update({id: req.body.id}, req.body));
});


app.listen(2727, function () {
    console.log('Atac is listening on port 2727!')
});