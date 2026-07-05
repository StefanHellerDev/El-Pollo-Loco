/**
 * Represents the endboss status bar and displays the current endboss energy.
 *
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {
  // 595x158; height durch 158, mal 595
  width = 250;
  height = (this.width / 595) * 158;
  y = 20;
  x = 465;
  startEnerg;

  IMAGES_STATUSBARENDBOSS = [
    'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
  ];

  /**
   * Creates a new endboss status bar and sets the initial energy value.
   *
   * @param {number} startEnergy - The initial energy value of the endboss.
   */
  constructor(startEnergy) {
    super();
    this.loadImages(this.IMAGES_STATUSBARENDBOSS);
    this.startEnerg = startEnergy;
    this.setEndbossBar(startEnergy);
  }

  /**
   * Updates the endboss status bar based on the current energy value.
   *
   * @param {number} percentage - The current energy value of the endboss.
   * @returns {void}
   */
  setEndbossBar(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBARENDBOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the correct image index for the current endboss energy.
   *
   * @returns {number} The index of the matching endboss status bar image.
   */
  resolveImageIndex() {
    if (this.percentage >= (this.startEnerg / 10) * 8.1) {
      return 0;
    } else if (this.percentage >= (this.startEnerg / 10) * 6.1) {
      return 1;
    } else if (this.percentage >= (this.startEnerg / 10) * 4.1) {
      return 2;
    } else if (this.percentage >= (this.startEnerg / 10) * 2.1) {
      return 3;
    } else if (this.percentage >= (this.startEnerg / 10) * 0.1) {
      return 4;
    } else {
      return 5;
    }
  }
}