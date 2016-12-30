/** @namespace */
window.RIPSAW = {

    /**
     * Active drawing mode.
     * @memberof RIPSAW
     * @type {String}
     */
  mode: 'mode3',

    /**
     * Stores whether geometry has been modified since the model was initialized.
     * @memberof RIPSAW
     * @type {String}
     */
  isModified: false,

    /**
     * Timestamp at the beginning of a stage.
     * @memberof RIPSAW
     * @type {number}
     */
  time0: new Date().getTime(),

    /**
     * Time elapsed since the stage began.
     * @memberof RIPSAW
     * @type {number}
     */
  time: 0,

    /**
     * Refresh interval [ms].
     * @memberof RIPSAW
     * @type {number}
     */
  refreshInterval: 5,

    /** Controls animations speeds and delays (anim.speed and anim.delay). Values in [ms]. */
  anim: {
    speed: 2000,
    delay: 500
  },

    /**
     * Font.
     * @memberof RIPSAW
     * @type {String}
     */
  fonts: 'Monaco',

    /**
     * Hover tolerance (relative to screen dimensions).
     * @memberof RIPSAW
     * @type {number}
     */
  tolerance: 2e-2,

    /**
     * Number tolerance.
     * @memberof RIPSAW
     * @type {number}
     */
  delta: 1e-7,

    /**
     * Geometry tolerance (identical points).
     * @memberof RIPSAW
     * @type {number}
     */
  delta2: 1e-3,

    /**
     * Default radius of solid circles.
     * @memberof RIPSAW
     * @type {number}
     */
  defaultRadius: 5,

    /**
     * Display width settings.
     * @memberof RIPSAW
     * @type {Object}
     */
  wDisplay: {

    path: 1 / 200,
    navButton: 0.03,
    text: 1 / 80

  },

    /**
     * Real-world product dimensions.
     * @memberof RIPSAW
     * @type {Object}
     */
  rDim: {

    l: 150,
    w: 0,
    d: 3,
        /** how much depth profiles are scaled up for visibility */
    depthScale: 10

  },

    /**
     * Meshing parameters.
     * @memberof RIPSAW
     * @type {Object}
     */
  mesh: {

        /**
         * Spline subdivisions.
         * @memberof RIPSAW.mesh
         * @type {number}
         */
    n1: 100, // spline subdivisions

        /**
         * Depth profile subdivisions.
         * @memberof RIPSAW.mesh
         * @type {number}
         */
    n2: 30,

        /**
         * Number of control points in depth profile objects.
         * @memberof RIPSAW.mesh
         * @type {number}
         */
    nP: 3

  },

    /**
     * Design geometry.
     * @memberof RIPSAW
     * @type {Object}
     */
  masterPiece: {},

    /**
     * Padding.
     * @memberof RIPSAW
     * @type {number}
     */
  padding: 0

}
