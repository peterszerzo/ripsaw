;(function (RIPSAW) {
/**
 * @constructor
 * @param {number} [x=0] - x-coordinate.
 * @param {number} [y=0] - y-coordinate.
 * @param {number} [z=0] - z-coordinate.
 */
  RIPSAW.Vector = function (x, y, z) {
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0

    return this
  }

  RIPSAW.Vector.prototype = {

    /** Set constructor. */
    constructor: RIPSAW.Vector,

    /**
     * Logs vector in a x: 0 | y: 0 | z: 0 form.
     * @param {number} [decimals=2] Number of decimal places.
     */
    log: function (decimals) {
      var d = decimals || 2

      return 'x: ' + this.x.toFixed(d) + ' | y: ' + this.y.toFixed(d) + ' | z: ' + this.z.toFixed(d)
    },

    /**
     * Logs vector in a [0, 0, 0] form.
     * @param {number} [decimals=2] Number of decimal places.
     * @returns {string}
     */
    toString: function (decimals) {
      var d = decimals || 2

      return '[' + this.x.toFixed(d) + ',' + this.y.toFixed(d) + ',' + this.z.toFixed(d) + ']'
    },

    // DEPRECATED
    // matches with vTarget if difference in coordinates less than dMin
    match: function (vTarget) {
      var dx = Math.abs(this.x - vTarget.x)
      var dy = Math.abs(this.y - vTarget.y)
      var dz = Math.abs(this.z - vTarget.z)

      if ((dx < RIPSAW.delta) && (dy < RIPSAW.delta) && (dz < RIPSAW.delta)) {
        this.x = vTarget.x
        this.y = vTarget.y
        this.z = vTarget.z
      }

      return this
    },

    /**
     * Returns whether vector is near equal to target vector (coordinates within RIPSAW.delta).
     * @param {Object} v - Target vector.
     * @returns {boolean}
     */
    isNearEqualTo: function (v) {
      return (Math.abs(this.x - v.x) < RIPSAW.delta && Math.abs(this.y - v.y) < RIPSAW.delta && Math.abs(this.z - v.z) < RIPSAW.delta)
    },

    /**
     * Returns distance to target vector.
     * @param {Object} v - Target vector.
     * @returns {number}
     */
    getDistanceTo: function (v) {
      return Math.pow(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2) + Math.pow(this.z - v.z, 2), 0.5)
    },

    /**
     * Returns Manhattan distance to target vector.
     * @param {Object} v - Target vector.
     * @returns {number}
     */
    getManhattanDistanceTo: function (v) {
      return (Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z))
    },

    /**
     * Normalizes vector.
     * @param {number} [length=1] - Target length.
     * @returns {Object} this
     */
    normalize: function (length) {
      var d = this.getDistanceTo(new RIPSAW.Vector(0, 0, 0))
      var k = (d !== 0) ? ((length || 1.0) / d) : 1

      this.x *= k
      this.y *= k
      this.z *= k

      return this
    },

    /**
     * Adds another vector. Modifies object!
     * @param {Object} v - Target vector.
     * @returns {Object} this
     */
    add: function (v) {
      if (v instanceof RIPSAW.Vector) {
        this.x += (v.x || 0)
        this.y += (v.y || 0)
        this.z += (v.z || 0)
      }

      return this
    },

    /**
     * Subtracts another vector. Modifies object!
     * @param {Object} v - Target vector.
     * @returns {Object} this
     */
    subtract: function (v) {
      this.x -= v.x
      this.y -= v.y
      this.z -= v.z

      return this
    },

    /**
     * Uniformly scales vector coordinates. Modifies object!
     * @param {number} k - Scale factor.
     * @returns {Object} this
     */
    scale: function (k) {
      this.x *= k
      this.y *= k
      this.z *= k

      return this
    },

    /**
     * Returns dot product with target vector. Does not modify object!
     * @param {Object} v - Target vector.
     * @returns {Object} this
     */
    dotProduct: function (v) {
      return this.x * v.x + this.y * v.y + this.z * v.z
    },

    // DEPRECATED
    product: function (v) {
      return this.getProduct(v)
    },

    /**
     * Returns piecewise product with target vector. Does not modify object!
     * @param {Object} v - Target vector.
     * @returns {Object} product - Resulting vector.
     */
    getProduct: function (v) {
      return new RIPSAW.Vector(this.x * v.x, this.y * v.y, this.z * v.z)
    },

    /**
     * Cross multiplies vector with target vector. Modifies object!
     * @param {Object} v - Target vector.
     * @returns {Object} this
     */
    crossMultiply: function (v) {
      var x = +this.y * v.z - this.z * v.y
      var y = -this.x * v.z + this.z * v.x
      var z = +this.x * v.y - this.y * v.x

      this.x = x
      this.y = y
      this.z = z

      return this
    },

    /**
     * Returns cross product with target vector. Does not modify object!
     * @param {Object} v - Target vector.
     * @returns {Object} this
     */
    getCrossProduct: function (v) {
      return this.clone().crossMultiply(v)
    },

    /**
     * Returns deep copy displaced by target vector. Does not modify object!
     * @param {Object} [v={ x:0, y:0, z:0 }] - Displacement vector.
     * @returns {Object} vect - Cloned and displaced vector.
     */
    clone: function (v) {
      return new RIPSAW.Vector(this.x, this.y, this.z).add(v)
    },

    /**
     * Returns a linear combination of an array of vectors. Does not modify objects!
     * @param {Array} [vectors] - Array of vectors to be evaluated.
     * @returns {Object} result - Linear combination.
     */
    getLinearCombination: function (vectors, coefficients) {
      var n = Math.min(vectors.length, coefficients.length)
      var x = 0
      var y = 0
      var z = 0

      for (var i = 0; i < n; i += 1) {
        x += vectors[i].x * coefficients[i]
        y += vectors[i].y * coefficients[i]
        z += vectors[i].z * coefficients[i]
      }

      return new RIPSAW.Vector(x, y, z)
    },

    /**
     * Swaps Y and Z coordinates. Modifies object!
     * @param {Array} [vectors] - Array of vectors to be evaluated.
     * @returns {Object} result - Linear combination.
     */
    swapYZ: function () {
      var replace = this.y

      this.y = this.z
      this.z = replace

      return this
    },

    /**
     * Projects onto camera. Modifies object!
     * @param {Array} [vectors] - Array of vectors to be evaluated.
     * @returns {Object} result - Linear combination.
     */
    project: function (camera) {
      var v = camera.project(this)

      this.x = v.x
      this.y = v.y
      this.z = v.z

      return this
    }

  }
}(window.RIPSAW))
