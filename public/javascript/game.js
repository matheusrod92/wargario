var ctx = document.getElementById("gameScreen").getContext("2d");
ctx.font = '10px Arial';

var socket = io.connect('/');

socket.on('newPositions',function(data){
  ctx.clearRect(0,0,700,700);
  for(var i = 0 ; i < data.length; i++){
    ctx.beginPath();
    ctx.arc(data[i].x, data[i].y, data[i].radius, 0, 2*Math.PI);
    ctx.fillStyle = data[i].fillColor;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = data[i].radiusColor;
    ctx.stroke();
  }
});

$(function(){
  $('#gameScreen').on('keydown keyup', function(e){
    console.log("emitiu os dados ");
    var state = e.type=="keydown"?true:false;
    if(e.which == 83)//s
      socket.emit('keyPress', {inputId:'down', state:state});
    else if(e.which == 87)//w
      socket.emit('keyPress', {inputId:'up', state:state});
    else if(e.which == 68)//w
      socket.emit('keyPress', {inputId:'right', state:state});
    else if(e.which == 65)//w
      socket.emit('keyPress', {inputId:'left', state:state});
  });
});
