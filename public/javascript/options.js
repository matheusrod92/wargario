$('#config--set').submit(function(){
  var nickname = $('#config--setName').val();
  var fillColor = $('#config--setFillColor').val();
  var borderColor = $('#config--setBorderColor').val();
  socket.emit('set configs', {nickname: nickname, fillColor: fillColor, radiusColor:borderColor});
  $('#configModal').modal('hide');
  return false;
});
