/**
 * @class
 * @param {number} x Display x coordinate, relative to canvas width.
 * @param {number} y Display y coordinate, relative to canvas height.
 * @param {String} name Button name.
 * @param {boolean} animate Display animation when new stage begins.
 */
RIPSAW.MenuButton = function (x, y, name, animate) {
    /** @type {String} */
  this.name = name

    /** @type {boolean} */
  this.isActive = false

    /**
     * Centroid x-coordinate, relative to W.
     * @type {number}
     */
  this.x = x

    /**
     * Centroid y-coordinate, relative to H.
     * @type {number}
     */
  this.y = y

    /**
     * Button width, relative to maxWH.
     * @type {number}
     */
  this.w = RIPSAW.wDisplay.navButton

    /**
     * Button height, relative to maxWH.
     * @type {number}
     */
  this.h = RIPSAW.wDisplay.navButton

    /**
     * Coefficient that controls opacity variations when button is hovered.
     * @type {number}
     */
  this.damping = 0.03

    /** @type {number} */
  this.opacity = 0.4

    /**
     * Target opacity of menubutton whether it is active or inactive.
     * @type {Object}
     */
  this.targetOpacity = {

    true: 1,
    false: 0.4

  }

    // if true, short animation is displayed to signal to the user that the button is new in the environment (new tutorial stage)
  this.animate = animate || false
}

RIPSAW.MenuButton.prototype = {

    /**
     * Returns whether button is hovered.
     * @returns {boolean}
     */
  isHovered: function () {
    var positionFromMouse = RIPSAW.mouse.positionTo(RIPSAW.map(this))

    return (Math.abs(positionFromMouse.x) < this.w * RIPSAW.maxWH / 2) && (Math.abs(positionFromMouse.y) < this.h * RIPSAW.W / 2)
  },

    /**
     * Changes display opacity towards corresponding targetOpacity value.
     * @returns {RIPSAW.MenuButton} this
     */
  setDisplayOpacity: function () {
    this.opacity += (this.targetOpacity[this.isActive] - this.opacity) * this.damping

    if (RIPSAW.ctx) {
      RIPSAW.ctx.globalAlpha = this.opacity
    }

    return this
  },

    /**
     * Animates marking circle around menubutton to show the user that it is new to the scene.
     * @returns {RIPSAW.MenuButton} this
     */
  animateMarkingCircle: function () {
    RIPSAW.ctx.globalAlpha = 1

    if (this.animate) {
      RIPSAW.pen.animateCircle(

                this,
                0.05, 0.12, 2, 0,
                RIPSAW.anim.delay, RIPSAW.anim.delay + 500

            )
    }

    return this
  },

    /**
     * Places button on screen.
     * @returns {RIPSAW.MenuButton} this
     */
  place: function () {
    this.setDisplayOpacity()

    RIPSAW.ctx.drawImage(

            RIPSAW.allButtons[this.name].image,

            RIPSAW.map(this).x - this.w * RIPSAW.maxWH / 2,
            RIPSAW.map(this).y - this.h * RIPSAW.maxWH / 2,

            this.w * RIPSAW.maxWH,
            this.h * RIPSAW.maxWH

        )

    this.animateMarkingCircle()

    return this
  }

}
