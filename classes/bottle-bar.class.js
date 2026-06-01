class BottleBar extends DrawableObject {
  // 595x158; height durch 158, mal 595
  width = 250;
  height = (this.width / 595) * 158;
  y = 55;
  x = 10;
  bottleCount;

  IMAGES_BOTTLEBAR = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
  ];

  constructor(bottleCount) {
    super();
    this.loadImages(this.IMAGES_BOTTLEBAR);
    this.setBottleBar(bottleCount);
  }

  setBottleBar(bottleCount) {
    this.bottleCount = bottleCount;
    let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.bottleCount > 9) {
      return 0;
    } else if (this.bottleCount > 7) {
      return 1;
    } else if (this.bottleCount > 5) {
      return 2;
    } else if (this.bottleCount > 3) {
      return 3;
    } else if (this.bottleCount > 1) {
      return 4;
    } else {
      return 5;
    }
  }
}
