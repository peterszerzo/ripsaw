/**
 * Created using the immediately invoked functional pattern, inheriting from observer.
 * @namespace mouse
 * @memberof RIPSAW
 */
RIPSAW.mouse = (function() {

    var that = {},
        x = 0, // current mouse position
        y = 0,
        xDrag = 0, // mouse position at the start of dragging
        yDrag = 0,
        _events = ["up", "down", "move"]; // object to be returned


    // inherit from observer
    that = RIPSAW.observer();

    /**
     * True if mouse is dragging.
     * @memberof! RIPSAW.mouse
     * @type {boolean}
     */
    that.isDragging = false;


    /** 
     * @memberof! RIPSAW.mouse
     * @type {RIPSAW.Observer}
     */
    //that.obs = new RIPSAW.Observer();


    /** 
     * Updates mouse position.
     * @memberof! RIPSAW.mouse
     * @param {Object}
     */
    that.getPosition = function(event) {

        var rect = RIPSAW.canvas.getBoundingClientRect();

        x = event.clientX - rect.left;
        y = event.clientY - rect.top;

    };


    /** 
     * Returns mouse drag.
     * @memberof! RIPSAW.mouse
     * @param {Object}
     * @returns {RIPSAW.Vector}
     */
    that.getDrag = function() {

        return new RIPSAW.Vector(x - xDrag, y - yDrag, 0);

    };


    /** 
     * Returns mouse drag normalized to app width and height.
     * @memberof! RIPSAW.mouse
     * @returns {RIPSAW.Vector}
     */
    that.getNormalizedDrag = function() {

        return this.getDrag().product(new RIPSAW.Vector(1 / RIPSAW.W, 1 / RIPSAW.H));

    };


    /** 
     * Returns distance of the mouse cursor to target vector.
     * @memberof! RIPSAW.mouse
     * @param {RIPSAW.Vector} v - Target vector.
     * @returns {number} distance
     */
    that.distanceTo = function(v) {

        return new RIPSAW.Vector(x, y).getDistanceTo(v);

    };


    /** 
     * Returns whether mouse hovers a given point.
     * @memberof! RIPSAW.mouse
     * @param {RIPSAW.Vector} v - Target vector.
     * @returns {boolean}
     */
    that.hovers = function(v) {

        return this.distanceTo(v) < (RIPSAW.minWH * RIPSAW.tolerance);

    };


    /** 
     * Returns position relative to target vector.
     * @memberof! RIPSAW.mouse
     * @param {RIPSAW.Vector} v - Target vector.
     * @returns {RIPSAW.Vector}
     */
    that.positionTo = function(v) {

        return new RIPSAW.Vector(x - v.x, y - v.y);

    };


    /** 
     * Updates mouse.
     * @memberof! RIPSAW.mouse
     * @param {Object} event - Event.
     */
    that.update = function(event, mouseState) {

        this.getPosition(event);

        if (mouseState === "down") {

            this.isDragging = true;
            xDrag = x;
            yDrag = y;

        } else if (mouseState === "up") {

            this.isDragging = false;

        }

    };


    /** 
     * Callback fired on mousedown.
     * @memberof! RIPSAW.mouse
     * @returns {Object} this
     */
    that.down = function(event) {

        this.update(event, 'down');
        this.obs.fire('mouseDown');

        return this;

    };


    /** 
     * Callback fired on mouseup.
     * @memberof! RIPSAW.mouse
     * @returns {Object} this
     */
    that.up = function(event) {

        this.update(event, 'up');
        this.obs.fire('mouseDown');

        return this;

    };


    /** 
     * Callback fired on mousemove.
     * @memberof! RIPSAW.mouse
     * @returns {Object} this
     */
    that.move = function(event) {

        this.update(event, 'move');
        this.obs.fire('mouseMove');

        return this;

    };

    return that;

}());
