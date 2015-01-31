describe('Utilities', function() {

    describe('#areNearEqual()', function() {

        var n1, n2;

        it('returns true when argument numbers are closer in value than RIPSAW.delta', function() {

            n1 = 0;
            n2 = 0.9 * RIPSAW.delta;

            expect(RIPSAW.areNearEqual(n1, n2)).toEqual(true);

        });

        it('returns false when argument numbers are farther in value than RIPSAW.delta', function() {

            n1 = 0;
            n2 = -1.1 * RIPSAW.delta;

            expect(RIPSAW.areNearEqual(n1, n2)).toEqual(false);

        });

    });

    describe('#map()', function() {

        it('maps coordinates to canvas dimensions', function() {

            RIPSAW.W = 1000;
            RIPSAW.H = 1000;

            expect(RIPSAW.map({
                x: 0.1,
                y: 0.2
            })).toEqual(new RIPSAW.Vector(100, 200));

        });

    });

});
