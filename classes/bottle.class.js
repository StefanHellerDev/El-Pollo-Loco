class Bottle extends DrawableObject {
  // 400x400
  height = 100;
  width = (this.height / 400) * 400;
  y = 480 - this.height - 50;
  x;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  constructor() {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.x = 200 + Math.random() * 2000;
  }
}
