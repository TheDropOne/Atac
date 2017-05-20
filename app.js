/**
 * Created by Semen on 03-Apr-17.
 */
var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/index', function (req, res) {
    res.send('Hello World!');
});

app.listen(2727, function() {
    console.log('Example app listening on port 2727!')
});