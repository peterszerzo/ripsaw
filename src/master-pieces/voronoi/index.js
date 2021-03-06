;(function (RIPSAW) {
/**
 * @constructor
 * @extends RIPSAW.masterPiece
 *
 */
  RIPSAW.Voronoi = function () {
    // classical inheritance - prototype is inherited after subclass prototype is set
    RIPSAW.MasterPiece.call(this)

    this.nodes = []

    this.links = []

    // wavefront expansion, Robert Goerke + Alexander Wolff article, Uni Karlsruhe
    this.wave = RIPSAW.voronoiWave()

    this.waveFront = RIPSAW.voronoiWaveFront(this.control)

    return this
  }

  RIPSAW.Voronoi.prototype = {

    /**
     * Adds control node.
     * @param {RIPSAW.Vector} pt
     * @returns {RIPSAW.Voronoi} this
     */
    addControlPoint: function (pt) {
      this.control.push(new RIPSAW.DragNode(pt.x || 0, pt.y || 0))

      return this
    },

    /**
     * Creates rectangular control point grid. Does not delete previous control points.
     * @param {number} a - Width.
     * @param {number} b - Height.
     * @param {number} na - Number of points along x axis.
     * @param {number} nb - Number of points along y axis.
     */
    createRectangularGrid: function (a, b, na, nb) {
      var i
      var j

      for (i = 0; i < na; i += 1) {
        for (j = 0; j < nb; j += 1) {
          this.addControlPoint(new RIPSAW.Vector(i * a / (na - 1), j * b / (nb - 1), 0))
        }
      }

      return this
    },

    /**
     * Creates random grid within (-0.5, -0.5) - (+0.5, +0.5) square.
     * @param {number} n - Number of control points.
     * @returns {RIPSAW.Voronoi} this
     */
    createIrregularGrid: function (n) {
      var i

      for (i = 0; i < n; i += 1) {
        this.addControlPoint({
          x: Math.random() - 0.5,
          y: Math.random() - 0.5
        })
      }

      return this
    },

    /**
     * Returns bounding rectangle in a {min: , max: } object format.
     * @returns {Object}
     */
    getBoundingRectangle: function () {
      var maxX = -5000
      var maxY = -5000
      var minX = +5000
      var minY = +5000
      var i
      var max = this.control.length
      var ctrl

      for (i = 0; i < max; i += 1) {
        ctrl = this.control[i].temp
        maxX = Math.max(maxX, ctrl.x)
        minX = Math.min(minX, ctrl.x)
        maxY = Math.max(maxY, ctrl.y)
        minY = Math.min(minY, ctrl.y)
      }

      return {
        min: new RIPSAW.Vector(minX, minY),
        max: new RIPSAW.Vector(maxX, maxY)
      }
    },

    /**
     * Returns geometric centroid of control nodes.
     * @returns {RIPSAW.Vector}
     */
    getCentroid: function () {
      var br = this.getBoundingRectangle()
      return new RIPSAW.Vector((br.max.x + br.min.x) / 2, (br.max.y + br.min.y) / 2)
    },

    /**
     * Returns maximum flat dimension in x and y directions.
     * @returns {number} maxDim
     */
    getMaxDim: function () {
      var br = this.getBoundingRectangle()
      return Math.max(br.max.x - br.min.x, br.max.y - br.min.y)
    },

    /**
     * Moves all control points.
     * @param {RIPSAW.Vector} displacement
     * @returns {RIPSAW.Voronoi} this
     */
    moveGeometry: function (displacement) {
      var i
      var max = this.control.length
      var ctrl

      for (i = 0; i < max; i += 1) {
        ctrl = this.control[i]
        ctrl.temp.add(displacement)
        ctrl.update()
      }

      return this
    },

    /**
     * Scales all control points with respect to the origin.
     * @returns {RIPSAW.Voronoi} this
     */
    scaleGeometry: function (scaleFactor) {
      var i
      var max = this.control.length
      var ctrl
      var fact = scaleFactor || 1

      for (i = 0; i < max; i += 1) {
        ctrl = this.control[i]

        ctrl.temp.scale(fact)
        ctrl.update()
      }

      return this
    },

    /**
     * Normalizes handles so that they fit in the (-0.5, -0.5) -> (+0.5, +0.5) rectangle.
     * @param {number} [scale=1.0] Additional scale factor.
     */
    normalize: function (scale) {
      var centroid
      var scaleFactor

      scale = scale || 1

      centroid = this.getCentroid()
      scaleFactor = 1 / this.getMaxDim() * scale

      this.moveGeometry(centroid.scale(-1)).scaleGeometry(scaleFactor)

      return this
    },

    /**
     * Performs timestep operations on geometry.
     *
     */
    step: function () {
      var i
      var maxi
      var j
      var maxj
      var node
      var link
      var win
      var wil
      var foundMatch = false

      this.wave.step()
      this.waveFront.build(this.wave.get())
      this.nodes = this.waveFront.getSimpleIntersections()

        // loop over new nodes
      for (i = 0, maxi = this.nodes.length; i < maxi; i += 1) {
        node = this.nodes[i]

        win = node.waveFrontIndeces

        foundMatch = false

            // loop over existing links
        for (j = 0, maxj = this.links.length; j < maxj; j += 1) {
          link = this.links[j]

          wil = link.waveFrontIndeces

                // for regular links that do not result from overlapping wavefronts
                //     the second link node is updated
          if (win[0] === wil[0] && win[1] === wil[1]) {
            if (!link.isOverlapLink) {
              link.p2 = node.points[0]
            }

            foundMatch = true
          }
        }

            // if no match is found, link is added to the list
        if (!foundMatch) {
          if (node.points.length === 1) {
            this.links.push({

              p1: node.points[0], // start point only, endpoint inserted in next match
              isOverlapLink: false,
              waveFrontIndeces: node.waveFrontIndeces

            })
          } else if (node.points.length === 2) {
            this.links.push({

              p1: node.points[0],
              p2: node.points[1],
              isOverlapLink: true,
              waveFrontIndeces: node.waveFrontIndeces

            })
          }
        }
      }

      return this
    },

    /**
     * Places wavefront.
     * @returns {RIPSAW.Voronoi} this
     */
    placeWaveFront: function () {
      var i
      var l
      var waveFront = this.waveFront.getList()
      var max = waveFront.length

      for (i = 0; i < max; i += 1) {
        l = waveFront[i]
        RIPSAW.pen.line(this.map(l.p1), this.map(l.p2))
      }

      return this
    },

    /**
     * Places links.
     * @returns {RIPSAW.Voronoi} this
     */
    placeLinks: function () {
      var l
      var i
      var max = this.links.length

      for (i = 0; i < max; i += 1) {
        l = this.links[i]

        if (l.p2) {
          RIPSAW.pen.line(this.map(l.p1), this.map(l.p2))

          RIPSAW.pen.controlPoint(this.map(l.p1))
          RIPSAW.pen.controlPoint(this.map(l.p2))
        }
      }

      return this
    },

    /**
     * Places nodes.
     * @returns {RIPSAW.Voronoi} this
     */
    placeNodes: function () {
      var i
      var max = this.nodes.length

      for (i = 0, max = this.nodes.length; i < max; i += 1) {
        RIPSAW.pen.controlPoint(this.map(this.nodes[i].points[0]))
      }

      return this
    },

    /**
     * Drawing manifest file.
     * @returns {RIPSAW.Voronoi} this
     */
    draw: function (relControlPointWidth) {
      var i
      var max

      this.step()

      RIPSAW.pen.configure('primary control point')

      for (i = 0, max = this.control.length; i < max; i += 1) {
        RIPSAW.pen.controlPoint(this.map(this.control[i].temp), (this.hoverIndex === i))
      }

      RIPSAW.pen.configure('design thin')
      this.placeWaveFront()

      RIPSAW.pen.configure('design iso')
      this.placeLinks()

      RIPSAW.pen.configure('point')
      this.placeNodes()

      return this
    },

    mouseUp: function () {
      if (this.hoverIndex !== -1) {
        this.control[this.hoverIndex].update()
      }

      return this
    },

    mouseDown: function () {
      return this
    },

    updateHoverState: function () {
      var i
      var max = this.control.length

      this.hoverIndex = -1

      for (i = 0; i < max; i += 1) {
        if (RIPSAW.mouse.hovers(this.map(this.control[i].perm))) {
          this.hoverIndex = i
        }
      }

      return this
    },

    mouseMove: function () {
      if (RIPSAW.mouse.isDragging) {
        if (this.hoverIndex !== -1) {
          this.control[this.hoverIndex].setDrag(this.getObjectDrag())
        }
      } else {
        this.updateHoverState()
      }

      return this
    },

    mouseDownRight: function () {
      this.links = []
      this.wave.reset().start()
      return this
    },

    toSVGPath: function (factorArg) {
      var link
      var result = ''
      var i
      var max = this.links.length
      var factor = factorArg || 100

      for (i = 0; i < max; i += 1) {
        link = this.links[i]

        if (link.p2) {
          result += new RIPSAW.Line(link.p1.clone().scale(factor), link.p2.clone().scale(factor)).toSVG()
        }
      }

      return result
    },

    toSVG: function () {
      return RIPSAW.textAssets.SVGHeader + this.toSVGPath() + RIPSAW.textAssets.SVGFooter
    }
  }

  RIPSAW.inheritPrototype(RIPSAW.MasterPiece, RIPSAW.Voronoi)
}(window.RIPSAW))
