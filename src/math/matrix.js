;(function (RIPSAW) {
/**
 * @constructor
 * @param {number} rows - Number of rows.
 * @param {number} columns - Number of columns.
 */
  RIPSAW.Matrix = function (rows, columns) {
    /** @type {number} */
    this.n = rows || 2

    /** @type {number} */
    this.m = columns || 2

    /** @type {Array} */
    this.table = []

    for (var i = 0; i < this.n; i += 1) {
      this.table.push([])

      for (var j = 0; j < this.m; j += 1) {
        this.table[i].push(0)
      }
    }

    return this
  }

  RIPSAW.Matrix.prototype = {

    /**
     * Returns String representation.
     * @returns {String}
     */
    toString: function () {
      var s = 'Matrix ' + this.n + ' x ' + this.m + ''
      var i
      var j

      for (i = 0; i < this.n; i += 1) {
        s += '|'

        for (j = 0; j < this.m; j += 1) {
          s += ' ' + this.table[i][j] + ' '
        }

        s += '|'
      }

      return s
    },

    /**
     * Populates Matrix with an array of numbers (traversing to the right, then down).
     * @param {numbers} [args] List of numbers.
     * @returns {RIPSAW.Matrix} this
     */
    populate: function () {
      var i
      var max = arguments.length

      for (i = 0, max = arguments.length; i < max; i += 1) {
        this.table[Math.floor(i / this.m)][i % this.m] = arguments[i]
      }

      return this
    },

    /**
     * Returns determinant. Implemented for 2x2 only.
     * @returns {number} determinant
     */
    determinant: function () {
      var t = this.table

      if (this.n === 2 && this.m === 2) {
        return t[0][0] * t[1][1] - t[0][1] * t[1][0]
      }
    },

    /**
     * Returns Matrix inverse. Does not modify object! Implemented for 2x2 only.
     * @returns {RIPSAW.Matrix} inverse
     */
    inverse: function () {
      var det = this.determinant()
      var resultMatrix = new RIPSAW.Matrix(this.n, this.m)

      if (det === 0) return undefined

      if (this.n === 2 && this.m === 2) {
        resultMatrix.table[0][0] = +this.table[1][1] / det
        resultMatrix.table[1][0] = -this.table[1][0] / det
        resultMatrix.table[0][1] = -this.table[0][1] / det
        resultMatrix.table[1][1] = +this.table[0][0] / det
      }

      return resultMatrix
    },

    /**
     * Returns product with second matrix. Does not modify object!
     * @param {RIPSAW.Matrix} m2
     * @returns {RIPSAW.Matrix} mp
     */
    multiply: function (m2) {
      var i
      var j
      var i1
      var m1 = this
      var mp = new RIPSAW.Matrix(m1.n, m2.m)
      var value

      for (i = 0; i < m1.n; i += 1) {
        for (j = 0; j < m2.m; j += 1) {
          value = 0

          for (i1 = 0; i1 < m1.m; i1 += 1) {
            value += m1.table[i][i1] * m2.table[i1][j]
          }

          mp.table[i][j] = value
        }
      }

      this.n = mp.n
      this.m = mp.m

      this.table = []

      for (i = 0; i < this.n; i += 1) {
        this.table.push([])

        for (j = 0; j < this.m; j += 1) {
          this.table[i].push(mp.table[i][j])
        }
      }

      return this
    },

    /**
     * Returns deep copy.
     * @returns {RIPSAW.Matrix}
     */
    clone: function () {
      var i
      var j
      var m = new RIPSAW.Matrix(this.n, this.m)

      for (i = 0; i < this.n; i += 1) {
        for (j = 0; j < this.m; j += 1) {
          m.table[i][j] = this.table[i][j]
        }
      }

      return m
    }

  }
}(window.RIPSAW))
