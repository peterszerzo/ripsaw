;(function (RIPSAW) {
/**
 * Created using the immediately invoked functional pattern, inheriting from observer.
 * @namespace stage
 * @memberof RIPSAW
 */
  RIPSAW.stage = (function () {
    var that = {}

    // inherit from observer
    that = RIPSAW.observer()

    /**
     * Stage number.
     * @memberof RIPSAW.stage
     * @type {number}
     */
    that.no = 0

    /**
     * Update stage number.
     * @memberof RIPSAW.stage
     */
    that.update = function () {
      this.fire('stageUpdate')
      RIPSAW.time0 = RIPSAW.time

      return this
    }

    /**
     * Change stage number. Round to 1 decimal place.
     * @memberof RIPSAW.stage
     * @param {number} inc - Increment.
     */
    that.change = function (inc) {
      this.no = Math.round((this.no + inc) * 10) / 10
      this.update()

      return this
    }

    /**
     * Set stage number. Round to 1 decimal place.
     * @memberof RIPSAW.stage
     * @param {number} target
     */
    that.set = function (target) {
      this.no = Math.round(target * 10) / 10
      this.update()

      return this
    }

    return that
  }())
}(window.RIPSAW))
