/**
 * @constructor
 * @param {number} x x-coordinate.
 * @param {number} y y-coordinate.
 * @param {number} z z-coordinate.
 * @param {number} [cx] x-constraint. 1 if free, 0 if fixed.
 * @param {number} [cy] y-constraint. 1 if free, 0 if fixed.
 * @param {number} [cz] z-constraint. 1 if free, 0 if fixed.
 */
RIPSAW.DragNode = function (x, y, z, cx, cy, cz) {
  if (x instanceof RIPSAW.Vector) {
        /** @type {RIPSAW.Vector} */
    this.temp = new RIPSAW.Vector(x.x, x.y, x.z)
  } else {
    this.temp = new RIPSAW.Vector(x, y, z)
  }

    /** @type {RIPSAW.Vector} */
  this.perm = this.temp.clone()

    /** @type {RIPSAW.Vector} */
  this.constraints = new RIPSAW.Vector(cx || 1.0, cy || 1.0, cz || 1.0)

  return this
}

RIPSAW.DragNode.prototype = {

  constructor: RIPSAW.DragNode,

    /**
     * Update permanent coordinates to temporary ones.
     * @returns {RIPSAW.DragNode} this
     */
  update: function () {
    this.perm = this.temp.clone()

    return this
  },

    /**
     * Revert temporary coordinates to permanent ones.
     * @returns {RIPSAW.DragNode} this
     */
  revert: function () {
    this.temp = this.perm.clone()

    return this
  },

    /**
     * Revert temporary coordinates to permanent ones.
     * @returns {RIPSAW.DragNode} this
     */
  setDrag: function (v) {
    this.temp = this.perm.clone(v.getProduct(this.constraints))

    return this
  },

    /**
     * Get drag (difference between temporary and permanent coordinates).
     * @returns {RIPSAW.Vector} Drag amount.
     */
  getDrag: function () {
    return this.temp.clone().subtract(this.perm)
  },

    /**
     * Returns deep copy.
     * @returns {RIPSAW.DragNode}
     */
  clone: function () {
    return new RIPSAW.DragNode(this.perm.x, this.perm.y, this.perm.z, this.constraints.x, this.constraints.y, this.constraints.z)
  }

}
