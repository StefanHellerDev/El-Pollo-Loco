class ThrowableObject extends MovableObject {

  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = this.width;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
       this.x += 10; 
    }, 1000 / 20);
  }
}
