class ThrowableObject extends MovableObject {
  IMAGES_BOTTLEROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];
  x;
  y;
  width;
  height;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  otherDirection;

  constructor(x, y, otherDirection) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_BOTTLEROTATION);
    this.otherDirection = otherDirection;
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
      if (this.otherDirection) {
        this.x -= 14;
      } else {
        this.x += 14;
      }
      this.playAnimation(this.IMAGES_BOTTLEROTATION);
    }, 1000 / 20);
  }
}
