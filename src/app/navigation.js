;(function (RIPSAW) {
/**
 * @class
 * @param {Object} navInfo Input object for navigation.
 */
  RIPSAW.Navigation = function (navInfo) {
    /**
     * Array of buttons.
     * @type {Array}
     */
    this.buttons = []

    /**
     * Array of button groups. A button group is an array of member indeces from buttons array.
     * @type {Array}
     */
    this.buttonGroups = []

    /**
     * Index of hovered menubutton.
     * @type {number}
     */
    this.hoverIndex = -1

    /**
     * Whether help text should be displayed.
     * @type {boolean}
     */
    this.displayHelp = true

    /**
     * Display x coordinate for help text (relative to W).
     * @type {number}
     */
    this.helpX = 0.5

    /**
     * Display y coordinate for help text (relative to H).
     * @type {number}
     */
    this.helpY = 0.5

    /**
     * Name of menubutton active by default.
     * @type {Array}
     */
    this.defaultMode = 'mode2'

    if (typeof navInfo !== 'undefined') {
      this.build(navInfo)
    }
  }

  RIPSAW.Navigation.prototype = {

    /**
     * Builds navigation from array of simplified menubutton constructor. See spec for example.
     */
    build: function (navInfo) {
      var i
      var max

      this.displayHelp = navInfo.displayHelp || true
      this.defaultMode = navInfo.defaultMode || 'mode2'
      this.helpX = navInfo.xHelp || 0.5
      this.helpY = navInfo.yHelp || 0.5

      this.buttons = []
      this.buttonGroups = []

      if (typeof navInfo !== 'undefined') {
        for (i = 0, max = navInfo.buttons.length; i < max; i += 1) {
          this.buttons.push(new RIPSAW.MenuButton(

                    navInfo.buttons[i].x,
                    navInfo.buttons[i].y,
                    navInfo.buttons[i].name,
                    navInfo.buttons[i].animate

                ))
        }

        this.buttonGroups = navInfo.buttonGroups || []
      }
    },

    /** Callback fired on mouse down. */
    mouseDown: function () {
      if (this.hoverIndex !== -1 && (typeof this.hoverIndex !== 'undefined')) {
        RIPSAW.allButtons[this.buttons[this.hoverIndex].name].onClick()
      }
    },

    /** Callback fired on mouse move. */
    mouseMove: function () {
      var i
      var max = this.buttons.length

      this.hoverIndex = -1

      for (i = 0; i < max; i += 1) {
            // check if the mouse is over the button
        if (this.buttons[i].isHovered()) {
          this.hoverIndex = i
          this.buttons[i].isActive = true
        } else {
          this.buttons[i].isActive = false
        }

            // if current active mode equals the name of the button, set back to active
        if (this.buttons[i].name === RIPSAW.mode) {
          this.buttons[i].isActive = true
        }
      }

      return this
    },

    /** Place buttons. */
    placeButtons: function () {
      var i
      var max = this.buttons.length

      for (i = 0; i < max; i += 1) {
        this.buttons[i].place()
      }

      return this
    },

    /** Place help. */
    placeHelp: function () {
      if (this.displayHelp && (this.hoverIndex !== -1)) {
        if (typeof this.buttons[this.hoverIndex] !== 'undefined') {
          RIPSAW.pen.write(
                    RIPSAW.allButtons[this.buttons[this.hoverIndex].name].helpText,
                    this.helpX, this.helpY, 1, 2, (this.buttons[this.hoverIndex].opacity - 0.4) / 0.6
                )
        }
      }

      return this
    },

    /**
     * Returns boundaries for button group.
     * @param {number} buttonGroupIndex - Index of button group.
     */
    getButtonGroupBoundaries: function (buttonGroupIndex) {
      var group = this.buttonGroups[buttonGroupIndex]
      var i
      var max = group.length
      var maxX = -5000
      var maxY = -5000
      var minX = +5000
      var minY = +5000
      var x
      var y

      for (i = 0; i < max; i++) {
        x = this.buttons[group[i]].x
        y = this.buttons[group[i]].y

        if (maxX < x) maxX = x
        if (maxY < y) maxY = y
        if (minX > x) minX = x
        if (minY > y) minY = y
      }

      return {
        min: new RIPSAW.Vector(minX, minY),
        max: new RIPSAW.Vector(maxX, maxY)
      }
    },

    /**
     * Places bounding box around button groups.
     * @returns {RIPSAW.Navigation} this
     */
    placeBoundingBoxes: function () {
      var i
      var max
      var v1
      var v2
      var boxDim
      var radius
      var bound

      for (i = 0, max = this.buttonGroups.length; i < max; i += 1) {
        bound = this.getButtonGroupBoundaries(i)
        v1 = bound.min
        v2 = bound.max.subtract(bound.min)
        boxDim = RIPSAW.wDisplay.navButton * RIPSAW.W * 1.3
        radius = 0.025 * RIPSAW.minWH
        RIPSAW.pen.boundingBox(
        RIPSAW.map(v1).subtract(new RIPSAW.Vector(boxDim / 2, boxDim / 2)),
        RIPSAW.map(v2).add(new RIPSAW.Vector(boxDim, boxDim)),
        radius
      )
      }

      return this
    },

    /**
     * Draw navigation.
     * @returns {RIPSAW.Navigation} this
     */
    draw: function () {
      this.placeButtons()
      this.placeHelp()
      RIPSAW.pen.configure('nav bounding box')
      this.placeBoundingBoxes()
    },

    /** Callback fired on stage change. */
    stageUpdate: function () {
      var stageInfo = this.stageManager[RIPSAW.stage.no]
      if (typeof stageInfo !== 'undefined') {
        this.build(stageInfo)
        RIPSAW.mode = this.defaultMode
      }
      return this
    }

  }

  RIPSAW.nav = new RIPSAW.Navigation()
}(window.RIPSAW))
