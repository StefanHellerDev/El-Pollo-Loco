class Bottle extends DrawableObject {
  // 400x400
  height = 100;
  width = (this.height / 400) * 400;
  y = 480 - this.height - 50;
  x;  

  constructor() {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    // this.loadImages(this.IMAGES_BOTTLEROTATION);
    this.x = 200 + Math.random() * 2000;
  }
}
