describe('VoronoiIntersection', function() {

    var vi1, vi2, vi2x;

    describe('#matches()', function() {

        it('returns false if wavefront indeces match, even if points do', function() {

            vi2 = new RIPSAW.VoronoiIntersection([new RIPSAW.Vector()], [1, 2]);
            vi2x = new RIPSAW.VoronoiIntersection([new RIPSAW.Vector()], [3, 2]);

            expect(vi2.matches(vi2x)).toEqual(false);

        });

        it('returns true if wavefront indeces match, even if points do not', function() {

            vi2 = new RIPSAW.VoronoiIntersection(['fake vector'], [1, 2]);
            vi2x = new RIPSAW.VoronoiIntersection([1, 2, 3, 'fake array'], [1, 2]);

            expect(vi2.matches(vi2x)).toEqual(true);

        });

    });

    describe('#isNearIdenticalTo()', function() {

        it('returns true if both indeces and points are identical', function() {

            vi2 = new RIPSAW.VoronoiIntersection([new RIPSAW.Vector(1, 1, 1)], [1, 2]);
            vi2x = new RIPSAW.VoronoiIntersection([new RIPSAW.Vector(1, 1, 1)], [1, 2]);

            expect(vi2.isNearIdenticalTo(vi2x)).toEqual(true);

        });

        it('returns true if both indeces are identical and points are near identical', function() {

            vi2 = new RIPSAW.VoronoiIntersection([new RIPSAW.Vector(1, 1, 1)], [1, 2]);
            vi2x = new RIPSAW.VoronoiIntersection([new RIPSAW.Vector(1 + 0.9 * RIPSAW.delta, 1, 1)], [1, 2]);

            expect(vi2.isNearIdenticalTo(vi2x)).toEqual(true);

        });

        it('returns false if both indeces are identical and points are not-near-enough identical', function() {

            vi2 = new RIPSAW.VoronoiIntersection([new RIPSAW.Vector(1, 1, 1)], [1, 2]);
            vi2x = new RIPSAW.VoronoiIntersection([new RIPSAW.Vector(1 + 1.1 * RIPSAW.delta, 1, 1)], [1, 2]);

            expect(vi2.isNearIdenticalTo(vi2x)).toEqual(false);

        });

    });

});
