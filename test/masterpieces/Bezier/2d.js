describe('Bezier2D', function() {
  var obj

  describe('#moveGeometry()', function() {
    it('moves all control points by specified coordinates', function() {
      obj = new RIPSAW.Bezier2D([

        new RIPSAW.BezierHandle(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(0, 0), new RIPSAW.Vector(2, 2)),

        new RIPSAW.BezierHandle(new RIPSAW.Vector(3, 2), new RIPSAW.Vector(5, 0), new RIPSAW.Vector(5, 0))

      ])

      obj.moveGeometry(new RIPSAW.Vector(1, 1))

      expect(obj.control[0].p[0].temp).toEqual(new RIPSAW.Vector(1, 1))
    })
  })

  describe('#scaleGeometry()', function() {
    it('scales all control points with respect to the origin by a specified factor', function() {
      obj = new RIPSAW.Bezier2D([

        new RIPSAW.BezierHandle(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(0, 0), new RIPSAW.Vector(2, 2)),

        new RIPSAW.BezierHandle(new RIPSAW.Vector(3, 2), new RIPSAW.Vector(5, 0), new RIPSAW.Vector(5, 0))

      ])

      obj.scaleGeometry(3)

      expect(obj.control[0].p[0].temp).toEqual(new RIPSAW.Vector(0, 0))
      expect(obj.control[0].p[2].temp).toEqual(new RIPSAW.Vector(6, 6))
    })
  })

  describe('#getPoint()', function() {
    beforeEach(function() {
      obj = new RIPSAW.Bezier2D([

        new RIPSAW.BezierHandle(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(0, 0), new RIPSAW.Vector(2, 2)),

        new RIPSAW.BezierHandle(new RIPSAW.Vector(3, 2), new RIPSAW.Vector(5, 0), new RIPSAW.Vector(5, 0))

      ])
    })

    it('gets start point', function() {
      expect(obj.getPoint(0, 0)).toEqual(new RIPSAW.Vector(0, 0))
    })

    it('gets endpoint', function() {
      expect(obj.getPoint(0, 1)).toEqual(new RIPSAW.Vector(5, 0))
    })

    it('gets midpoint', function() {
      // x = (0.5^3) * 0 + (3 * 0.5^3) * 2 + (3 * 0.5^3) * 3 + (0.5^3) * 5 = 5 * (3/8 + 1/8) = 5/2
      // y = (0.5^3) * 0 + (3 * 0.5^3) * 2 + (3 * 0.5^3) * 2 + (0.5^3) * 0 = 3/2
      expect(obj.getPoint(0, 0.5)).toEqual(new RIPSAW.Vector(2.5, 1.5))
    })
  })

  describe('#subdivision()', function() {
    beforeEach(function() {
      obj = new RIPSAW.Bezier2D([

        new RIPSAW.BezierHandle(new RIPSAW.Vector(-1, 0), new RIPSAW.Vector(0, 0), new RIPSAW.Vector(1, 0)),

        new RIPSAW.BezierHandle(new RIPSAW.Vector(4, 0), new RIPSAW.Vector(5, 0), new RIPSAW.Vector(6, 0))

      ])

      obj.control[0].n = 5
    })

    it('gets start point', function() {
      expect(obj.getSubdivision().getPoint(0)).toEqual(new RIPSAW.Vector(0, 0, 0))
    })

    it('gets intermediate point', function() {
      expect(obj.getSubdivision().getPoint(2)).toEqual(new RIPSAW.Vector(2.5, 0, 0))
    })
  })

  describe('#stageUpdate()', function() {
    it('updates view information for new stage', function() {
      expect(0).toEqual(0)
    })
  })
})
