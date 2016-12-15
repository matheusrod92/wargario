var nome, cor;
$(function(){
  $('#chat--form').submit(function(){
    var message = $('#chat--message').val();
    if(message !== '')
      socket.emit('send message', {message: message});
    $('#chat--message').val('').focus();
    return false;
  });

  socket.on('define my config', function(data){
    nome = data.name;
    cor = data.color;
    $('#chat--userName').text(nome + ":");
  });

  socket.on('welcome player', function(data){
    var compiledMessage = '<p>O usuário <strong style="color:' + data.color + ';">' + data.name + '</strong> acabou de entrar no jogo.</p>';
    $('#chatBody ul').append(compiledMessage);
    scrollBottom();
  });

  socket.on('message sent', function(data) {
    var compiledMessage = '<p><strong style="color:' + data.color + ';">' + data.name + ':</strong> ' + data.message + "</p>";
    $('#chatBody ul').append(compiledMessage);
    scrollBottom();
  });

  socket.on('user leave game', function(data) {
    var compiledMessage = '<p>O usuário <strong style="color:' + data.color + ';">' + data.name + '</strong> acabou de sair do jogo.</p>';
    $('#chatBody ul').append(compiledMessage);
    scrollBottom();
  });
});

function scrollBottom(){
  var elem = document.getElementById('chatBody');
  elem.scrollTop = elem.scrollHeight;
}
