;(function (RIPSAW) {
/**
 * @constructor
 * @param {String} path - SVG path, e.g. "M10,10C20,20,30,30z"
 */
  RIPSAW.BezierSVGPath = function (path) {
    this.raw = path // raw svg path

    return this
  }

  RIPSAW.BezierSVGPath.prototype = {

    /**
     * Separates SVG path into an array of numbers and letters (e.g. c, s, l, C, S, L, z).
     * @returns {Array} result - Array of characters and numbers.
     */
    chop: function () {
      var i
      var path = this.raw
      var max = this.raw.length
      var c = ''
      var s = ''
      var result

      result = []

      for (i = 0; i < max; i += 1) {
        c = path.charAt(i)

        if (/[mMcCsSz]/.test(c)) {
          if (s !== '') {
            result.push(parseFloat(s))
          }

          result.push(c)

          s = ''
        } else if (c === ',') {
          if (s !== '') {
            result.push(parseFloat(s))
          }

          s = ''
        } else if (c === '-') {
          if (s !== '') {
            result.push(parseFloat(s))
          }

          s = '-'
        } else {
          s = s + c
        }
      }

      if (s !== '') {
        result.push(parseFloat(s))
      }

      return result
    },

    /**
     * Packages x-y coordinate pairs into vectors.
     * @returns {Array} result - Array of characters and RIPSAW.Vector objects.
     */
    vectorize: function () {
      var processed = this.chop()
      var result = []
      var i
      var max = processed.length
      var x
      var y
      var c
      var numberCounter = 0

      for (i = 0; i < max; i += 1) {
        c = processed[i]

        if (/[mMcCsSz]/.test(c)) {
          result.push(c)
        } else {
          if (numberCounter % 2 === 0) {
            x = c
          } else {
            y = c
            result.push(new RIPSAW.Vector(x, y))
          }

          numberCounter += 1
        }
      }

      return result
    },

    /**
     * Turns all coordinate references in SVG path into absolute (s -> S, c -> C). Modifies coordinates accordingly.
     * @returns {Array} result - Array of characters and RIPSAW.Vector objects.
     */
    absolutize: function () {
      var processed = this.vectorize()
      var i
      var i0 = -1
      var max = processed.length

      for (i = 0; i < max; i += 1) {
        if (/[cs]/.test(processed[i])) {
          i0 = i
          processed[i] = processed[i].toUpperCase()
        } else if (/[CS]/.test(processed[i])) {
          i0 = -1
        } else if (i0 !== -1) {
          processed[i].add(processed[i0 - 1])
        }
      }

      return processed
    },

    /**
     * Eliminates symmetric control handle shortcuts in SVG path.
     * @returns {Array} result - Array of characters and RIPSAW.Vector objects.
     */
    ridS: function () {
      var i
      var processed = this.absolutize()
      var max = processed.length
      var result = []

      for (i = 0; i < max; i += 1) {
        if (processed[i] === 'S') {
          result.push('C')

          result.push(processed[i - 1].clone().scale(2).subtract(processed[i - 2]))
        } else {
          result.push(processed[i])
        }
      }

      return result
    },

    /**
     * Converts into an array of Bezier Handles.
     * @param {boolean} [isClosed=true] - True of curve is closed.
     * @param {Array} bnodes - Array of RIPSAW.BezierHandle objects.
     */
    toBezierHandles: function (isClosedArg) {
      var isClosed
      var processed = this.ridS()
      var i
      var max = processed.length
      var p1
      var p2
      var p3
      var bnodes = []

      if (typeof isClosedArg === 'undefined') {
        isClosed = true
      }

      for (i = 2; i < max - 1; i += 1) {
        if (processed[i] === 'C') {
          if (i === 2 && isClosed) {
 // edge case 1: if the curve is closed, the left handle end of the first handle is specified at the end of the SVG path

            p1 = processed[max - 3]
          } else if (i === 2 && !isClosed) {
            p1 = processed[i - 1] // edge case 2: is the curve is not closed, p1 and p2 should be identical
          } else {
            p1 = processed[i - 2] // ordinary case
          }

          p2 = processed[i - 1]
          p3 = processed[i + 1]

          bnodes.push(new RIPSAW.BezierHandle(p1, p2, p3))
        }
      }

        // add last point if curve is not closed
      if (!isClosed) {
        p1 = processed[max - 2]
        p2 = processed[max - 1]
        p3 = processed[max - 1]

        bnodes.push(new RIPSAW.BezierHandle(p1, p2, p3))
      }

      return bnodes
    }

  }
}(window.RIPSAW))
