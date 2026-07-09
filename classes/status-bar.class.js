/**
 * Stores the image paths for the character health status bar.
 *
 * @type {string[]}
 */
const HEALTH_BAR_IMAGES = [
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
];

/**
 * Stores the image paths for the endboss health status bar.
 *
 * @type {string[]}
 */
const ENDBOSS_BAR_IMAGES = [
  'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
  'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
  'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
  'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
  'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
  'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
];

/**
 * Stores the image paths for the coin status bar.
 *
 * @type {string[]}
 */
const COIN_BAR_IMAGES = [
  'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
  'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
  'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
  'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
  'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
  'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
];

/**
 * Stores the image paths for the bottle status bar.
 *
 * @type {string[]}
 */
const BOTTLE_BAR_IMAGES = [
  'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
  'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
  'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
  'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
  'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
];

/**
 * Represents a reusable status bar that displays a value
 * based on a maximum value and matching image states.
 *
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  width = 250;
  height = (this.width / 595) * 158;
  x;
  y;
  value;
  maxValue;
  images;

  /**
   * Creates a new status bar with specific value, image set, and position.
   *
   * @param {{value: number, maxValue: number, images: string[], x: number, y: number}} config - The status bar configuration.
   */
  constructor({ value, maxValue, images, x, y }) {
    super();
    this.value = value;
    this.maxValue = maxValue;
    this.images = images;
    this.x = x;
    this.y = y;

    this.loadImages(this.images);
    this.setValue(value);
  }

  /**
   * Updates the status bar value and sets the matching image.
   *
   * @param {number} value - The current status bar value.
   * @returns {void}
   */
  setValue(value) {
    this.value = value;
    const path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the correct image index based on the current value ratio.
   *
   * @returns {number} The index of the matching status bar image.
   */
  resolveImageIndex() {
    const ratio = this.value / this.maxValue;

    if (ratio >= 0.95) return 0;
    if (ratio >= 0.65) return 1;
    if (ratio >= 0.45) return 2;
    if (ratio >= 0.25) return 3;
    if (ratio > 0) return 4;
    return 5;
  }
}

/**
 * Represents the character health status bar.
 *
 * @extends StatusBar
 */
class HealthStatusBar extends StatusBar {
  /**
   * Creates a new character health status bar.
   *
   * @param {number} startEnergy - The initial energy value of the character.
   */
  constructor(startEnergy) {
    super({
      value: startEnergy,
      maxValue: startEnergy,
      images: HEALTH_BAR_IMAGES,
      x: 10,
      y: -15,
    });
  }

  /**
   * Updates the character health status bar.
   *
   * @param {number} energy - The current energy value of the character.
   * @returns {void}
   */
  setPercentage(energy) {
    this.setValue(energy);
  }
}

/**
 * Represents the endboss health status bar.
 *
 * @extends StatusBar
 */
class EndbossStatusBar extends StatusBar {
  /**
   * Creates a new endboss health status bar.
   *
   * @param {number} startEnergy - The initial energy value of the endboss.
   */
  constructor(startEnergy) {
    super({
      value: startEnergy,
      maxValue: startEnergy,
      images: ENDBOSS_BAR_IMAGES,
      x: 465,
      y: 20,
    });
  }

  /**
   * Updates the endboss health status bar.
   *
   * @param {number} energy - The current energy value of the endboss.
   * @returns {void}
   */
  setPercentage(energy) {
    this.setValue(energy);
  }
}

/**
 * Represents the coin status bar and displays the collected coin count.
 *
 * @extends StatusBar
 */
class CoinBar extends StatusBar {
  /**
   * Creates a new coin status bar.
   *
   * @param {number} coinCount - The current number of collected coins.
   */
  constructor(coinCount) {
    super({
      value: coinCount,
      maxValue: 10,
      images: COIN_BAR_IMAGES,
      x: 10,
      y: 105 - 15,
    });
  }

  /**
   * Updates the coin status bar.
   *
   * @param {number} coinCount - The current number of collected coins.
   * @returns {void}
   */
  setCoinBar(coinCount) {
    this.setValue(coinCount);
  }
}

/**
 * Represents the bottle status bar and displays the collected bottle count.
 *
 * @extends StatusBar
 */
class BottleBar extends StatusBar {
  /**
   * Creates a new bottle status bar.
   *
   * @param {number} bottleCount - The current number of collected bottles.
   */
  constructor(bottleCount) {
    super({
      value: bottleCount,
      maxValue: 10,
      images: BOTTLE_BAR_IMAGES,
      x: 10,
      y: 55 - 15,
    });
  }

  /**
   * Updates the bottle status bar.
   *
   * @param {number} bottleCount - The current number of collected bottles.
   * @returns {void}
   */
  setBottleBar(bottleCount) {
    this.setValue(bottleCount);
  }
}
