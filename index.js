'use strict'

// NOTE: Libs
var colors = require('colors');
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Player = require('./Player.class.js');
var routes = require('./routes');

// NOTE: Server Config
server.listen(4000, function(){
  console.log('[SERVER]'.bold.green + ' LISTENING ON PORT 4000');
});
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

// NOTE: Routes
app.get('/', routes.index);

// NOTE: Sockets Variables
var PLAYER_LIST = [];
var SOCKET_LIST = [];

// NOTE: Socket main logic
io.on('connection', function(socket){
  var player = new Player();
  socket.on('set configs', function(data){
    // NOTE: Player só é criado quando ele seta as configurações iniciais (nick e cores)
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    player.id = socket.id;
    player.luck = Math.floor(Math.random() * 10) + 1;
    player.x = Math.floor(Math.random() * 650) + 1;
    player.y = Math.floor(Math.random() * 650) + 1;
    player.nickname = data.nickname;
    player.fillColor = data.fillColor;
    player.radiusColor = data.radiusColor;
    PLAYER_LIST[socket.id] = player;
    console.log("Usuario: " + data.nickname + " | Fill: " + data.fillColor + " | Border: " + data.radiusColor);
    socket.emit('define my config', {name: player.nickname, color: player.fillColor});
    io.emit('welcome player', {name: player.nickname, color: player.fillColor});
  });

  // NOTE: Socket básico de conversação, recebe do player e manda de volta com emit
  socket.on('send message', function(data) {
    var message = data.message;
    var nome = player.nickname;
    var cor = player.fillColor;
    console.log('[SOCKET]'.bold.blue + ' message sent from player: ' + player.name + " and message: " + data.message);
    io.emit('message sent', {message: message, name: nome, color:cor});
  });

  // NOTE: Socket para definir o estado das teclas apertadas
  socket.on('keyPress', function(data){
    if(data.inputId === 'down'){
      player.pressingDown = data.state;
    } else if(data.inputId === 'up') {
      player.pressingUp = data.state;
    } else if(data.inputId === 'left') {
      player.pressingLeft = data.state;
    } else if(data.inputId === 'right') {
      player.pressingRight = data.state;
    }
  });
  // NOTE: tratamento caso o player desconecte
  socket.on('disconnect', function() {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
    io.emit('user leave game', {name: player.nickname, color: player.fillColor});
  });
});

setInterval(function(){
    var pack = [];
    for(var i in PLAYER_LIST){
        var player = PLAYER_LIST[i];
        player.updatePosition();
        player.verifyCollision(PLAYER_LIST);
        pack.push({
            x:player.x,
            y:player.y,
            number:player.id,
            radius:player.radius,
            fillColor:player.fillColor,
            radiusColor:player.radiusColor
        });
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
},1000/25);
