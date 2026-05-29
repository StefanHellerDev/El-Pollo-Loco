class ThrowableObject extends MovableObject {
  IMAGES_BOTTLEROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_BOTTLEROTATION);
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
      this.x += 15;
      this.playAnimation(this.IMAGES_BOTTLEROTATION);
    }, 1000 / 20);
  }
}
