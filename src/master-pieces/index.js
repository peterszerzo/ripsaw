;(function (RIPSAW) {
/**
 * @constructor
 * @param {number} x0 Drawing origin x-coordinate (relative coordinates).
 * @param {number} y0 Drawing origin y-coordinate (relative coordinates).
 * @param {number} scale Scale factor.
 */
  RIPSAW.MasterPiece = function (x0, y0, scale) {
    /** @type {String} */
    this.name = 'object'

    /** @type {RIPSAW.DragNode} */
    this.centroid = new RIPSAW.DragNode(x0 || 0.5, y0 || 0.5)

    /** @type {number} */
    this.scale = scale || 1

    /** @type {RIPSAW.MasterPiecePermissions} */
    this.allow = new RIPSAW.MasterPiecePermissions('11000')

    /** @type {Object} */
    this.stageManager = {}

    /** type {Object} */
    this.control = []

    /** type {Number} */
    this.hoverIndex = -1
  }

  RIPSAW.MasterPiece.prototype = {

    /**
     * Maps geometry to canvas, taking into account view parameters (centroid and scale).
     * @param {RIPSAW.Vector} v
     * @returns {RIPSAW.Vector} v
     */
    map: function (v) {
      return new RIPSAW.Vector(

            this.centroid.temp.x * RIPSAW.W + v.x * RIPSAW.minWH * this.scale,
            this.centroid.temp.y * RIPSAW.H + v.y * RIPSAW.minWH * this.scale,
            0

        )
    },

    /**
     * Update display information and permissions upon stage change.
     * @returns {RIPSAW.MasterPiece} this
     */
    updateState: function (state) {
      if (typeof state !== 'undefined') {
        this.allow.setBinaryString(state.permissionsBinary || '0')
        this.centroid = new RIPSAW.DragNode(state.x0 || 0.5, state.y0 || 0.5)
        this.scale = state.scale || 1.0
      }

      return this
    },

    /**
     * Get mousedrag relative to object display information. Ensures that correct mouse drag is applied regardless of zoom, scale and displacement.
     * @returns {RIPSAW.Vector}
     */
    getObjectDrag: function () {
      return RIPSAW.mouse.getDrag().getProduct(new RIPSAW.Vector(1 / RIPSAW.minWH / this.scale, 1 / RIPSAW.minWH / this.scale))
    }

  }
}(window.RIPSAW))
