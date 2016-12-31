describe('MenuButton', function () {
  var mb

  beforeEach(function () {
    mb = new RIPSAW.MenuButton(0.5, 0.3, 'button', true)
    mb.w = 0.01
    mb.h = 0.02

    RIPSAW.W = 1000
    RIPSAW.H = 500
    RIPSAW.minWH = 500
    RIPSAW.maxWH = 1000

    mb.targetOpacity = {

      true: 1,
      false: 0.2

    }

    mb.damping = 0.05
  })

  describe('#isHovered()', function () {
    it('returns true when the nav button is hovered', function () {
            // mock mouse position to menubutton function
      RIPSAW.mouse.positionTo = function () {
        return new RIPSAW.Vector(4, -9)
      }

            // menubutton centered at (0.5 * 1000, 0.3 * 500) = (500, 150)
            // half-width is 0.01 * 1000 / 2 = 5 (measured relative to maxWH)
            // half-height is 0.02 * 1000 / 2 = 10 (measured relative to maxWH)

      expect(mb.isHovered()).toEqual(true)
    })

    it('returns false when the nav button is not hovered', function () {
            // mock mouse position to menubutton function
      RIPSAW.mouse.positionTo = function () {
        return new RIPSAW.Vector(4, -11)
      }

      expect(mb.isHovered()).toEqual(false)
    })
  })

  describe('#setDisplayOpacity()', function () {
    it('increases opacity in each timestep when menubutton is active', function () {
      mb.opacity = 0.5

      mb.isActive = true

      mb.setDisplayOpacity()

      expect(mb.opacity).toEqual(0.5 + (1 - 0.5) * 0.05)
    })
  })

  describe('#setDisplayOpacity()', function () {
    it('decreases opacity in each timestep when menubutton is active', function () {
      mb.opacity = 0.5

      mb.isActive = false

      mb.setDisplayOpacity()

      expect(mb.opacity).toEqual(0.5 + (0.2 - 0.5) * 0.05)
    })
  })
})
