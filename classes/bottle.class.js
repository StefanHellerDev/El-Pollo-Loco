/**
 * Represents a salsa bottle that can be collected in the game world.
 *
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
  height = 80;
  width = (this.height / 400) * 400;
  y = 480 - this.height - 50;
  offset = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 5,
  };

  /**
   * Creates a new bottle at a random x-position on the ground.
   */
  constructor() {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.x = 200 + Math.random() * 2000;
  }
}
