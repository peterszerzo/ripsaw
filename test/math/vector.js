describe('Vector', function () {
  describe('#log', function () {
    it('should display two decimal places by default', function () {
      expect(new RIPSAW.Vector(1.2, 2.001, 3).log()).toEqual('x: 1.20 | y: 2.00 | z: 3.00')
    })

    it('should display the specified number of decimal places', function () {
      expect(new RIPSAW.Vector(1.2, 2.001, 3).log(3)).toEqual('x: 1.200 | y: 2.001 | z: 3.000')
    })
  })

  describe('#scale', function () {
    it('should scale vector by a factor', function () {
      expect(new RIPSAW.Vector(1, 2, 3).scale(2)).toEqual(new RIPSAW.Vector(2, 4, 6))
    })
  })

  describe('#add', function () {
    it('should add vector', function () {
      expect(new RIPSAW.Vector(1, 2, 3).add(new RIPSAW.Vector(1, 0, 1))).toEqual(new RIPSAW.Vector(2, 2, 4))
    })
  })

  describe('#getDistanceTo', function () {
    it('should calculate distance to another vector', function () {
      expect(new RIPSAW.Vector(1, 2, 3).getDistanceTo(new RIPSAW.Vector(2, 1, 3))).toEqual(Math.pow(2, 0.5))
    })
  })

  describe('#getManhattanDistanceTo', function () {
    it('should calculate the Manhattan distance to another vector', function () {
      expect(new RIPSAW.Vector(1, 2, 3).getManhattanDistanceTo(new RIPSAW.Vector(2, 1, 8))).toEqual(7)
    })
  })

  describe('#swapYZ', function () {
    it('should swap the y and z coordinates of a vector', function () {
      expect(new RIPSAW.Vector(5, 0, 12).swapYZ()).toEqual(new RIPSAW.Vector(5, 12, 0))
    })
  })

  describe('#product', function () {
    it('should componentwise multiply with argument vector', function () {
      expect(new RIPSAW.Vector(5, 0, 12).product(new RIPSAW.Vector(0, 0, 1))).toEqual(new RIPSAW.Vector(0, 0, 12))
    })
  })

  describe('#normalize', function () {
    it('should normalize vector', function () {
      expect(new RIPSAW.Vector(5, 0, 12).normalize()).toEqual(new RIPSAW.Vector(5 / 13, 0, 12 / 13))
    })

    it('should not modify (0, 0, 0) vector', function () {
      expect(new RIPSAW.Vector(0, 0, 0).normalize()).toEqual(new RIPSAW.Vector(0, 0, 0))
    })
  })

  describe('#dotProduct', function () {
    it('should calculate the dot product with argument vector', function () {
      expect(new RIPSAW.Vector(1, 2, 3).dotProduct(new RIPSAW.Vector(-2, 1, 0))).toEqual(0)
    })
  })

  describe('#crossProduct', function () {
    it('should calculate the cross product with argument vector', function () {
      expect(new RIPSAW.Vector(1, 2, 3).crossMultiply(new RIPSAW.Vector(-2, 1, 0))).toEqual(new RIPSAW.Vector(-3, -6, 5))
    })
  })

  describe('#isNearEqualTo', function () {
    it('returns true if all components are within tolerance value delta', function () {
      expect(new RIPSAW.Vector(1, 2, 3).isNearEqualTo(new RIPSAW.Vector(1 + 0.9 * RIPSAW.delta, 2, 3))).toEqual(true)
    })

    it('returns false if all components are not within tolerance value delta', function () {
      expect(new RIPSAW.Vector(1, 2, 3).isNearEqualTo(new RIPSAW.Vector(1 + 1.1 * RIPSAW.delta, 2, 3))).toEqual(false)
    })
  })

  describe('#toRhinoPythonScript()', function () {
    it('should return Rhino PythonScript export', function () {
      expect(new RIPSAW.Vector(1, 2, 3).toRhinoPythonScript()).toEqual('[1.00,2.00,3.00]')
    })
  })
})
