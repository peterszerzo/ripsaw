;(function (RIPSAW) {
/**
 * @namespace pen
 * @memberof RIPSAW
 */
  RIPSAW.pen = {

    /**
     * Display stroke weights and circle radii - relative to minWH.
     * @type {Object}
     * @memberof RIPSAW.pen
     */
    displayDimensions: {

      nav: {

        outline: 1 / 500,
        buttonSize: 0.03

      }

    },

    /**
     * Display style settings.
     * @type {Object}
     * @memberof RIPSAW.pen
     */
    styles: {

      'design outline': {

        dim: 1 / 200,
        strokeColor: 7,
        fillColor: 1

      },

      'design iso': {

        dim: 1 / 500,
        strokeColor: 7,
        fillColor: 1

      },

      'design thin': {

        dim: 1 / 1000,
        strokeColor: 7,
        fillColor: 1

      },

      'nav bounding box': {

        dim: 1 / 500,
        strokeColor: 6

      },

      'design handle': {

        dim: 1 / 300,
        strokeColor: 7,
        fillColor: 1

      },

      'control point': {

        dim: 1 / 100,
        strokeColor: 1,
        fillColor: 5

      },

      'primary control point': {

        dim: 1 / 100,
        strokeColor: 1,
        fillColor: 4

      },

      'secondary control point': {

        dim: 1 / 100,
        strokeColor: 1,
        fillColor: 5

      },

      'point': {

        dim: 1 / 150,
        strokeColor: 1,
        fillColor: 2

      }

    },

    /**
     * Configures strokes, fills and radius for specific drawing situation (RIPSAW-CSS).
     * @memberof RIPSAW.pen
     * @param {String} type
     */
    configure: function (type) {
      var style = RIPSAW.pen.styles[type]

      RIPSAW.pen.stroke(style.dim || 1 / 100)
      RIPSAW.pen.radius(style.dim)
      RIPSAW.pen.color.stroke(style.strokeColor || 1)
      RIPSAW.pen.color.fill(style.fillColor || 1)
    },

    /**
     * Draws solid rectangle.
     * @memberof RIPSAW.pen
     * @param {number} x - Start x-coordinate.
     * @param {number} y - Start y-coordinate.
     * @param {number} w - Width.
     * @param {number} h - Height.
     */
    solidRect: function (x, y, w, h) {
      RIPSAW.ctx.beginPath()
      RIPSAW.ctx.rect(x, y, w, h)
      RIPSAW.ctx.closePath()
      RIPSAW.ctx.fill()
    },

    /**
     * Writes text on canvas.
     * @memberof RIPSAW.pen
     * @param {String} s - String to place.
     * @param {number} x - x-coordinate (relative to W).
     * @param {number} y - y-coordinate (relative to H).
     * @param {number} fontSizeRelative - Font size relative to default.
     * @param {number} colorCodingIndex - Color code from colorscheme.
     * @param {number} opacity
     */
    write: function (s, x, y, fontSizeRelative, colorCodingIndex, opacity) {
      RIPSAW.ctx.fillStyle = RIPSAW.colors.get(colorCodingIndex, opacity)
      RIPSAW.ctx.font = '' + RIPSAW.W * RIPSAW.wDisplay.text * fontSizeRelative + 'px ' + RIPSAW.fonts
      RIPSAW.ctx.fillText(s, RIPSAW.W * x, RIPSAW.H * y)
    },

    /**
     * Begins path.
     * @memberof RIPSAW.pen
     */
    start: function () {
      RIPSAW.ctx.beginPath()
    },

    /**
     * Ends path.
     * @memberof RIPSAW.pen
     */
    end: function () {
      RIPSAW.ctx.stroke()
    },

    /**
     * Moves cursor.
     * @memberof RIPSAW.pen
     * @param {RIPSAW.Vector}
     */
    moveTo: function (v) {
      RIPSAW.ctx.moveTo(v.x, v.y)
    },

    /**
     * Draws line to point.
     * @memberof RIPSAW.pen
     * @param {RIPSAW.Vector}
     */
    lineTo: function (v) {
      RIPSAW.ctx.lineTo(v.x, v.y)
    },

    /**
     * Draws line between two points.
     * @memberof RIPSAW.pen
     * @param {RIPSAW.Vector} v1 - Startpoint.
     * @param {RIPSAW.Vector} v2 - Endpoint.
     */
    line: function (v1, v2) {
      this.start()
      this.moveTo(v1)
      this.lineTo(v2)
      this.end()
    },

    arc: function (v, r, angleRange) {
      if (r > 0) {
        this.start()
        RIPSAW.ctx.arc(v.x, v.y, r, angleRange.theta1, angleRange.theta2)
        this.end()
      }
    },

    splineTo: function (v1, v2, v3) {
      RIPSAW.ctx.bezierCurveTo(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y)
    },

    solidCircle: function (v, r) {
      r = (typeof r === 'undefined') ? RIPSAW.defaultRadius : r * RIPSAW.minWH

      RIPSAW.ctx.beginPath()
      RIPSAW.ctx.arc(v.x, v.y, r, 0, Math.PI * 2, true)
      RIPSAW.ctx.fill()
    },

    controlPoint: function (v, doubleRadius, isSecondary) {
      var r = RIPSAW.defaultRadius
      r = doubleRadius ? (2 * r) : r

      RIPSAW.pen.solidCircle(v, r)
    },

    stroke: function (r) {
      RIPSAW.ctx.lineWidth = r * RIPSAW.minWH
    },

    radius: function (r) {
      RIPSAW.defaultRadius = r
    },

    color: {

      stroke: function (i, opacity) {
        RIPSAW.ctx.strokeStyle = RIPSAW.colors.get(i, opacity || 1)
      },

      fill: function (i, opacity) {
        RIPSAW.ctx.fillStyle = RIPSAW.colors.get(i, opacity || 1)
      }

    },

    animateCircle: function (v, r1, r2, color1, color2, t1, t2) {
      var r
      var c1

      if ((RIPSAW.time - RIPSAW.time0) >= t1 && (RIPSAW.time - RIPSAW.time0) <= t2) {
        c1 = (t2 - RIPSAW.time + RIPSAW.time0) / (t2 - t1) // goes from 1 to 0
        r = r1 * c1 + r2 * (1 - c1)

        RIPSAW.ctx.strokeStyle = RIPSAW.colors.getBetween(color1, color2, c1, c1)
        RIPSAW.ctx.lineWidth = RIPSAW.minWH / 200
        RIPSAW.pen.arc(RIPSAW.map(v), r * RIPSAW.minWH, {
          theta1: 0,
          theta2: 2 * Math.PI
        })
      }
    },

    boundingBox: function (corner, dimension, r) {
      var x = corner.x
      var y = corner.y
      var w = dimension.x
      var h = dimension.y

      RIPSAW.pen.line({
        x: x + r,
        y: y
      }, {
        x: x + w - r,
        y: y
      })

      RIPSAW.pen.line({
        x: x + w,
        y: y + r
      }, {
        x: x + w,
        y: y + h - r
      })

      RIPSAW.pen.line({
        x: x + w - r,
        y: y + h
      }, {
        x: x + r,
        y: y + h
      })

      RIPSAW.pen.line({
        x: x,
        y: y + h - r
      }, {
        x: x,
        y: y + r
      })

      RIPSAW.pen.arc({
        x: x + r,
        y: y + r
      }, r, {
        theta1: Math.PI * 1,
        theta2: Math.PI * 1.5
      })

      RIPSAW.pen.arc({
        x: x + w - r,
        y: y + r
      }, r, {
        theta1: Math.PI * 1.5,
        theta2: Math.PI * 2
      })

      RIPSAW.pen.arc({
        x: x + r,
        y: y + h - r
      }, r, {
        theta1: Math.PI / 2,
        theta2: Math.PI * 1
      })

      RIPSAW.pen.arc({
        x: x + w - r,
        y: y + h - r
      }, r, {
        theta1: Math.PI * 2,
        theta2: Math.PI * 2.5
      })
    }

  }
}(window.RIPSAW))
