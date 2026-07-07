/**
 * Provides helper methods for calculating and comparing object hitboxes.
 */
class HitboxUtils {
  /**
   * Calculates the hitbox boundaries of a game object.
   *
   * @param {DrawableObject} obj - The object whose hitbox should be calculated.
   * @returns {{top: number, bottom: number, left: number, right: number}} The hitbox boundaries.
   */
  static getHitbox(obj) {
    return {
      top: obj.y + obj.offset.top,
      bottom: obj.y + obj.height - obj.offset.bottom,
      left: obj.x + obj.offset.left,
      right: obj.x + obj.width - obj.offset.right,
    };
  }

  /**
   * Calculates the previous bottom position of a game object.
   *
   * @param {DrawableObject} obj - The object whose previous bottom position should be calculated.
   * @returns {number} The previous bottom position of the object.
   */
  static getPreviousBottom(obj) {
    return obj.lastY + obj.height - obj.offset.bottom;
  }

  /**
   * Calculates the horizontal overlap between two hitboxes.
   *
   * @param {{left: number, right: number}} boxA - The first hitbox.
   * @param {{left: number, right: number}} boxB - The second hitbox.
   * @returns {number} The horizontal overlap in pixels.
   */
  static getHorizontalOverlap(boxA, boxB) {
    return Math.max(0, Math.min(boxA.right, boxB.right) - Math.max(boxA.left, boxB.left));
  }
}
