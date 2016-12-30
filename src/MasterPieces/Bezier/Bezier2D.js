/**
 * @constructor
 * @extends RIPSAW.MasterPiece
 * @param {String|Array} controlPoints - Control points either as SVG path ('M9,1,2...5,6z') or array of BezierHandles.
 * @param {boolean} [isClosed=true] True if the curve is closed.
 */
RIPSAW.Bezier2D = function (controlPoints) {
    // classical inheritance - prototype is inherited after subclass prototype is set
  RIPSAW.MasterPiece.call(this)

    /**
     * Rotation.
     * @type {number}
     */
  this.theta = 0

    /** @type {boolean} */
  this.isClosed = true

  if (typeof (controlPoints) === 'string') {
    this.control = new RIPSAW.BezierSVGPath(controlPoints).toBezierHandles()
  } else {
    this.control = controlPoints
  }

  return this
}

RIPSAW.Bezier2D.prototype = {

    /**
     * Returns string representation.
     * @returns {String}
     */
  toString: function () {
    var i
    var max = this.control.length
    var output = ''

    for (i = 0; i < max; i += 1) {
      output += this.control[i].toString()
    }

    return output
  },

    /**
     * Adds control point to the end of the control point array.
     * @param {Object} controlPoint control point
     */
  addControlPoint: function (controlPoint) {
    this.control.push(controlPoint)
  },

    /**
     * Resets control point to a straight line .
     * @param {number} height y-coordinate of straight line.
     * @param {number} nDiv Number of divisions.
     */
  createDepthProfile: function (height, nDiv) {
    var i
    var div = nDiv || 3
    var h = height || 0.1

    this.control = []

    for (i = 0; i < div; i += 1) {
      this.control.push(new RIPSAW.BezierHandle(

                new RIPSAW.Vector((i - 0.3) / (div - 1) - 0.5, h, 0),
                new RIPSAW.Vector((i + 0.0) / (div - 1) - 0.5, h, 0),
                new RIPSAW.Vector((i + 0.3) / (div - 1) - 0.5, h, 0)

            ))
    }

    this.constrainEnds(new RIPSAW.Vector(0, 1, 1))

    this.n = 15

    this.isClosed = false

    return this
  },

    /**
     * Returns bounding rectangle.
     * @returns {Object} boundingRectangle - Minimum and maximum bounds in a { min: , max: } object.
     */
  getBoundingRectangle: function () {
    var maxX = -5000
    var maxY = -5000
    var minX = +5000
    var minY = +5000 // max/min coordinates for normalization
    var i
    var max = this.control.length
    var ctrl

    for (i = 0; i < max; i += 1) {
      ctrl = this.control[i]

      maxX = Math.max(maxX, ctrl.p[0].temp.x, ctrl.p[1].temp.x, ctrl.p[2].temp.x)
      minX = Math.min(minX, ctrl.p[0].temp.x, ctrl.p[1].temp.x, ctrl.p[2].temp.x)

      maxY = Math.max(maxY, ctrl.p[0].temp.y, ctrl.p[1].temp.y, ctrl.p[2].temp.y)
      minY = Math.min(minY, ctrl.p[0].temp.y, ctrl.p[1].temp.y, ctrl.p[2].temp.y)
    }

    return {

      min: new RIPSAW.Vector(minX, minY),
      max: new RIPSAW.Vector(maxX, maxY)

    }
  },

    /**
     * Returns centroid.
     * @returns {RIPSAW.Vector} centroid
     */
  getCentroid: function () {
    var br = this.getBoundingRectangle()

    return new RIPSAW.Vector((br.max.x + br.min.x) / 2, (br.max.y + br.min.y) / 2)
  },

    /**
     * Returns maximum flat dimension in x and y directions.
     * @returns {number} maxDim
     */
  getMaxDim: function () {
    var br = this.getBoundingRectangle()

    return Math.max(br.max.x - br.min.x, br.max.y - br.min.y)
  },

    /**
     * Moves all control points.
     * @param {RIPSAW.Vector} displacement
     * @returns {RIPSAW.Bezier2D} this
     */
  moveGeometry: function (displacement) {
    var i
    var max = this.control.length
    var ctrl

    for (i = 0; i < max; i += 1) {
      ctrl = this.control[i]

      ctrl.p[0].temp.add(displacement)
      ctrl.p[0].update()

      ctrl.p[1].temp.add(displacement)
      ctrl.p[1].update()

      ctrl.p[2].temp.add(displacement)
      ctrl.p[2].update()
    }

    return this
  },

    /** Scales all control points with respect to the origin. */
  scaleGeometry: function (scaleFactor) {
    var i
    var max = this.control.length
    var ctrl
    var fact = scaleFactor || 1

    for (i = 0; i < max; i += 1) {
      ctrl = this.control[i]

      ctrl.p[0].temp.scale(fact)
      ctrl.p[0].update()

      ctrl.p[1].temp.scale(fact)
      ctrl.p[1].update()

      ctrl.p[2].temp.scale(fact)
      ctrl.p[2].update()
    }

    return this
  },

    /** Normalizes handles so that they fit in the (-0.5, -0.5) -> (+0.5, +0.5) rectangle. */
  normalize: function () {
    var centroid
    var scaleFactor

    centroid = this.getCentroid()
    scaleFactor = 1 / this.getMaxDim()

    this.moveGeometry(centroid.scale(-1)).scaleGeometry(scaleFactor)

    return this
  },

    /**
     * Constrain endpoints such that they cannot be dragged in a given direction.
     * @param {Object} [constraint={ x: 1, y: 1, z: 1 }] - Constraint direction.
     */
  constrainEnds: function (constraint) {
    var constr = constraint || new RIPSAW.Vector(1, 1, 1)

    this.control[0].constraint = constraint
    this.control[this.control.length - 1].constraint = constraint

    return this
  },

    /**
     * Returns true if curve is closed.
     * @returns {boolean}
     */
  isClosed: function () {
    if (this.control.length === 0) return false

    return this.control[0].p[1].perm.isNearEqualTo(this.control[this.control.length - 1].p[1].perm)
  },

    /**
     * Sets the number of divisions for individual Bezier curve segments (between two BezierHandle objects), proportionally to segment length.
     * @param {number} nMax - Total number of division segments along length of the entire curve.
     */
  setSubdivisions: function (nMax) {
    var maxLength = 0
    var max
    var currentLength
    var lengths = []
    var i

    for (i = 0, max = this.control.length; i < max; i += 1) {
      currentLength = this.getSegmentLength(i)

      lengths.push(currentLength)

      if (currentLength > maxLength) maxLength = currentLength
    }

    for (i = 0, max = this.control.length; i < max; i += 1) {
      this.control[i].n = Math.floor(lengths[i] / maxLength * nMax)
    }

    return this
  },

    /**
     * Returns the length of one segment.
     * @param {number} segmentIndex - Index of segment to be evaluated.
     * @param {number} [n=10] - Number of line segments used to evaluate the length (the higher, the more accurate).
     */
  getSegmentLength: function (segmentIndex, n) {
    var length = 0
    var nDiv = n || 10
    var i
    var p1
    var p2

    for (i = 0; i < nDiv; i += 1) {
      p1 = this.getPoint(segmentIndex, i / (nDiv))
      p2 = this.getPoint(segmentIndex, (i + 1) / (nDiv))

      length += p1.getDistanceTo(p2)
    }

    return length
  },

    /**
     * Returns point along curve.
     * @param {number} segmentIndex - Index of segment to be evaluated.
     * @param {number} s - Curve parameter along segment (0 at start, 1 at end).
     */
  getPoint: function (segmentIndex, s) {
    var p1
    var p2
    var p3
    var p4
    var nextSegmentIndex = (segmentIndex === this.control.length - 1) ? 0 : (segmentIndex + 1)

    p1 = this.control[segmentIndex].p[1].temp
    p2 = this.control[segmentIndex].p[2].temp
    p3 = this.control[nextSegmentIndex].p[0].temp
    p4 = this.control[nextSegmentIndex].p[1].temp

    return new RIPSAW.Vector().getLinearCombination(
            [p1, p2, p3, p4], [
              Math.pow(1 - s, 3) * Math.pow(s, 0),
              Math.pow(1 - s, 2) * Math.pow(s, 1) * 3,
              Math.pow(1 - s, 1) * Math.pow(s, 2) * 3,
              Math.pow(1 - s, 0) * Math.pow(s, 3)
            ]
        )
  },

    /**
     * Returns subdivision of the entire curve.
     * @param {number} segmentIndex - Index of segment to be evaluated.
     * @param {number} n - Number of subdivisions per segment. If not specified, number is taken for start-BezierHandle object for each segment.
     * @returns {RIPSAW.PointCloud} result - List of subdivision points.
     */
  getSubdivision: function (n) {
    var result = new RIPSAW.PointCloud()
    var max
    var segmentDiv
    var i
    var j

    max = (this.isClosed) ? (this.control.length) : (this.control.length - 1)

    for (i = 0; i < max; i += 1) {
      segmentDiv = n || this.control[i].n

      for (j = 0; j < segmentDiv; j += 1) {
        result.addPoint(this.getPoint(i, j / (segmentDiv - 1)))
      }
    }

    return result
  },

    /** Place spline. */
  placeSpline: function () {
    var i
    var max = this.control.length
    var dd = RIPSAW.pen.displayDimensions

    RIPSAW.pen.start()

    RIPSAW.pen.moveTo(this.map(this.control[0].p[1].temp))
    for (i = 1; i < max; i += 1) {
      RIPSAW.pen.splineTo(

                this.map(this.control[i - 1].p[2].temp),
                this.map(this.control[i].p[0].temp),
                this.map(this.control[i].p[1].temp)

            )
    }

    if (this.isClosed) {
      RIPSAW.pen.splineTo(

                this.map(this.control[max - 1].p[2].temp),
                this.map(this.control[0].p[0].temp),
                this.map(this.control[0].p[1].temp)

            )
    }

    RIPSAW.pen.end()

    return this
  },

    /** Place control handles. */
  placeControlHandles: function () {
    var i
    var max = this.control.length
    var ctrl

    for (i = 0; i < max; i++) {
      ctrl = this.control[i]

      RIPSAW.pen.line(this.map(ctrl.p[1].temp), this.map(ctrl.p[0].temp))
      RIPSAW.pen.line(this.map(ctrl.p[1].temp), this.map(ctrl.p[2].temp))
    }
  },

    /** Place control points. */
  placeControlPoints: function () {
    var i
    var max = this.control.length
    var j
    var ctrl

    for (i = 0; i < max; i++) {
      ctrl = this.control[i]

      for (j = 0; j < 3; j += 1) {
        RIPSAW.pen.configure((j === 1) ? 'primary control point' : 'secondary control point')
        RIPSAW.pen.controlPoint(this.map(ctrl.p[j].temp), ctrl.hoverType === j)
      }
    }
  },

    /** Draw object. Manifest for all place[...] methods. */
  draw: function () {
    if (this.allow.draw) {
      RIPSAW.pen.configure('design outline')
      this.placeSpline()

      RIPSAW.pen.configure('design handle')
      this.placeControlHandles()

      RIPSAW.pen.configure('control point')
      this.placeControlPoints()
    }

    return this
  },

    /** Returns deep copy. */
  clone: function () {
    var i
    var duplicate = new RIPSAW.BezierObject([], this.theta, this.p0.x, this.p0.y, this.scale)
    var max

    for (i = 0, max = this.control.length; i < max; i += 1) {
      duplicate.control.push(this.control[i].clone())
    }

    return duplicate
  },

    /** Updates hoverstates. */
  updateHoverState: function () {
    var i
    var j
    var max = this.control.length
    var ctrl

    this.hoverIndex = -1

    for (i = 0; i < max; i += 1) {
      ctrl = this.control[i]
      ctrl.hoverType = -1

      for (j = 0; j <= 2; j += 1) {
        if (RIPSAW.mouse.hovers(this.map(ctrl.p[j].perm))) {
          this.hoverIndex = i
                    // if nodes 0 or 2 of the Bezier handle overlap with node 1, 1 should be selected
          ctrl.hoverType = (ctrl.hoverType !== 1) ? j : 1
        }
      }
    }

    return this
  },

    /** Executed on mouse move. */
  mouseMove: function () {
    var globalDrag

    if (this.allow.edit) {
      globalDrag = RIPSAW.mouse.getNormalizedDrag()

      if (!RIPSAW.mouse.isDragging) {
        this.updateHoverState()
      } else {
                // pan object
        if (this.hoverIndex === -1 && this.allow.pan) {
          this.centroid.setDrag(globalDrag)
        }

                // modify control handles
        else if ((this.hoverIndex !== -1) && (/mode[1-3]/.test(RIPSAW.mode)) && this.allow.edit) {
          this.control[this.hoverIndex].setDrag(this.getObjectDrag())
          RIPSAW.isModified = true
        }
      }
    }

    return this
  },

    /** Executed on mouse up. */
  mouseUp: function () {
    if (this.hoverIndex !== -1) {
      this.control[this.hoverIndex].update()
    } else {
 // if screen is panned

      this.centroid.update()
    }

    return this
  },

    /** Executed on mouse down. */
  mouseDown: function () {
    if (RIPSAW.mode === 'smooth' && this.hoverIndex !== -1) {
      this.control[this.hoverIndex].smooth()
    }

    return this
  },

    /**
     * Returns SVG path.
     * @returns {String}
     */
  toSVGPath: function () {
    var i
    var max = this.control.length
    var svgText
    var l = RIPSAW.rDim.l
    var ctrl1
    var ctrl2

    svgText = 'M' +
            ((this.control[0].p[1].perm.x + 0.5) * l).toFixed(2) + ',' +
            ((this.control[0].p[1].perm.y + 0.5) * l).toFixed(2)

    for (i = 0; i < max; i += 1) {
      ctrl1 = this.control[i]
      ctrl2 = (i === (max - 1)) ? this.control[0] : this.control[i + 1]

      svgText += 'C' +
                ((ctrl1.p[2].perm.x + 0.5) * l).toFixed(2) + ',' +
                ((ctrl1.p[2].perm.y + 0.5) * l).toFixed(2) + ',' +
                ((ctrl2.p[0].perm.x + 0.5) * l).toFixed(2) + ',' +
                ((ctrl2.p[0].perm.y + 0.5) * l).toFixed(2) + ',' +
                ((ctrl2.p[1].perm.x + 0.5) * l).toFixed(2) + ',' +
                ((ctrl2.p[1].perm.y + 0.5) * l).toFixed(2)
    }

    svgText += 'z'

    return svgText
  },

    /**
     * Database-friendly export.
     * @returns {String}
     */
  toDB: function () {
    return this.toSVGPath()
  },

    /**
     * Reconstruct from database representation.
     * @returns {RIPSAW.Bezier2D} this
     */
  fromDB: function (geo) {
    this.control = new RIPSAW.BezierSVGPath(geo).toBezierHandles()

    return this
  },

    /**
     * Returns full SVG file.
     * @returns {String}
     */
  toSVG: function () {
    var svgText = ''

    svgText = RIPSAW.textAssets.SVGHeader

    svgText += '<path style="fill:none;stroke-width:4;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" '

    svgText += 'd="' + this.toSVGPath() + '">'

    svgText += RIPSAW.textAssets.SVGFooter

    return svgText
  },

    /**
     * Returns Rhino PythonScript output.
     * @returns {String}
     */
  toRhinoPythonScript: function (curveName, curveNumber, isHorizontal) {
    var exportScript = ''
    var pointArray
    var i
    var max
    var ctrl
    var l = RIPSAW.rDim.l
    var modifier = new RIPSAW.Vector(1.02, 1, 1 / RIPSAW.rDim.depthScale)
    var getPointList = function (indexArray) {
      var i
      var max = indexArray.length
      var pointList = ''

      for (i = 0; i < max; i += 1) {
        pointList += 'pts[' + (indexArray[i]) + ']'
        if (i < max - 1) {
          pointList += ','
        }
      }

      return pointList
    }

        // header
    exportScript += '\n\trs.AddLayer("' + curveName + '")\n'
    exportScript += '\trs.CurrentLayer("' + curveName + '")\n'
    exportScript += '\n\tpts = []'
    exportScript += '\n\t' + curveName + '_crvs = []\n\n'

        // add points
    for (i = 0, max = this.control.length; i < max; i += 1) {
      ctrl = this.control[i]

      if (isHorizontal) {
        exportScript += ctrl.p[0].perm.clone().scale(l).toRhinoPythonScriptArray('pts')
        exportScript += ctrl.p[1].perm.clone().scale(l).toRhinoPythonScriptArray('pts')
        exportScript += ctrl.p[2].perm.clone().scale(l).toRhinoPythonScriptArray('pts')
      } else {
        exportScript += ctrl.p[0].perm.clone().swapYZ().scale(l).product(modifier).toRhinoPythonScriptArray('pts')
        exportScript += ctrl.p[1].perm.clone().swapYZ().scale(l).product(modifier).toRhinoPythonScriptArray('pts')
        exportScript += ctrl.p[2].perm.clone().swapYZ().scale(l).product(modifier).toRhinoPythonScriptArray('pts')
      }
    }

        // add curves
    for (i = 0, max = this.control.length; i < max; i += 1) {
      pointArray = ''

      if (i < this.control.length - 1) {
        pointArray = getPointList([3 * i + 1, 3 * i + 2, 3 * i + 3, 3 * i + 4])
        exportScript += '\n\t' + curveName + '_crvs.append(' + 'rs.AddCurve([' + pointArray + ']))'
      } else if (this.isClosed) {
        pointArray = getPointList([3 * i + 1, 3 * i + 2, 0, 1])
        exportScript += '\n\t' + curveName + '_crvs.append(' + 'rs.AddCurve([' + pointArray + ']))'
      }
    }

    exportScript += '\n\n\t' + curveName + '=rs.JoinCurves(' + curveName + '_crvs, True);\n\n'

        // add extrude paths
    exportScript += '\n\t' + curveName + '_extrudePath1 = rs.AddLine(' + '[0,0,' + 0 + ']' + ',' + ((isHorizontal) ? ('[0,0,' + (-l / 2) + ']') : ('[0,' + (-l / 2) + ',0]')) + ')'
    exportScript += '\n\t' + curveName + '_extrudePath2 = rs.AddLine(' + '[0,0,' + 0 + ']' + ',' + ((isHorizontal) ? ('[0,0,' + l / 2 + ']') : ('[0,' + l / 2 + ',0]')) + ')'

        // make and join extrusions
    exportScript += '\n\t' + curveName + '_srf1 = rs.ExtrudeCurve(' + curveName + ',' + curveName + '_extrudePath1)'
    exportScript += '\n\t' + curveName + '_srf2 = rs.ExtrudeCurve(' + curveName + ',' + curveName + '_extrudePath2)'

    exportScript += '\n\t' + curveName + '_srf = rs.JoinSurfaces([' + curveName + '_srf1,' + curveName + '_srf2], True)'

    exportScript += '\n\n\n'

    return exportScript
  }

}

RIPSAW.inheritPrototype(RIPSAW.MasterPiece, RIPSAW.Bezier2D)
