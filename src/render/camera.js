;(function (RIPSAW) {
/**
 * @constructor
 * @param {number} [r=1] - Radial distance from source (cylindrical coordinate).
 * @param {number} [theta=pi/3] - Horizontal rotation (cylindrical coordinate).
 * @param {number} [phi=-pi/4] - Vertical rotation (cylindrical coordinate).
 * @param {number} [f=0.6] - Focal length.
 */
  RIPSAW.Camera = function (r, theta, phi, f) {
    this.r = this.rT = (typeof r !== 'undefined') ? r : 1
    this.theta = this.thetaT = (typeof theta !== 'undefined') ? theta : (Math.PI / 3)
    this.phi = this.phiT = (typeof phi !== 'undefined') ? phi : (-Math.PI / 4)
    this.f = (typeof f !== 'undefined') ? f : (0.6) // focal length

    this.eye = new RIPSAW.Vector()

    // Local axes
    this.v1 = new RIPSAW.Vector(1, 0, 0) // in view direction
    this.v2 = new RIPSAW.Vector(0, 1, 0) // prependicular to view direction, in the horizontal plane
    this.v3 = new RIPSAW.Vector(0, 0, 1) // prependicular to view direction, in the vertical plane

    this.buildEye()

    return this
  }

  RIPSAW.Camera.prototype = {

    /** Calculate position and orientation of the camera. */
    buildEye: function () {
        // Calculate camera position (polar -> cartesian).
      this.eye = new RIPSAW.Vector(

            this.rT * Math.cos(this.thetaT) * Math.cos(this.phiT),
            this.rT * Math.sin(this.thetaT) * Math.cos(this.phiT),
            this.rT * Math.sin(this.phiT)

        ).normalize()

        // Establishes local axes -> all normalized
      this.v1 = this.eye.clone().scale(-1)
      this.v2 = this.v1.clone().crossMultiply(new RIPSAW.Vector(0, 0, 1)).normalize()
      this.v3 = this.v2.clone().crossMultiply(this.v1)

      return this
    },

    /**
     * Update permanent spherical coordinates to temporary ones.
     * @returns {RIPSAW.Camera} this
     */
    update: function () {
      this.r = this.rT
      this.theta = this.thetaT
      this.phi = this.phiT

      return this
    },

    /**
     * Revert temporary spherical coordinates to permanent ones.
     * @returns {RIPSAW.Camera} this
     */
    revert: function () {
      this.rT = this.r
      this.thetaT = this.theta
      this.phiT = this.phi

      this.buildEye()

      return this
    },

    /**
     * Project point onto camera. Does not modify point!
     * @param {RIPSAW.Vector} p - Point to project.
     * @param {RIPSAW.Vector} projection
     */
    project: function (p) {
      var xProject
      var yProject
      var zProject
      var direction = this.eye.clone().subtract(p)

        // Calculate position in the local axis of the camera.
      xProject = direction.dotProduct(this.v2)
      yProject = direction.dotProduct(this.v3)
      zProject = direction.dotProduct(this.v1)

      return new RIPSAW.Vector(

            xProject * this.f / zProject,
            yProject * this.f / zProject,
            0

        )
    },

    /**
     * Constrain view height <=> phi between +80 and -80 degrees.
     * @returns {RIPSAW.Camera} this
     */
    constrainViewHeight: function () {
      var phiMax = 80 * Math.PI / 180

      if (this.phiT < -phiMax) this.phiT = -phiMax
      if (this.phiT > +phiMax) this.phiT = +phiMax

      return this
    },

    /**
     * Sets offset between temporary and permanent spherical coordinates based on mouse displacements.
     * @returns {RIPSAW.Camera} this
     */
    setDrag: function () {
      var drag = RIPSAW.mouse.getDrag()

      this.thetaT = this.theta - drag.x / RIPSAW.minWH * 2
      this.phiT = this.phi - drag.y / RIPSAW.minWH * 2

      return this
    },

    /** Callback executed on mouseDrag. */
    mouseDrag: function () {
      this.setDrag().constrainViewHeight().buildEye()

      return this
    },

    /** Callback executed on mouseMove. */
    mouseMove: function () {
      if (RIPSAW.mode === '3dpreview' && RIPSAW.mouse.isDragging) {
        this.setDrag().constrainViewHeight().buildEye()
      }

      return this
    },

    /** Callback executed on mouseUp. */
    mouseUp: function () {
      this.update()

      return this
    },

    /** Callback executed on mouseDown. */
    mouseDown: function () {
      return this
    }

  }
}(window.RIPSAW))
