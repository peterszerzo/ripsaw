/**
 * @constructor
 * @param {RIPSAW.Vector} v1 - Startpoint.
 * @param {RIPSAW.Vector} v2 - Endpoint.
 */
RIPSAW.Line = function (v1, v2) {
    /** @type {RIPSAW.Vector} */
  this.p1 = v1.clone()

    /** @type {RIPSAW.Vector} */
  this.p2 = v2.clone()

  return this
}

RIPSAW.Line.prototype = {

    /**
     * Returns point along line.
     * @param {number} s - Curve parameter (0 at startpoint, 1 at endpoint).
     * @returns {RIPSAW.Vector}
     */
  pointAt: function (s) {
    var x = this.p1.x * (1 - s) + this.p2.x * s
    var y = this.p1.y * (1 - s) + this.p2.y * s
    var z = this.p1.z * (1 - s) + this.p2.z * s

    return new RIPSAW.Vector(x, y, z)
  },

    /**
     * Returns whether the start- and endpoints of the line are within .
     * @param {number} s - Curve parameter (0 at startpoint, 1 at endpoint).
     * @returns {boolean} true
     */
  hasInBoundingRectangleXY: function (p) {
    return (p.x >= Math.min(this.p1.x, this.p2.x)) &&
            (p.x <= Math.max(this.p1.x, this.p2.x)) &&
            (p.y >= Math.min(this.p1.y, this.p2.y)) &&
            (p.y <= Math.max(this.p1.y, this.p2.y))
  },

    /**
     * Draws line.
     * @returns {RIPSAW.Line} this
     */
  draw: function () {
    var mappingFunction = (typeof arguments[0] !== 'undefined') ? arguments[0] : function (x) {
      return x
    }

    RIPSAW.line(mappingFunction(this.p1), mappingFunction(this.p2))

    return this
  },

    /**
     * Reverses line.
     * @returns {RIPSAW.Line} this
     */
  reverse: function () {
    var replace = this.p1

    this.p1 = this.p2
    this.p2 = replace

    return this
  },

    /**
     * Returns equation of the line in XY plane as coefficients of a * x + b * y + c = 0.
     * @returns {Object} equation - Object in { a: , b: , c: } format.
     */
  getEquationXY: function () {
        // 0 = a * x + b * y + c
    var a
    var b
    var c

    if (this.p1.x === this.p2.x) {
      a = 1
      b = 0
      c = -this.p1.x
    } else {
      a = (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x)
      b = -1
      c = this.p2.y - a * this.p2.x
    }

    return {
      a: a,
      b: b,
      c: c
    }
  },

    /**
     * Returns new line of unit length perpendicular to the line, originating from the midpoint.
     * @returns {RIPSAW.Line} midPerpXY
     */
  getMidPerpXY: function () {
    var v = this.p1.clone().subtract(this.p2)
    var startPoint = this.p1.clone().scale(0.5).add(this.p2.clone().scale(0.5))

    v.crossMultiply(new RIPSAW.Vector(0, 0, 1)).normalize()

    return new RIPSAW.Line(startPoint, startPoint.clone().add(v))
  },

    /**
     * Scales line with respect to the startpoint. Modifies object!
     * @returns {RIPSAW.Line} this
     */
  scale: function (factor) {
    var v = this.p2.clone().subtract(this.p1).scale(factor)

    this.p2 = this.p1.clone().add(v)

    return this
  },

    /**
     * Returns distance from point to line, projecting both onto XY plane.
     * @param {RIPSAW.Vector} p - Point
     * @returns {RIPSAW.Line} this
     */
  getDistanceFromXY: function (p) {
    var eq = this.getEquationXY()
    var d = Math.pow(Math.pow(eq.a, 2) + Math.pow(eq.b, 2) + Math.pow(eq.c, 2), 0.5)

    return Math.abs(eq.a * p.x + eq.b * p.y + eq.c) / d
  },

    /**
     * Returns point on line with a given x coordinate.
     * @param {RIPSAW.Vector} xTarget
     * @returns {RIPSAW.Vector}
     */
  interpolateX: function (xTarget) {
    var s
    var result

    if (RIPSAW.areNearEqual(this.p1.x, this.p2.x)) return this.p1.clone()

    s = (xTarget - this.p1.x) / (this.p2.x - this.p1.x)

    result = this.p1.clone().scale(1 - s)
    result.add(this.p2.clone().scale(s))

    return result
  },

    /**
     * Returns intersection with another line in a complex object. See specs for usage examples.
     * @param {RIPSAW.Line} l2
     * @param {number} delta2 - Override overlap tolerance defined
     * @returns {Object}
     */
  intersectXY: function (l2, delta2Arg) {
        // l1.p1.x + (l1.p2.x - l1.p1.x) * s1 = l2.p1.x + (l2.p2.x - l2.p1.x) * s2 (1)
        // l1.p1.y + (l1.p2.y - l1.p1.y) * s1 = l2.p1.y + (l2.p2.y - l2.p1.y) * s2 (2)
        // matrix form: K * [ s1 ; s2 ] = M  {colon indicates row break in matrix}
        // solve for S = [ s1 ; s2 ] = K-1 * M
        // substitute results on the left side of (1) and (2) to obtain coordinates

    var l1 = this
    var K
    var M
    var S
    var s1
    var s2
    var pc
    var delta2 = (typeof delta2Arg === 'undefined') ? RIPSAW.delta2 : delta2Arg

    K = new RIPSAW.Matrix(2, 2).populate(+(l1.p2.x - l1.p1.x), -(l2.p2.x - l2.p1.x), +(l1.p2.y - l1.p1.y), -(l2.p2.y - l2.p1.y))

    if (Math.abs(K.determinant()) < RIPSAW.delta) {
      if (this.getDistanceFromXY(l2.p1) < delta2) {
        if (l1.hasInBoundingRectangleXY(l2.p1) || l1.hasInBoundingRectangleXY(l2.p2)) {
          pc = new RIPSAW.PointCloud([this.p1.clone(), this.p2.clone(), l2.p1.clone(), l2.p2.clone()]).sortX().sortY()

          return {

            points: [pc.getPoint(1).clone(), pc.getPoint(2).clone()],
            type: 'overlap'

          }
        } else {
          return {

            points: [],
            type: 'outerlap'

          }
        }
      } else {
        return {

          points: [],
          type: 'parallel'

        }
      }
    }

    M = new RIPSAW.Matrix(2, 1).populate(
            l2.p1.x - l1.p1.x,
            l2.p1.y - l1.p1.y
        )

    S = K.clone().inverse().multiply(M)

    s1 = S.table[0][0]
    s2 = S.table[1][0]

    return {
      points: [l1.pointAt(s1)],
      type: (s1 >= 0 && s1 <= 1 && s2 >= 0 && s2 <= 1) ? 'inside' : 'outside',
      s1: s1,
      s2: s2
    }
  },

    /**
     * Returns line angle measured from +x, projected onto XY plane.
     * @returns {number}
     */
  getAngleXY: function () {
    var angle
    var v1 = this.p1
    var v2 = this.p2

    if (Math.abs(v1.x - v2.x) < 1e-5 && v2.y > v1.y) return Math.PI / 2

    if (Math.abs(v1.x - v2.x) < 1e-5 && v2.y < v1.y) return 3 * Math.PI / 2

    angle = Math.atan((v2.y - v1.y) / (v2.x - v1.x))

    if (v1.x < v2.x) {
      if (angle < 0) return angle + 2 * Math.PI
      return angle
    }

    return angle + Math.PI
  },

    /**
     * Returns SVG representation.
     * @returns {String}
     */
  toSVG: function () {
    var result = '<line fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" '

    result += 'x1 = "' + this.p1.x.toFixed(6) + '" '
    result += 'y1 = "' + this.p1.y.toFixed(6) + '" '
    result += 'x2 = "' + this.p2.x.toFixed(6) + '" '
    result += 'y2 = "' + this.p2.y.toFixed(6) + '" '

    result += '/>'

    return result
  },

  toRhinoPythonScript: function () {
    return 'rs.AddLine(' + this.p1.toRhinoPythonScript() + ', ' + this.p2.toRhinoPythonScript() + ')'
  },

  clone: function () {
    return new RIPSAW.Line(this.p1.clone(), this.p2.clone())
  }

}
