;(function (RIPSAW) {
/** Assign touch handlers corresponding to mouse event handlers. */
  RIPSAW.touchHandler = function (event) {
    var touch = event.changedTouches[0]
    var simulatedEvent = document.createEvent('MouseEvent')

    simulatedEvent.initMouseEvent({

      touchstart: 'mousedown',
      touchmove: 'mousemove',
      touchend: 'mouseup'

    }[event.type], true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null)

    touch.target.dispatchEvent(simulatedEvent)

    return this
  }

/** Assigns touch handlers defined by RIPSAW.touchHandler. */
  RIPSAW.addTouchHandlers = function () {
    document.addEventListener('touchstart', this.touchHandler, true)
    document.addEventListener('touchmove', this.touchHandler, true)
    document.addEventListener('touchend', this.touchHandler, true)
    document.addEventListener('touchcancel', this.touchHandler, true)
    return this
  }

/** Creates and appends canvas element to container div (ID set to RIPSAW.canvas.id). */
  RIPSAW.createCanvas = function (node) {
    if (!this.container) {
      this.container = node
    }
    this.canvas = document.createElement('canvas')
    this.canvas.id = 'ripsaw-canvas'
    this.ctx = this.canvas.getContext('2d')
    this.ctx.lineCap = 'round'
    this.canvas.style.margin = 'auto'
    this.container.appendChild(this.canvas)
    return this
  }

/** Adds default mouse event listeners. To be replaced with mouse observer pattern. */
  RIPSAW.addDefaultEventListeners = function () {
    // add default mouse event listeners
    if (typeof this.mouseDown === 'undefined') {
      RIPSAW.mouseDown = function (e) {
        e.preventDefault()

        if (!e.which && e.button) {
          if (e.button & 1) {
            e.which = 1
          } else if (e.button & 4) {
            e.which = 2
          } else if (e.button & 2) {
            e.which = 3
          }
        }

        if (e.which === 1) {
          RIPSAW.mouse.update(e, 'down')
          RIPSAW.masterPiece.mouseDown()
        } else if (e.which === 3) {
          RIPSAW.masterPiece.mouseDownRight()
        }
      }
    }

    if (typeof this.mouseMove === 'undefined') {
      RIPSAW.mouseMove = function (e) {
        RIPSAW.mouse.update(e, 'move')
        RIPSAW.masterPiece.mouseMove()
      }
    }

    if (typeof this.mouseUp === 'undefined') {
      RIPSAW.mouseUp = function (e) {
        RIPSAW.mouse.update(e, 'up')
        RIPSAW.masterPiece.mouseUp()
      }
    }

    if (typeof this.keyPressed === 'undefined') {
      RIPSAW.keyPressed = function (e) {
        RIPSAW.masterPiece.keyPressed()
      }
    }

    this.canvas.addEventListener('mousedown', this.mouseDown)
    this.canvas.addEventListener('mousemove', this.mouseMove)
    this.canvas.addEventListener('mouseup', this.mouseUp)

    window.addEventListener('keypressed', this.keyPressed)

    return this
  }

/** Recalculates canvas width and height upon browser window resize. */
  RIPSAW.resize = function () {
    RIPSAW.W = RIPSAW.container.clientWidth - 2 * RIPSAW.padding
    RIPSAW.H = RIPSAW.container.clientHeight - 2 * RIPSAW.padding

    if (RIPSAW.W < 0 || RIPSAW.H < 0) {
      RIPSAW.W = 0
      RIPSAW.H = 0
      setTimeout(RIPSAW.resize, 200)
    }

    RIPSAW.minWH = Math.min(RIPSAW.W, RIPSAW.H)
    RIPSAW.maxWH = Math.max(RIPSAW.W, RIPSAW.H)

    RIPSAW.canvas.width = RIPSAW.W
    RIPSAW.canvas.height = RIPSAW.H

    return this
  }

/** Entry point */
  RIPSAW.render = function (masterPiece, node) {
    this.masterPiece = masterPiece
    this.createCanvas(node)
    this.isRunning = true
    this.isModified = false
    this.addDefaultEventListeners()
    this.addTouchHandlers()
    window.addEventListener('resize', RIPSAW.resize, false)
    this.resize()
    RIPSAW.resize()
    function draw () {
      if (!RIPSAW.isRunning) {
        return
      }
      window.requestAnimationFrame(draw)
      RIPSAW.resetCanvas()
      RIPSAW.masterPiece.draw()
    }
    draw()
    return this
  }

/** Sets basic drawing parameters. */
  RIPSAW.resetCanvas = function () {
    RIPSAW.ctx.fillStyle = RIPSAW.colors.get(0, 1)
    RIPSAW.pen.solidRect(0, 0, RIPSAW.W, RIPSAW.H)
    RIPSAW.ctx.textAlign = 'center'
    RIPSAW.ctx.textBaseline = 'middle'
    RIPSAW.time = new Date().getTime()
    return this
  }

  RIPSAW.tearDown = function () {
    this.isRunning = false
    this.canvas.parentNode.removeChild(this.canvas)
    return this
  }
}(window.RIPSAW))
