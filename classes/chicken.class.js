class Chicken extends MovableObject {
  // 248x243; height durch 243, mal 248
  height = 60;
  width = 61;
  y = 370;
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 500;
  }
}
