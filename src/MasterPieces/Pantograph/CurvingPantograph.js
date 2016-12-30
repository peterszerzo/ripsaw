RIPSAW.CurvingPantograph = function (n, l, c1, c2, x0, y0, scale) {
    // classical inheritance - prototype is inherited after subclass prototype is set
  RIPSAW.MasterPiece.call(this, x0, y0, scale)

  this.n = n
  this.l = l
  this.c1 = c1
  this.c2 = c2

  this.d = this.l * this.c1

  this.hoverIndex = -1

  this.control = []
  this.initControl()

  return this
}

RIPSAW.CurvingPantograph.prototype = {

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

      new RIPSAW.DragNode(this.d / 2, 0, 0, 1, 0, 0)

    ]

    return this
  },

    /**
     * Updates the position of the control points based on object geometry.
     * @returns {Object} this
     */
  updateControl: function () {
    this.control[0].temp.x = this.d / 2

    return this
  },

    /**
     * Updates the position of the control points based on object geometry.
     * @returns {Object} this
     */
  updateGeometry: function () {
    this.d = this.control[0].temp.x * 2

    return this
  },

    /**
     * Gets height of a particular segment.
     * @param {number} segmentIndex The index of the segment.
     * @returns {number} height of the segment.
     */
  getSegmentHeight: function (segmentIndex) {
    var k = Math.pow((1 - this.c1) / this.c1, segmentIndex)
    var l1 = this.l * k
    var d1 = this.d * k
    return Math.pow(Math.pow(l1 * this.c1, 2) - Math.pow(d1 / 2, 2), 0.5) / this.c1
  },

  getMembers: function (scaleFactor) {
    var members = []
    var hSegment
    var scale = scaleFactor || 1
    var p1 = new RIPSAW.Vector(+this.d / 2, 0)
    var p2 = new RIPSAW.Vector(-this.d / 2, 0)
    var p3
    var p4
    var pJoint
    var baseLine
    var i

    for (i = 0; i < this.n; i += 1) {
      baseLine = new RIPSAW.Line(p1, p2)

      hSegment = this.getSegmentHeight(i)

      pJoint = baseLine.getMidPerpXY().scale(hSegment * this.c1).p2

      p4 = new RIPSAW.Line(p1, pJoint).scale(1 / this.c1).p2
      p3 = new RIPSAW.Line(p2, pJoint).scale(1 / this.c2).p2

      members.push(new RIPSAW.Line(p1.clone().scale(scale), p4.clone().scale(scale)))
      members.push(new RIPSAW.Line(p2.clone().scale(scale), p3.clone().scale(scale)))

      p1 = p3
      p2 = p4
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

    if (!this.hasValidLegSpan()) return totalHeight

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
        // this.normalize();

    if (this.hoverIndex !== -1) {
      this.control[this.hoverIndex].update()
    } else {

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
      innerScript += '\t' + members[i].toSVG() + '\n'
    }

    return RIPSAW.textAssets.SVGHeader + '\n' + innerScript + RIPSAW.textAssets.SVGFooter
  }

}

RIPSAW.inheritPrototype(RIPSAW.MasterPiece, RIPSAW.CurvingPantograph)
