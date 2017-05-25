/**
 * Created by Semen on 03-Apr-17.
 */
const express = require('express');
const diskDatabase = require('diskdb');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const SessionFileStore = require('session-file-store')(expressSession);

const app = express();
diskDatabase.connect('private/db', ['articles', 'users']);
const mongoDatabase = mongoose.createConnection('mongodb://localhost/Atac');
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: 'stay alive',
    saveUninitialized: true,
    resave: false,
    store: new SessionFileStore(),
  }));
app.use(passport.initialize());
app.use(passport.session());

const articlesModel = new mongoose.Schema({
  title: String,
  summary: String,
  createdAt: String,
  author: String,
  content: String,
  img: String,
}, { collection: 'articles' });
const usersModel = new mongoose.Schema({
  username: String,
  password: String,
});
const articles = mongoDatabase.model('articles', articlesModel);
const users = mongoDatabase.model('users', usersModel);

mongoDatabase.on('error', error => console.log('Монга не прикручена, все нормально. Connection to database failed, because: ', error.message));
mongoDatabase.once('open', () => console.log('Successfully connected to database.'));


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(user ? null : new Error('deserialize'), user));

passport.use(
  'login',
  new LocalStrategy(
    { passReqToCallback: true },
    (rqst, username, password, done) => {
      const user = diskDatabase.users.findOne({ username });
      if (!user) {
        console.log('This currentUser doesn\'t exists');
        return done(null, false, {
          message: 'This currentUser doesn\'t exist',
        });
      }
      if (password !== user.password) {
        console.log('Incorrect password');
        return done(null, false, {
          message: 'Incorrect password',
        });
      }
      console.log('success auth');
      return done(null, user, {
        message: 'Successfull authorization',
      });
    }));
app.post('/login', passport.authenticate('login'), (req, res) => res.send(req.user));
app.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});


app.get('/articles', (req, res) => {
  res.json(diskDatabase.articles.find());
});


app.get('/article/:id', (req, res) => {
  res.json(diskDatabase.articles.findOne({ id: req.params.id }));
});

app.post('/article', (req, res) => {
  res.json(diskDatabase.articles.save(req.body));
});

app.delete('/articles/:id', (req, res) => {
  res.json(diskDatabase.articles.remove({ id: req.params.id }));
});

app.put('/articles/', (req, res) => {
  res.json(diskDatabase.articles.update({ id: req.body.id }, req.body));
});


app.listen(2727, () => {
  console.log('Atac is listening on port 2727!');
});
