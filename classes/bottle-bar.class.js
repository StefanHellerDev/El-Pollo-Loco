class BottleBar extends DrawableObject {
  // 595x158; height durch 158, mal 595
  width = 250;
  height = (this.width / 595) * 158;
  y = 55;
  x = 10;
  percentage = 0;

  IMAGES_BOTTLEBAR = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLEBAR);
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage >= 90) {
      return 0;
    } else if (this.percentage >= 70) {
      return 1;
    } else if (this.percentage >= 50) {
      return 2;
    } else if (this.percentage >= 30) {
      return 3;
    } else if (this.percentage >= 10) {
      return 4;
    } else {
      return 5;
    }
  }
}
