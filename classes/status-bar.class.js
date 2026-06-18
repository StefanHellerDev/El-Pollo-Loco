class StatusBar extends DrawableObject {
  // 595x158; height durch 158, mal 595
  width = 250;
  height = (this.width / 595) * 158;
  y = 0;
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

  constructor(startEnergy) {
    super();
    this.loadImages(this.IMAGES_STATUSBAR);
    this.startEnerg = startEnergy;
    this.setPercentage(startEnergy);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
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
