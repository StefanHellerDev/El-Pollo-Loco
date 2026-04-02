class Cloud extends MovableObject {
  
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = Math.random() * 500;
    this.y = 20;
    this.width = 500;
    this.height = 250;
  }
}
