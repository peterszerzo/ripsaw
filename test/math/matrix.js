describe('Matrix', function () {
  describe('#constructor()', function () {
    it('initializes 2x2 matrix full of zeroes if no parameters are given', function () {
      var matrix = new RIPSAW.Matrix()
      expect(matrix.n).toEqual(2)
      expect(matrix.m).toEqual(2)
      expect(matrix.table[0][1]).toEqual(0)
    })
  })

  describe('#populate()', function () {
    it('populates matrix by row with the given arguments', function () {
      var matrix = new RIPSAW.Matrix(2, 2).populate(1, 2, 3, 4)

      expect(matrix.table[0][0]).toEqual(1)
      expect(matrix.table[0][1]).toEqual(2)
      expect(matrix.table[1][0]).toEqual(3)
      expect(matrix.table[1][1]).toEqual(4)
    })
  })

  describe('#determinant()', function () {
    it('returns the determinant of a 2x2 matrix', function () {
      var matrix = new RIPSAW.Matrix(2, 2).populate(1, 2, 3, 4)

      expect(matrix.determinant()).toEqual(-2)
    })
  })

  describe('#inverse()', function () {
    var matrix, matrixInverse

    it('returns undefined for a matrix with a determinant of zero', function () {
      matrix = new RIPSAW.Matrix(2, 2).populate(1, 0, 0, 0)
      matrixInverse = undefined
      expect(matrix.inverse()).toEqual(matrixInverse)
    })

    it('returns unit matrix for a unit matrix', function () {
      matrix = new RIPSAW.Matrix(2, 2).populate(1, 0, 0, 1)

      matrixInverse = new RIPSAW.Matrix(2, 2).populate(1, 0, 0, 1)

      expect(matrix.inverse().table[0][0]).toEqual(matrixInverse.table[0][0])
      expect(matrix.inverse().table[0][1]).toEqual(matrixInverse.table[0][1])
      expect(matrix.inverse().table[1][0]).toEqual(matrixInverse.table[1][0])
      expect(matrix.inverse().table[1][1]).toEqual(matrixInverse.table[1][1])
    })

    it('returns the inverse', function () {
      matrix = new RIPSAW.Matrix(2, 2).populate(1, 2, 3, 4)
      matrixInverse = new RIPSAW.Matrix(2, 2).populate(-2.0, +1.0, +1.5, -0.5)
      expect(matrix.inverse()).toEqual(matrixInverse)
    })
  })

  describe('#clone()', function () {
    var matrix

    it('creates a deep copy of the matrix', function () {
      matrix = new RIPSAW.Matrix(2, 2).populate(1, 2, 3, 4)
      expect(matrix.clone().table[0][0]).toEqual(+1)
    })
  })

  describe('#multiply()', function () {
    var matrix1,
      matrix2,
      matrixProduct,
      matrixProductCheck

    it('multiplies 2x2 matrices', function () {
      matrix1 = new RIPSAW.Matrix(2, 2).populate(1, 2, 3, 4),
            matrix2 = new RIPSAW.Matrix(2, 3).populate(1, 2, 3, 4, 5, 6),
            matrixProduct = matrix1.clone().multiply(matrix2),
            matrixProductCheck = new RIPSAW.Matrix(2, 3).populate(9, 12, 15, 19, 26, 33)

      expect(matrixProduct).toEqual(matrixProductCheck)
    })
  })
})
