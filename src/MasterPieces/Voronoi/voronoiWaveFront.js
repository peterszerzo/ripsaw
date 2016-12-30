RIPSAW.voronoiWaveFront = function (controlNodesArg) {
  var list = []
  var n = 4 // number of wavefront lines per node
  var that = {}
  var controlNodes = controlNodesArg

    /**
     * Add wave element to list.
     * @param {RIPSAW.Line} line
     * @returns {Object} this
     */
  that.add = function (line) {
    list.push(line)

    return this
  }

    /**
     * Returns a deep copy of the list.
     *
     */
  that.getList = function () {
    var i
    var max = list.length
    var listCopy = []

    for (i = 0; i < max; i += 1) {
      listCopy.push(list[i].clone())
    }

    return listCopy
  }

    /**
     * Clears wavefront list.
     * @returns {Object} this
     */
  that.clear = function () {
    list = []
    return this
  }

    /**
     * Builds square wavefront around a list of points, counterclockwise around each.
     * @param {Array} points - Array of points.
     * @param {number} waveSize
     * @returns {Object} this
     */
  that.build = function (waveSize) {
    var i
    var max = controlNodes.length
    var p1
    var p2
    var p3
    var p4
    var pt

    list = []

    for (i = 0; i < max; i += 1) {
      pt = controlNodes[i].temp

      p1 = pt.clone().add(new RIPSAW.Vector(+waveSize, 0))
      p2 = pt.clone().add(new RIPSAW.Vector(0, +waveSize))
      p3 = pt.clone().add(new RIPSAW.Vector(-waveSize, 0))
      p4 = pt.clone().add(new RIPSAW.Vector(0, -waveSize))

      list.push(new RIPSAW.Line(p1, p2))
      list.push(new RIPSAW.Line(p2, p3))
      list.push(new RIPSAW.Line(p3, p4))
      list.push(new RIPSAW.Line(p4, p1))
    }

    return this
  }

    /**
     * Intersects wavefront.
     * @returns {Array} nodes - Intersection nodes.
     */
  that.getIntersections = function () {
    var i
    var j
    var wi
    var wj
    var isect
    var nodes = []
    var node
    var max = list.length

    for (i = 0; i < max; i += 1) {
      wi = list[i]

      for (j = i + 1; j < max; j += 1) {
        if (Math.floor(i / n) !== Math.floor(j / n)) {
          wj = list[j]

          isect = wi.intersectXY(wj, 4e-3)

          if (isect.type === 'inside' || isect.type === 'overlap') {
            node = new RIPSAW.VoronoiIntersection(isect.points, [i, j])

            nodes.push(node)
          }
        }
      }
    }

    return nodes
  }

    /**
     * Checks if an intersection is at the same Manhattan distance between at least two control nodes.
     * @param {RIPSAW.Vector} pt
     * @returns {boolean}
     */
  that.isControllingIntersection = function (pt) {
    var i
    var max = controlNodes.length
    var minCount
    var minDistance
    var ctrl
    var distance

    minCount = 0
    minDistance = 10000

    for (i = 0; i < max; i += 1) {
      ctrl = controlNodes[i].temp

      distance = pt.getManhattanDistanceTo(ctrl)

      if (RIPSAW.areNearEqual(distance, minDistance, 4e-3 * 1.4)) {
        minCount += 1
      } else if (distance < minDistance) {
        minDistance = distance

        minCount = 1
      }
    }

    return (minCount >= 2)
  }

    /**
     * Intersects wavefront, only including intersection nodes within the range of a control point.
     * !!ISSUE!!: near equal tolerance does not filter overlap links correctly.
     * @returns {Array} nodes - Intersection nodes.
     */
  that.getSimpleIntersections = function () {
    var i
    var nodes = this.getIntersections()
    var max = nodes.length
    var node
    var pts
    var newNodes = []

    for (i = 0; i < max; i += 1) {
      node = nodes[i]

      pts = node.points

      if (this.isControllingIntersection(pts[0]) ||
                (pts[1] && this.isControllingIntersection(pts[1]))
            ) {
        newNodes.push(node)
      }
    }

    return newNodes
  }

  return that
}
