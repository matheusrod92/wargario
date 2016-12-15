module.exports = class Player{
  constructor() {
    this.id = 0;
    this.nickname = '';
    this.fillColor = '';
    this.radiusColor = '';
    this.x = 250;
    this.y = 250;
    this.speed = 15;
    this.radius = 5;
    this.luck = 0;
  }

  updatePosition(){
    if(this.pressingUp)
      this.y-=this.speed;
    else if(this.pressingDown)
      this.y+=this.speed;
    else if(this.pressingRight)
      this.x+=this.speed;
    else if(this.pressingLeft)
      this.x-=this.speed;

    if(this.y < 0) this.y = 0;
    else if(this.y > 600) this.y = 600;
    if(this.x < 0) this.x = 0;
    else if(this.x > 600) this.x = 600;

  }

  verifyCollision(array){
    for(var i in array){
      var enemy = array[i];
      if(enemy.id != this.id){
        var dx = this.x - enemy.x;
        var dy = this.y - enemy.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + enemy.radius) {
          if(this.radius > enemy.radius){
            this.radius+=2;
            enemy.radius = 5;
            enemy.x = Math.floor(Math.random() * 550) + 1;
            enemy.y = Math.floor(Math.random() * 550) + 1;
            this.speed-=0.20;
            if(this.speed <= 1) this.speed = 1;
          } else if(this.radius < enemy.radius){
            this.radius=5;
            enemy.radius+=2;
            this.x = Math.floor(Math.random() * 550) + 1;
            this.y = Math.floor(Math.random() * 550) + 1;
            enemy.speed-=0.20;
            if(enemy.speed <= 1) enemy.speed = 1;
          } else {
            if(this.luck > enemy.luck) {
              this.radius += 2;
              enemy.radius=5;
              enemy.x = Math.floor(Math.random() * 550) + 1;
              enemy.y = Math.floor(Math.random() * 550) + 1;
              this.speed-=0.20;
              if(this.speed <= 1) this.speed = 1;
            }
          }
        }
      }
    }
  }

}
