var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent');
    

var list = []; // création d'une liste vide au démarrage du serveur

io.sockets.on('connection', function (socket) {
    
    // ajout dans la liste
    socket.on('ajouter', function(nouvelItem) {
        nouvelItem = ent.encode(nouvelItem); // sécurisation du texte saisi
        list.push(nouvelItem);
        socket.broadcast.emit('update'); // ordre de mise à jour vers le navigateur
    });

    //suppression de la liste
    socket.on('supprimer', function(supprItem) {
        list.splice(supprItem, 1);
    socket.broadcast.emit('update'); // ordre de mise à jour vers le navigateur

    });

});

// route home
app.get('/', function(req, res) {

    res.render('todo.ejs', {list: list});

});


server.listen(8080);