const HEALTH_BAR_IMAGES = [
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
  'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
];

const ENDBOSS_BAR_IMAGES = [
  'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
  'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
  'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
  'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
  'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
  'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
];

class StatusBar extends DrawableObject {
  width = 250;
  height = (this.width / 595) * 158;
  x;
  y;
  startEnergy;
  percentage;
  images;

  constructor({ startEnergy, images, x, y }) {
    super();
    this.startEnergy = startEnergy;
    this.images = images;
    this.x = x;
    this.y = y;

    this.loadImages(this.images);
    this.setPercentage(startEnergy);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    const ratio = this.percentage / this.startEnergy;

    if (ratio >= 0.81) return 0;
    if (ratio >= 0.61) return 1;
    if (ratio >= 0.41) return 2;
    if (ratio >= 0.21) return 3;
    if (ratio >= 0.001) return 4;
    return 5;
  }
}

class HealthStatusBar extends StatusBar {
  constructor(startEnergy) {
    super({
      startEnergy,
      images: HEALTH_BAR_IMAGES,
      x: 10,
      y: -15,
    });
  }
}

class EndbossStatusBar extends StatusBar {
  constructor(startEnergy) {
    super({
      startEnergy,
      images: ENDBOSS_BAR_IMAGES,
      x: 465,
      y: 20,
    });
  }
}
