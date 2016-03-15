var express = require('express');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

var list = ["test","test2"];

// route home
app.get('/', function(req, res) {

    res.render('todo.ejs', {list: list});

});

// route delete
app.get('/supprimer/:index', function(req, res) {

    list.splice(req.params.index, 1);
    res.redirect('/');

});

app.use(function(req, res, next){ 

    res.setHeader('Content-Type', 'text/plain');

    res.send(404, 'Page introuvable !');

});


app.listen(8080);