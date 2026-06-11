class Chicken extends MovableObject {
  // 248x243; height durch 243, mal 248
  height = 60;
  width = (this.height / 243) * 248;
  y = 480 - this.height - 50;
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
  offset = {
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
  };
  energy = 5;

  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 700;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    this.setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.dead = 1;
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          this.y = 1000*2;
        }, 1000);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 5);
  }
}
