/**
 * Represents the coin status bar and displays the current amount of collected coins.
 *
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {
  // 595x158; height durch 158, mal 595
  width = 250;
  height = (this.width / 595) * 158;
  y = 105 - 15;
  x = 10;
  coinCount;

  IMAGES_COINBAR = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
  ];

  /**
   * Creates a new coin status bar and sets the initial coin count.
   *
   * @param {number} coinCount - The current number of collected coins.
   */
  constructor(coinCount) {
    super();
    this.loadImages(this.IMAGES_COINBAR);
    this.setCoinBar(coinCount);
  }

  /**
   * Updates the coin status bar based on the current coin count.
   *
   * @param {number} coinCount - The current number of collected coins.
   * @returns {void}
   */
  setCoinBar(coinCount) {
    this.coinCount = coinCount;
    let path = this.IMAGES_COINBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the correct image index for the current coin count.
   *
   * @returns {number} The index of the matching coin status bar image.
   */
  resolveImageIndex() {
    if (this.coinCount > 9) {
      return 0;
    } else if (this.coinCount > 7) {
      return 1;
    } else if (this.coinCount > 5) {
      return 2;
    } else if (this.coinCount > 3) {
      return 3;
    } else if (this.coinCount >= 1) {
      return 4;
    } else {
      return 5;
    }
  }
}
