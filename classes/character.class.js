class Character extends MovableObject {
  // 610x1200; height durch 1200, mal 610
  height = 320;
  width = 162;
  y = 140;
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {}
}
