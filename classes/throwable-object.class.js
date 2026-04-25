class ThrowableObject extends MovableObject {

  constructor() {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.x = 10;
    this.y = 10;
    this.width = 100;
    this.height = this.width;
    this.throw(200, 200);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
       this.x += 10; 
    }, 1000 / 20);
  }
}
