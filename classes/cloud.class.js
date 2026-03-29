class Cloud extends MovableObject {
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.y = 20;
    this.width = 500;
    this.height = 250;
  }
}
