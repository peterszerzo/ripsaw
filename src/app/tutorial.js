;(function (RIPSAW) {
/**
 * @namespace tutorial
 * @memberof RIPSAW
 */
  RIPSAW.tutorial = {

    /**
     * Start x-coordinate (Relative to W).
     * @memberof RIPSAW.tutorial
     * @type {number}
     */
    x: 0.5,

    /**
     * x-offset for subsequent tutorial texts.
     * @memberof RIPSAW.tutorial
     * @type {number}
     */
    dx: 0,

    /**
     * Start y-coordinate (Relative to H).
     * @memberof RIPSAW.tutorial
     * @type {number}
     */
    y: 0.75,

    /**
     * y-offset for subsequent tutorial texts.
     * @memberof RIPSAW.tutorial
     * @type {number}
     */
    dy: 0.05,

    /**
     * Array of texts to be displayed.
     * @memberof RIPSAW.tutorial
     * @type {Array}
     */
    text: [],

    /**
     * Place tutorial.
     * @memberof RIPSAW.tutorial
     */
    place: function () {
      var text = this.text
      var i
      var max = text.length
      if (typeof text !== 'undefined') {
        for (i = 0; i < max; i += 1) {
          RIPSAW.pen.write(this.text[i], this.x + i * this.dx, this.y + i * this.dy, 1, 2, 1)
        }
      }
    },

    /**
     * Callback fired on stage update.
     * @memberof RIPSAW.tutorial
     */
    stageUpdate: function () {
      this.text = this.stageManager[RIPSAW.stage.no]
    }

  }
}(window.RIPSAW))
