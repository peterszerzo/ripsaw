/**
 * Intersection node of a Voronoi wavefront.
 * @param {Array} p - Array of intersection points.
 * @param {number} i - Index of first wavefront element.
 * @param {number} i - Index of second wavefront element.
 * @param {number}
 *
 */
RIPSAW.VoronoiIntersection = function(points, indeces) {

    this.points = points;

    this.waveFrontIndeces = indeces;

    return this;

};


RIPSAW.VoronoiIntersection.prototype = {


    toString: function() {

        var result = "";

        result += "{ " + this.points[0].toString();

        if (this.points[1]) {

            result += "; " + this.points[1].toString();

        }

        result += " } - " + this.waveFrontIndeces[0] + ', ' + this.waveFrontIndeces[1];

    },

    /**
     * Returns true if intersection is between the same two nodes.
     * @param {RIPSAW.VoronoiIntersection} vi - Intersection to match with.
     */
    matches: function(vi) {

        var wfi1 = this.waveFrontIndeces,
            wfi2 = vi.waveFrontIndeces;

        return (wfi1[0] === wfi2[0] && wfi1[1] === wfi2[1]);

    },


    /**
     * Returns whether intersection is identical to another intersection - both coordinates and endnodes.
     *
     */
    isNearIdenticalTo: function(vi) {

        var i, max = this.points.length;

        if (vi.points.length !== max) {

            return false;

        }

        for (i = 0; i < max; i += 1) {

            if (!this.points[i].isNearEqualTo(vi.points[i])) {

                return false;

            }

        }

        return this.matches(vi);

    }

};
