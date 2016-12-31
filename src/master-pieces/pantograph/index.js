;(function (RIPSAW) {
/**
 * @class
 * @extends RIPSAW.MasterPiece
 * @param {number} n Number of segments.
 * @param {number} l Length of first segment.
 * @param {number} c Joint factor.
 * @param {number} [x0] See {@link RIPSAW.MasterPiece}.
 * @param {number} [y0] See {@link RIPSAW.MasterPiece}.
 * @param {number} [scale] See {@link RIPSAW.MasterPiece}.
 * @property {number} n Number of segments.
 * @property {number} l Length of first segment.
 * @property {number} c Joint factor.
 * @property {number} d Leg span - generated automatically.
 */
  RIPSAW.Pantograph = function (n, l, c, x0, y0, scale) {
    // classical inheritance - prototype is inherited after subclass prototype is set
    RIPSAW.MasterPiece.call(this, x0, y0, scale)

    this.n = n
    this.l = l
    this.c = c

    this.d = this.l * this.c

    this.hoverIndex = -1

    this.control = []
    this.initControl()

    return this
  }

  RIPSAW.Pantograph.prototype = {

    /**
     * Sets legspan.
     * @param {number} legSpan.
     * @returns {Object} this
     */
    setLegSpan: function (legSpan) {
      this.d = legSpan

      return this
    },

    initControl: function () {
      this.control = [

        new RIPSAW.DragNode(this.d / 2, 0, 0, 1, 0, 0),
        new RIPSAW.DragNode(0, -this.getSegmentHeight(0) * this.c, 0, 0, 1, 0)

      ]

      return this
    },

    /**
     * Updates the position of the control points based on object geometry.
     * @returns {Object} this
     */
    updateControl: function () {
      this.control[0].temp.x = this.d / 2
      this.control[1].temp.y = -this.getSegmentHeight(0) * this.c

      return this
    },

    /**
     * Updates the position of the control points based on object geometry.
     * @returns {Object} this
     */
    updateGeometry: function () {
      switch (this.hoverIndex) {

        case 0:
          this.d = this.control[0].temp.x * 2
          break

        case 1:
          this.l = Math.pow(Math.pow(this.control[1].temp.y, 2) + Math.pow(this.d / 2, 2), 0.5) / this.c
          break

      }

      return this
    },

    /**
     * Gets height of a particular segment.
     * @param {number} segmentIndex The index of the segment.
     * @returns {number} height of the segment.
     */
    getSegmentHeight: function (segmentIndex) {
      var k = Math.pow((1 - this.c) / this.c, segmentIndex)
      var l1 = this.l * k
      var d1 = this.d * k
      return Math.pow(Math.pow(l1 * this.c, 2) - Math.pow(d1 / 2, 2), 0.5) / this.c
    },

    getMembers: function (scaleFactor) {
      var i
      var d1 = this.d
      var hSegment
      var p1a
      var p2a
      var p1b
      var p2b
      var yStart = 0
      var members = []

      for (i = 0; i < this.n; i += 1) {
        hSegment = this.getSegmentHeight(i)

        p1a = new RIPSAW.Vector(-d1 / 2, -yStart).scale(scaleFactor)
        p1b = new RIPSAW.Vector(+d1 / 2 * (1 - this.c) / this.c, -(yStart + hSegment)).scale(scaleFactor)

        p2a = new RIPSAW.Vector(+d1 / 2, -yStart).scale(scaleFactor)
        p2b = new RIPSAW.Vector(-d1 / 2 * (1 - this.c) / this.c, -(yStart + hSegment)).scale(scaleFactor)

        members.push(new RIPSAW.Line(p1a, p1b))
        members.push(new RIPSAW.Line(p2a, p2b))

        d1 *= (1 - this.c) / this.c

        yStart += hSegment
      }

      return members
    },

    /**
     * Places members on canvas.
     * @returns {Object} this.
     */
    placeMembers: function () {
      var members = this.getMembers()
      var i
      var max = members.length

      for (i = 0; i < max; i += 1) {
        RIPSAW.pen.configure('design outline')
        RIPSAW.pen.line(this.map(members[i].p1), this.map(members[i].p2))
      }

      return this
    },

    /**
     * Places control points on canvas.
     * @returns {Object} this.
     */
    placeControlPoints: function () {
      var i

      for (i = 0; i < this.control.length; i += 1) {
        RIPSAW.pen.controlPoint(this.map(this.control[i].temp), this.hoverIndex === i)
      }

      return this
    },

    /**
     * Draw object on canvas.
     */
    draw: function () {
      RIPSAW.pen.configure('design outline')
      this.placeMembers()

      RIPSAW.pen.configure('primary control point')
      this.placeControlPoints()

      return this
    },

    /**
     * Determines whether legspan is valid.
     * @returns {boolean}.
     */
    hasValidLegSpan: function () {
      return (Math.abs(this.d) < this.l)
    },

    /**
     * Returns total height of the pantograph.
     * @returns {number} Total height.
     */
    getTotalHeight: function () {
      var totalHeight = 0
      var i

      if (!this.hasValidLegSpan()) {
        return totalHeight
      }

      for (i = 0; i < this.n; i += 1) {
        totalHeight += this.getSegmentHeight(i)
      }

      return totalHeight
    },

    /**
     * Normalize object to a total height of 1.0.
     * @returns {Object} this
     */
    normalize: function () {
      var scaleRatio = 1 / this.getTotalHeight()

      this.l *= scaleRatio
      this.d *= scaleRatio

      this.updateControl()

      return this
    },

    updateHoverState: function () {
      var i
      var max = this.control.length

      this.hoverIndex = -1

      for (i = 0; i < max; i += 1) {
        if (RIPSAW.mouse.hovers(this.map(this.control[i].perm))) {
          this.hoverIndex = i
        }
      }
    },

    /**
     * MouseMove event handler: detects hover and update changes on control points.
     * @returns {Object} this
     */
    mouseMove: function () {
      if (!RIPSAW.mouse.isDragging) {
        this.updateHoverState()
      } else if (this.hoverIndex !== -1) {
        this.control[this.hoverIndex].setDrag(this.getObjectDrag())

        this.updateGeometry()
        this.updateControl()
      }

      return this
    },

    /**
     * MouseUp event handler: permanently update changes on control points.
     * @returns {Object} this
     */
    mouseUp: function () {
      if (this.hoverIndex !== -1) {
        this.control[this.hoverIndex].update()
      }

      return this
    },

    /**
     * MouseDown event handler.
     * @returns {Object} this
     */
    mouseDown: function () {
      return this
    },

    toSVG: function () {
      var members = this.getMembers(100)
      var i
      var max = members.length
      var innerScript = ''

      for (i = 0; i < max; i += 1) {
        innerScript += ' ' + members[i].toSVG()
      }

      return RIPSAW.textAssets.SVGHeader + innerScript + RIPSAW.textAssets.SVGFooter
    }

  }

  RIPSAW.inheritPrototype(RIPSAW.MasterPiece, RIPSAW.Pantograph)
}(window.RIPSAW))
