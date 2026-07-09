/**
 * Represents a collectible coin in the game world.
 *
 * @extends MovableObject
 */
class Coin extends MovableObject {
  height = 100;
  width = (this.height / 301) * 300;

  IMAGES_COINS = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

  offset = {
    top: 35,
    left: 35,
    right: 35,
    bottom: 35,
  };

  /**
   * Creates a new coin at a specific position.
   *
   * @param {number} x - The x-position of the coin.
   * @param {number} y - The y-position of the coin.
   */
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Starts the coin animation.
   *
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 1000 / 3);
  }
}
