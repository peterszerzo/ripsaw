;(function (RIPSAW) {
/**
 * @namespace colors
 * @memberof RIPSAW
 */
  RIPSAW.colors = {

    /**
     * Color scheme as object of [r, g, b] arrays (see code comments).
     * @type {Object}
     * @memberof RIPSAW.colors
     */
    schemes: {
        // purple scheme
      purple: [
            [61, 56, 79], // 0: background
            [247, 141, 52], // 1: title
            [203, 168, 114], // 2: subtitle
            [61, 103, 196], // 3: misc text
            [95, 52, 247], // 4: control handle endpoints
            [61, 103, 196], // 5: control handle midpoint
            [95, 90, 113], // 6: nav bounding boxes
            [255, 255, 255] // 7: curve strokes
      ],
        // black and white scheme
      bw: [
            [255, 255, 255],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
      ]
    },

    /**
     * Key of active color scheme.
     * @type {String}
     * @memberof RIPSAW.colors
     */
    activeScheme: 'purple',

    /**
     * Returns color from colorscheme.
     * @param {number} index
     * @param {number} opacity
     */
    get: function (index, opacity) {
      var aSchI = this.schemes[this.activeScheme][index]

      return 'rgba(' + aSchI[0] + ',' + aSchI[1] + ',' + aSchI[2] + ',' + (opacity) + ')'
    },

    /**
     * Returns color between two colors corresponding to two indeces.
     * @param {number} index1 - Start color.
     * @param {number} index2 - End color.
     * @param {number} s - Parameter (0 at start, 1 at end).
     * @param {number} opacity
     * @returns {String} color - JavaScript 'rgba( , , , )' representation.
     */
    getBetween: function (index1, index2, s, opacity) {
      var aSch = this.schemes[this.activeScheme]
      var color = [
        aSch[index1][0] * s + aSch[index2][0] * (1 - s),
        aSch[index1][1] * s + aSch[index2][1] * (1 - s),
        aSch[index1][2] * s + aSch[index2][2] * (1 - s)
      ]

      return 'rgba(' + Math.round(color[0]) + ',' + Math.round(color[1]) + ',' + Math.round(color[2]) + ',' + opacity + ')'
    }

  }
}(window.RIPSAW))
