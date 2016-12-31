describe('Camera', function () {
  var camTopView, camXView, camXY45View

  beforeEach(function () {
    camTopView = new RIPSAW.Camera(1, 0, Math.PI / 2)
    camXView = new RIPSAW.Camera(1, 0, 0)
    camXY45View = new RIPSAW.Camera(1, Math.PI / 4, 0)
  })

  describe('#buildEye()', function () {
    it('sets eye to +z if top view is set', function () {
      expect(camTopView.eye.isNearEqualTo(new RIPSAW.Vector(0, 0, 1))).toEqual(true)
    })

    it('sets view direction to -z if top view is set', function () {
      expect(camTopView.v1.isNearEqualTo(new RIPSAW.Vector(0, 0, -1))).toEqual(true)
    })

    it('sets eye to +x if x side view is set', function () {
      expect(camXView.eye.isNearEqualTo(new RIPSAW.Vector(1, 0, 0))).toEqual(true)
    })

    it('sets view direction to -x if x side view is set', function () {
      expect(camXView.v1.isNearEqualTo(new RIPSAW.Vector(-1, 0, 0))).toEqual(true)
    })
  })

  describe('#project', function () {
    it('projects origin to origin if top view is set', function () {
      expect(camTopView.project(new RIPSAW.Vector(0, 0, 0)).isNearEqualTo(new RIPSAW.Vector(0, 0, 0))).toEqual(true)
    })
  })
})
