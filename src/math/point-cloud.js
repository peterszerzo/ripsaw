;(function (RIPSAW) {
/**
 * @constructor
 * @param {Array} args - Points.
 */
  RIPSAW.PointCloud = function (args) {
    /** @type {Array} */
    this._list = []

    var pt
    var pts
    var max
    var i

    if (arguments[0] instanceof Array) {
      pts = arguments[0]

      for (i = 0, max = pts.length; i < max; i += 1) {
        pt = pts[i]
        this._list.push(new RIPSAW.Vector(pt.x || 0, pt.y || 0, pt.z || 0))
      }
    }

    return this
  }

  RIPSAW.PointCloud.prototype = {

    /**
     * Adds point to list.
     * @param {RIPSAW.Vector} v - New vector.
     */
    addPoint: function (v) {
      this._list.push(v)

      return this
    },

    /**
     * Returns point at specified index.
     * @param {number} index
     * @returns {RIPSAW.Vector}
     */
    getPoint: function (index) {
      return this._list[index]
    },

    /**
     * Returns number of points in cloud.
     * @returns {number}
     */
    getPointCount: function () {
      return this._list.length
    },

    /**
     * Sorts by x-coordinates.
     * @returns {RIPSAW.PointCloud} this
     */
    sortX: function () {
      this._list.sort(function (a, b) {
        return (a.x > b.x) ? 1 : -1
      })

      return this
    },

    /**
     * Sorts by y-coordinates.
     * @returns {RIPSAW.PointCloud} this
     */
    sortY: function () {
      this._list.sort(function (a, b) {
        return (a.y > b.y) ? 1 : -1
      })

      return this
    },

    /**
     * Sorts by z-coordinates.
     * @returns {RIPSAW.PointCloud} this
     */
    sortZ: function () {
      this._list.sort(function (a, b) {
        return (a.z > b.z) ? 1 : -1
      })

      return this
    },

    /**
     * Returns bounding box.
     * @returns {{min:RIPSAW.Vector,max:RIPSAW.Vector}} obj - Lower and upper corner of the box: { min: , max: }.
     */
    getBoundingBox: function () {
      var maxX = -5000
      var minX = +5000
      var maxY = -5000
      var minY = +5000
      var maxZ = -5000
      var minZ = +5000
      var i
      var max = this._list.length
      var pt

      for (i = 0; i < max; i += 1) {
        pt = this.getPoint(i)

        if (pt.x > maxX) maxX = pt.x
        if (pt.y > maxY) maxY = pt.y
        if (pt.z > maxZ) maxZ = pt.z

        if (pt.x < minX) minX = pt.x
        if (pt.y < minY) minY = pt.y
        if (pt.z < minZ) minZ = pt.z
      }

      return {
        min: new RIPSAW.Vector(minX, minY, minZ),
        max: new RIPSAW.Vector(maxX, maxY, maxZ)
      }
    },

    /**
     * For a given x, finds points on the piecewise straight polyline connecting subsequent points of the cloud.
     * @returns {Array|RIPSAW.Vector}
     */
    interpolateX: function (x) {
      var i
      var max = this._list.length
      var p1
      var p2
      var result = []

      for (i = 0; i < max - 1; i += 1) {
        p1 = this._list[i]
        p2 = this._list[i + 1]

        if ((p1.x === x) || (p2.x === x) ||
                (p1.x < x && p2.x > x) ||
                (p1.x > x && p2.x < x)) {
          result.push(new RIPSAW.Line(p1, p2).interpolateX(x))
        }
      }

      return result
    },

    /**
     * Returns length of the !open! polyline defined by the pointcloud. Assume open polyline.
     * @returns {number}
     */
    getLength: function () {
      var i
      var max = this._list.length
      var result = 0

      for (i = 0; i < max - 1; i += 1) {
        result += this._list[i].getDistanceTo(this._list[i + 1])
      }

      return result
    },

    /**
     * Returns length of the !closed! polyline defined by the pointcloud.
     * @returns {number}
     */
    getClosedLength: function () {
      return this.getLength() + this._list[this._list.length - 1].getDistanceTo(this._list[0])
    },

    /**
     * Draws polyline formed by the pointcloud.
     * @param {function} [mappingFunction=identity] Mapping function used to transform nodes.
     * @returns {number}
     */
    draw: function (mappingFunction) {
      var i
      var max = this.getPointCount()
      var map = mappingFunction || function (x) {
        return x
      }

      RIPSAW.pen.start()
      RIPSAW.pen.moveTo(map(this.getPoint(0)))
      for (i = 1; i < max; i += 1) {
        RIPSAW.pen.lineTo(map(this.getPoint(i)))
      }
      RIPSAW.pen.end()

      return this
    },

    /**
     * Returns SVG output.
     * @returns {String}
     */
    toSVG: function () {
      var i
      var max = this.getPointCount()
      var pt
      var result = '<polyline fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" points = "'

      for (i = 0; i < max; i += 1) {
        pt = this.getPoint(i)

        result += pt.x.toFixed(6) + ',' + pt.y.toFixed(6) + ' '
      }

      result += '" />'

      return result
    }

  }
}(window.RIPSAW))
