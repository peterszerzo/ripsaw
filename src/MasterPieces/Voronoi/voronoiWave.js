RIPSAW.voronoiWave = function() {

    var w, min, max, period, sign, reachedEnd,
        that = {};

    min = 0.001;
    max = 0.8;
    w = min;
    sign = 0;
    period = 1.5;

    reachedEnd = false;

    /** Returns wavefron value. */
    that.get = function() {

        return w;

    };


    /** Returns wavefron value. */
    that.set = function(wArg) {

        w = wArg;

        return this;

    };


    /** Performs timestep change on wavefront. 
     * @param {boolean} [restart=false] - Should the step restart immediately.
     */
    that.step = function(restartArg) {

        var restart = (typeof restartArg === "undefined") ? false : restartArg;

        w += (max - min) * sign * RIPSAW.refreshInterval / (period * 1000);

        if (w < min) {

            sign = -1;

        }

        if (w > max) {

            sign = restart ? 1 : 0;

            w = min;
            reachedEnd = true;

        }

        return this;

    };


    /** Resets wavefront to default. */
    that.reset = function() {

        w = min;

        return this;

    };


    that.start = function() {

        sign = +1;

        return this;

    };


    that.reachedEnd = function() {

        return reachedEnd;

    };


    that.restart = function() {

        w = min;
        sign = +1;

        return this;

    };


    /** Sets maximum wavefront length. */
    that.setMax = function(maxArg) {

        max = maxArg;

        return this;

    };


    /** Sets minimum wavefront length. */
    that.setMin = function(minArg) {

        min = minArg;

        return this;

    };


    /** Sets period. */
    that.setPeriod = function(periodArg) {

        period = periodArg;

        return this;

    };

    return that;

};
