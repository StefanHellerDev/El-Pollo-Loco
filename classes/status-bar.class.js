class StatusBar extends DrawableObject {
  // 595x158; height durch 158, mal 595  
  width = 250;
  height = (this.width / 595) * 158;
  y = 10;
  x = 10;

  percentage = 100;

  IMAGES_STATUSBAR = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBAR);
    // this.y = 100;
    // this.x = 100;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
    console.log(this.img);
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
