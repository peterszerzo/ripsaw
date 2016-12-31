;(function (RIPSAW) {
/**
 * @constructor
 * @param {RIPSAW.Vector} v1 - Left handle end.
 * @param {RIPSAW.Vector} v2 - Middle handle point (on curve).
 * @param {RIPSAW.Vector} v3 - Right handle end.
 */
  RIPSAW.BezierHandle = function (v1, v2, v3) {
    this.p = [

      new RIPSAW.DragNode(v1),
      new RIPSAW.DragNode(v2),
      new RIPSAW.DragNode(v3)

    ]

    // subdivisions
    this.n = 20

    this.hoverType = -1

    // constraints in 3 directions, (1, 1, 1) means the vector is not constrained
    this.constraint = new RIPSAW.Vector(1, 1, 1)

    return this
  }

  RIPSAW.BezierHandle.prototype = {

    toString: function () {
      var output = ''
      output += '[' + this.p[0].perm.x + ', ' + this.p[0].perm.y + '] - '
      output += '[' + this.p[1].perm.x + ', ' + this.p[1].perm.y + '] - '
      output += '[' + this.p[2].perm.x + ', ' + this.p[2].perm.y + ']'
      return output
    },

    update: function () {
        // update permanent coordinates to temporary ones
      this.p[0].update()
      this.p[1].update()
      this.p[2].update()

      return this
    },

    clone: function () {
      return new RIPSAW.BezierHandle(

            new RIPSAW.DragNode(this.p[0].perm.x, this.p[0].perm.y, this.p[0].perm.z),
            new RIPSAW.DragNode(this.p[1].perm.x, this.p[1].perm.y, this.p[1].perm.z),
            new RIPSAW.DragNode(this.p[2].perm.x, this.p[2].perm.y, this.p[2].perm.z)

        )
    },

    revert: function () {
        // revert temporary coordinates to permanent ones
      this.p[0].revert()
      this.p[1].revert()
      this.p[2].revert()
    },

    getHandleLengths: function () {
      return {

        temp: [

          this.p[0].temp.getDistanceTo(this.p[1].temp),
          this.p[2].temp.getDistanceTo(this.p[1].temp)

        ],

        perm: [

          this.p[0].perm.getDistanceTo(this.p[1].perm),
          this.p[2].perm.getDistanceTo(this.p[1].perm)

        ]

      }
    },

    setHandleLength: function (handleIndex, handleLength) {
      var s
      var dv

      s = 1 - handleLength / this.getHandleLengths().temp[handleIndex]

      if (Math.abs(s) < 10) {
        dv = this.p[1].temp.clone()

        dv.subtract(this.p[2 * handleIndex].temp)

        dv.scale(s)

        this.p[2 * handleIndex].temp.add(dv)
      }

      return this
    },

    preserveHandleLength: function (handleIndex) {
      var handleLength = this.getHandleLengths().perm[handleIndex]

      this.setHandleLength(handleIndex, handleLength)

      return this
    },

    // Make nodes 1, 2 and  3 colinear
    smooth: function () {
      var dx2 = this.p[2].temp.x - this.p[0].temp.x
      var dy2 = this.p[2].temp.y - this.p[0].temp.y
      var n
      var k

      n = (dx2 === 0) ? 100 : (dy2 / dx2)

      k = (this.p[2].temp.x > this.p[1].temp.x) ? 1 : -1

      this.p[2].temp = this.p[1].temp.clone().add(new RIPSAW.Vector(+k, +k * n))
      this.p[0].temp = this.p[1].temp.clone().add(new RIPSAW.Vector(-k, -k * n))

      this.preserveHandleLength(0)
      this.preserveHandleLength(1)

      this.update()

      return this
    },

    drawControlHandles: function (mappingFunction) {
      mappingFunction = mappingFunction || function (x) {
        return x
      }
      RIPSAW.pen.line(mappingFunction(this.p[1].temp), mappingFunction(this.p[0].temp))
      RIPSAW.pen.line(mappingFunction(this.p[1].temp), mappingFunction(this.p[2].temp))
    },

    drawControlPoints: function (mappingFunction) {
      mappingFunction = mappingFunction || function (x) {
        return x
      }
      RIPSAW.pen.controlPoint(mappingFunction(this.p[0].temp), this.hoverType === 1)
    },

    setDrag: function (drag0) {
      var l = this.getHandleLengths().temp
      var hT = this.hoverType
      var k
      var drag = drag0.clone().product(this.constraint)

      if (hT !== -1) {
        switch (hT) {

          case 1:

            this.p[1].setDrag(drag)
            this.p[0].setDrag(drag)
            this.p[2].setDrag(drag)

            break

          case 0:
          case 2:

            this.p[hT].setDrag(drag0)

            if (/mode[2-3]/.test(RIPSAW.mode)) {
              k = l[(2 - hT) / 2] / l[hT / 2]

              if (Math.abs(k) < 10) {
                this.p[2 - hT].setDrag(drag0.product(new RIPSAW.Vector(-k, -k)))

                if (/mode2/.test(RIPSAW.mode)) {
                  this.preserveHandleLength((2 - hT) / 2)
                }
              }
            }

        }
      }

      return this
    },

    toRhinoPythonScript: function () {

    }

  }
}(window.RIPSAW))
