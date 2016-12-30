/**
 * @constructor
 * @extends RIPSAW.MasterPiece
 */
RIPSAW.Bezier3D = function (path, depth) {
    // classical inheritance - prototype is inherited after subclass prototype is set
  RIPSAW.MasterPiece.call(this)

    /** @type {RIPSAW.Bezier2D} */
  this.plan = new RIPSAW.Bezier2D(path).normalize()

    /** @type {RIPSAW.Bezier2D[]} */
  this.side = [
    new RIPSAW.Bezier2D().createDepthProfile(+(depth || 0.2) / 2, 3),
    new RIPSAW.Bezier2D().createDepthProfile(-(depth || 0.2) / 2, 3)
  ]

    /** @type {RIPSAW.Camera} */
  this.camera = new RIPSAW.Camera()

  return this
}

RIPSAW.Bezier3D.prototype = {

  set3DView: function () {
    this.plan.allow = this.side[0].allow = this.side[1].allow = {
      draw: false,
      edit: false
    }

    this.centroid = new RIPSAW.DragNode(0.5, 0.5)
    this.scale = 0.8

    return this
  },

  setAllView: function () {
        // set centroids
    this.centroid = new RIPSAW.DragNode(0.75, 0.4)
    this.plan.centroid = new RIPSAW.DragNode(0.25, 0.25)
    this.side[0].centroid = new RIPSAW.DragNode(0.25, 0.75)
    this.side[1].centroid = new RIPSAW.DragNode(0.25, 0.75)

        // set scale
    this.scale = 1
    this.plan.scale = this.side[0].scale = this.side[1].scale = 0.55

        // set
    this.allow = this.plan.allow = this.side[0].allow = this.side[1].allow = {
      draw: true,
      edit: true
    }

    this.allow.rotate = false

    return this
  },

  setPlanView: function () {
    this.allow = this.side[0].allow = this.side[1].allow = {
      draw: false,
      edit: false
    }

    this.plan.centroid = new RIPSAW.DragNode(0.5, 0.5)
    this.plan.scale = 1
  },

  get3DOutline: function (scaleFactor) {
    var i
    var j
    var max

    var profiles = [
      this.side[0].getSubdivision(RIPSAW.mesh.n2),
      this.side[1].getSubdivision(RIPSAW.mesh.n2)
    ]

    var points = [
      this.plan.getSubdivision(RIPSAW.mesh.n2), this.plan.getSubdivision(RIPSAW.mesh.n2)
    ]

    var pt
    var interp

    for (j = 0; j < 2; j += 1) {
      max = points[j].getPointCount()

      for (i = 0; i < max; i += 1) {
        pt = points[j].getPoint(i)

        interp = profiles[j].interpolateX(pt.x)[0]

        if (typeof interp !== 'undefined') {
          pt.z = interp.y / RIPSAW.rDim.depthScale
        }

        pt.project(this.camera).scale(scaleFactor || 1)
      }
    }

    return points
  },

  place3DIsoCurves: function (points, density) {
    var i
    var max = points[0].getPointCount()

    density = (typeof density !== 'undefined') ? density : 5

    RIPSAW.pen.configure('design iso')
    for (i = 0; i < max; i += density) {
      RIPSAW.pen.line(this.map(points[0].getPoint(i)), this.map(points[1].getPoint(i)))
    }
  },

  place3DOutline: function (points) {
    var i
    var max = points[0].getPointCount()

    for (i = 0; i < max - 1; i += 1) {
      RIPSAW.pen.line(this.map(points[0].getPoint(i)), this.map(points[0].getPoint(i + 1)))
      RIPSAW.pen.line(this.map(points[1].getPoint(i)), this.map(points[1].getPoint(i + 1)))
    }
  },

  draw3D: function () {
    var points

    if (this.allow.draw) {
      points = this.get3DOutline()

      RIPSAW.pen.configure('design outline')
      this.place3DOutline(points)

      RIPSAW.pen.configure('design iso')
      this.place3DIsoCurves(points)
    }
  },

  draw: function (camera) {
    if (this.allow.draw) {
      this.draw3D()
    }

    this.plan.draw()
    this.side[0].draw()
    this.side[1].draw()

    return this
  },

  mouseMove: function () {
    if (this.allow.rotate) {
      this.camera.mouseMove()
    }

    this.plan.mouseMove()
    this.side[0].mouseMove()
    this.side[1].mouseMove()
  },

  mouseUp: function () {
    if (this.allow.rotate) {
      this.camera.mouseUp()
    }

    this.plan.mouseUp()
    this.side[0].mouseUp()
    this.side[1].mouseUp()
  },

  mouseDown: function () {
    if (this.allow.rotate) {
      this.camera.mouseDown()
    }

    this.plan.mouseDown()
    this.side[0].mouseDown()
    this.side[1].mouseDown()
  },

  toSVG: function () {
    var result = ''
    var points = this.get3DOutline(100)
    var i
    var max = points[0].getPointCount()

    result += '\t' + points[0].toSVG() + '\n\t' + points[1].toSVG()

    result += '\n\t' + '<g>'

    for (i = 0; i < max; i += 5) {
      result += '\n\t\t' + new RIPSAW.Line(points[0].getPoint(i), points[1].getPoint(i)).toSVG()
    }

    result += '\n\t' + '</g>'

    return RIPSAW.textAssets.SVGHeader + '\n' + result + '\n' + RIPSAW.textAssets.SVGFooter
  },

  toRhinoPythonScript: function () {
    var innerScript = (

            this.plan.toRhinoPythonScript('plan', 1, true) +
            this.side[0].toRhinoPythonScript('profileTop', 2.1, false) +
            this.side[1].toRhinoPythonScript('profileBottom', 2.2, false)

        )

    return RIPSAW.textAssets.rhinoPythonScriptHeader + innerScript + RIPSAW.textAssets.rhinoPythonScriptFooter
  },

    /**
     * Updates display and permission information by stage.
     */
  stageUpdate: function () {
    var currentState = this.stageManager[RIPSAW.stage.no]

    if (typeof currentState !== 'undefined') {
      this.updateState(currentState.threeD)
      this.plan.updateState(currentState.plan)
      this.side[0].updateState(currentState.side)
      this.side[1].updateState(currentState.side)
    }
  }

}

RIPSAW.inheritPrototype(RIPSAW.MasterPiece, RIPSAW.Bezier3D)
