/**
 * Created by Semen on 03-Apr-17.
 */
const express = require('express');
const database = require('diskdb');
const bodyParser = require('body-parser');

const app = express();
database.connect('public/db', ['articles']);
app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/articles', (req, res) => {
  res.json(database.articles.find());
});

app.get('/article/:id', (req, res) => {
  res.json(database.articles.findOne({ id: req.params.id }));
});

app.post('/article', (req, res) => {
  res.json(database.articles.save(req.body));
});

app.delete('/articles/:id', (req, res) => {
  res.json(database.articles.remove({ id: req.params.id }));
});

app.put('/articles/', (req, res) => {
  res.json(database.articles.update({ id: req.body.id }, req.body));
});


app.listen(2727, () => {
  console.log('Atac is listening on port 2727!');
});
