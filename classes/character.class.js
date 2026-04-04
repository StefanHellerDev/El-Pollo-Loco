class Character extends MovableObject {
  // 610x1200; height durch 1200, mal 610
  height = 320;
  width = 162;
  y = 140;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let modulo = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[modulo];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }

  jump() {}
}
