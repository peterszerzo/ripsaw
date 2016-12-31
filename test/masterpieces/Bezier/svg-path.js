describe('BezierSVGPath', function () {
  var path

  describe('#chop()', function () {
    it('chops up svg string', function () {
      path = 'M10,10C20,20,30,30,40,40'

            // <=> moveTo(10, 10); bezierCurveTo(20, 20, 30, 30, 40, 40)

      expect(new RIPSAW.BezierSVGPath(path).chop())
                .toEqual(['M', 10, 10, 'C', 20, 20, 30, 30, 40, 40])
    })
  })

  describe('#vectorize()', function () {
    it('packages x-y coordinates into vector objects', function () {
      path = 'M10,10C20,20,30,30,40,40'

      expect(new RIPSAW.BezierSVGPath(path).vectorize())
                .toEqual(['M', new RIPSAW.Vector(10, 10), 'C', new RIPSAW.Vector(20, 20), new RIPSAW.Vector(30, 30), new RIPSAW.Vector(40, 40)])
    })
  })

  describe('#absolutize()', function () {
    it('gets rid of relative references - vectors', function () {
            // x1, y1 c x2, y2, x3, y3
            //   <=>
            // x1, y1 C (x1 + x2), (y1 + y2), (x1 + x3), (y1 + y3)

      path = 'M10,10c20,20,30,30,40,40'

      expect(new RIPSAW.BezierSVGPath(path).absolutize())
                .toEqual(['M', new RIPSAW.Vector(10, 10), 'C', new RIPSAW.Vector(30, 30), new RIPSAW.Vector(40, 40), new RIPSAW.Vector(50, 50)])
    })
  })

  describe('#ridS()', function () {
    it('gets rid of symmetric handle simplifiers (S)', function () {
            // x1, y1, x2, y2 S x3, y3, x4, y4
            //   <=>
            // x1, y1, x2, y2 C x12, y12, x3, y3, x4, y4
            //     x12 = 2 * x2 - x1
            //     y12 = 2 * y2 - y1

      path = 'M5,0,10,10S20,20,30,30'

      expect(
                new RIPSAW.BezierSVGPath(path).ridS())
                .toEqual(
                    ['M', new RIPSAW.Vector(5, 0), new RIPSAW.Vector(10, 10), 'C', new RIPSAW.Vector(15, 20), new RIPSAW.Vector(20, 20), new RIPSAW.Vector(30, 30)]
            )
    })
  })
})
