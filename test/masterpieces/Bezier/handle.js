describe('BezierHandle', function () {
  describe('#getHandleLengths()', function () {
    it('gets handle lengths', function () {
      var h = new RIPSAW.BezierHandle(

                new RIPSAW.Vector(0, 0),
                new RIPSAW.Vector(2, 2),
                new RIPSAW.Vector(4, 4)

            )

      expect(RIPSAW.areNearEqual(h.getHandleLengths().perm[0], 2 * Math.sqrt(2))).toEqual(true)

      h.p[0].setDrag(new RIPSAW.Vector(0, 2))

      expect(RIPSAW.areNearEqual(h.getHandleLengths().temp[0], 2)).toEqual(true)
    })
  })

  describe('#setHandleLengths()', function () {
    it('sets and preserves handle lengths', function () {
      var h = new RIPSAW.BezierHandle(

                new RIPSAW.Vector(0, 0),
                new RIPSAW.Vector(2, 2),
                new RIPSAW.Vector(4, 4)

            )

            // set handle 0 to length 1
      h.setHandleLength(0, 2)
      expect(h.p[0].temp.isNearEqualTo(RIPSAW.Vector(2 - Math.sqrt(2), 2 - Math.sqrt(2)))).toEqual(true)

      h.setHandleLength(0, 0)
      expect(h.p[0].temp.isNearEqualTo(new RIPSAW.Vector(2, 2))).toEqual(true)
    })
  })

  describe('#setDrag()', function () {
    var h

    beforeEach(function () {
      h = new RIPSAW.BezierHandle(

                new RIPSAW.Vector(0, 0),
                new RIPSAW.Vector(2, 2),
                new RIPSAW.Vector(4, 4)

            )

            // drag is applied on the first node
      h.hoverType = 0
    })

    it('only affects modified handle for mode 1', function () {
      RIPSAW.mode = 'mode1'

      h.setDrag(new RIPSAW.Vector(1, 1.5))
      expect(h.p[0].temp.isNearEqualTo(RIPSAW.Vector(1, 1.5))).toEqual(true)
      expect(h.p[1].temp.isNearEqualTo(RIPSAW.Vector(2, 2))).toEqual(true)
      expect(h.p[2].temp.isNearEqualTo(RIPSAW.Vector(4, 4))).toEqual(true)
    })

    it('changes direction, but not length of other node for mode 2', function () {
      RIPSAW.mode = 'mode2'

      h.setDrag(new RIPSAW.Vector(1, 1))
      expect(h.p[0].temp.isNearEqualTo(RIPSAW.Vector(1, 1))).toEqual(true)
      expect(h.p[1].temp.isNearEqualTo(RIPSAW.Vector(2, 2))).toEqual(true)
      expect(h.p[2].temp.isNearEqualTo(RIPSAW.Vector(4, 4))).toEqual(true)
    })

    it('changes direction, but not length of other node for mode 2', function () {
      h.setDrag(new RIPSAW.Vector(0, 2))
      expect(h.p[0].temp.isNearEqualTo(RIPSAW.Vector(0, 2))).toEqual(true)
      expect(h.p[1].temp.isNearEqualTo(RIPSAW.Vector(2, 2))).toEqual(true)
      expect(h.p[2].temp.isNearEqualTo(RIPSAW.Vector(2 + 2 * Math.sqrt(2), 2))).toEqual(true)
    })

    it('changes both length and direction of the other node for mode 3', function () {
      RIPSAW.mode = 'mode3'

      h.setDrag(new RIPSAW.Vector(1, 0))
      expect(h.p[0].temp.isNearEqualTo(RIPSAW.Vector(1, 0))).toEqual(true)
      expect(h.p[1].temp.isNearEqualTo(RIPSAW.Vector(2, 2))).toEqual(true)
      expect(h.p[2].temp.isNearEqualTo(RIPSAW.Vector(3, 4))).toEqual(true)
    })
  })
})
