class Coin extends MovableObject {
  // 300x301; height durch 301, mal 300
  height = 100;
  width = (this.height / 301) * 300;
  // y = 480 - this.height - 50;
  IMAGES_COINS = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 1000 / 3);
  }
}
