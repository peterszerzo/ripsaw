;(function (RIPSAW) {
/**
 * Returns whether two numbers are nearly equal (RIPSAW.delta).
 * @param {number} n1 - First number.
 * @param {number} n2 - Second number.
 * @param {number} [delta] - Overrides globla delta definition.
 * @returns {boolean}
 */
  RIPSAW.areNearEqual = function (n1, n2, deltaArg) {
    var delta = (typeof deltaArg === 'undefined') ? RIPSAW.delta : deltaArg

    return Math.abs(n1 - n2) < delta
  }

/**
 * Maps vector to canvas dimensions.
 * @param {RIPSAW.Vector} p
 * @returns {RIPSAW.Vector}
 */
  RIPSAW.map = function (p) {
    return new RIPSAW.Vector(p.x * RIPSAW.W, p.y * RIPSAW.H, 0)
  }

/**
 * Calculates sine wave evolution in a given timeframe.
 * @param {number} time
 * @param {number} period
 * @param {number} [startPhase=0]
 * @param {number} [startTime=0]
 * @param {number} [endTime=10000]
 * @returns {number}
 */
  RIPSAW.sineAnimate = function (time, period, startPhase, startTime, endTime) {
    var t

    if ((RIPSAW.time - RIPSAW.time0) < startTime) {
      t = 0
    } else if ((RIPSAW.time - RIPSAW.time0) > endTime) {
      t = endTime - startTime
    } else {
      t = (RIPSAW.time - RIPSAW.time0) - startTime
    }

    return Math.sin(t / period * 2 * Math.PI + startPhase)
  }
}(window.RIPSAW))
