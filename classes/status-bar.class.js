/**
 * Represents the character health status bar and displays the current energy value.
 *
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  // 595x158; height durch 158, mal 595
  width = 250;
  height = (this.width / 595) * 158;
  y = -15;
  x = 10;
  startEnerg;

  IMAGES_STATUSBAR = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
  ];

  /**
   * Creates a new health status bar and sets the initial energy value.
   *
   * @param {number} startEnergy - The initial energy value of the character.
   */
  constructor(startEnergy) {
    super();
    this.loadImages(this.IMAGES_STATUSBAR);
    this.startEnerg = startEnergy;
    this.setPercentage(startEnergy);
  }

  /**
   * Updates the health status bar based on the current energy value.
   *
   * @param {number} percentage - The current energy value of the character.
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the correct image index for the current health value.
   *
   * @returns {number} The index of the matching health status bar image.
   */
  resolveImageIndex() {
    console.log(this.percentage);
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
