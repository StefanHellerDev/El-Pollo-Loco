class StatusBarEndboss extends DrawableObject {
  // 595x158; height durch 158, mal 595
  width = 250;
  height = (this.width / 595) * 158;
  y = -5;
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

  constructor(startEnergy) {
    super();
    this.loadImages(this.IMAGES_STATUSBARENDBOSS);
    this.startEnerg = startEnergy;
    this.setEndbossBar(startEnergy);
  }

  setEndbossBar(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBARENDBOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage >= (this.startEnerg / 10) * 9) {
      return 0;
    } else if (this.percentage >= (this.startEnerg / 10) * 7) {
      return 1;
    } else if (this.percentage >= (this.startEnerg / 10) * 5) {
      return 2;
    } else if (this.percentage >= (this.startEnerg / 10) * 3) {
      return 3;
    } else if (this.percentage >= (this.startEnerg / 10) * 1) {
      return 4;
    } else {
      return 5;
    }
  }
}
