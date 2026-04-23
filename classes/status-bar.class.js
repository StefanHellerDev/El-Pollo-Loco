class StatusBar extends DrawableObject {
  // 595x158; height durch 158, mal 595
  // height = 158;
  // width = (this.height / 158) * 595;
  // y = 480 - this.height - 20;
  // y = 100;
  // x = 100;

  IMAGES_STATUSBAR = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
  ];

  constructor() {
    // super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
    this.loadImages(this.IMAGES_STATUSBAR);
    // this.drawStatusbar();
  }

  
}
