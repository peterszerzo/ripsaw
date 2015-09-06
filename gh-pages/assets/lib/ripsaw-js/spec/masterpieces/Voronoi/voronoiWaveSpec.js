describe("voronoiWave", function() {

    var vw;

    beforeEach(function() {

        vw = RIPSAW.voronoiWave();
        vw.setMin(0.01);
        vw.setMax(1);
        vw.setPeriod(2);

        vw.reset();
        vw.start();

        RIPSAW.refreshInterval = 20;

    });

    describe('#get()', function() {

        it('returns minimum when initialized', function() {

            expect(vw.get()).toEqual(0.01);

        });

    });

    describe('#step()', function() {

        it('advanced time step', function() {

            vw.reset().step();

            expect(vw.get()).toEqual(0.01 + (1 - 0.01) * 20 / 2000);

        });

    });

    describe('#reset()', function() {

        it('resets wave to minimum', function() {

            vw.set(5);

            vw.reset();

            expect(vw.get()).toEqual(0.01);

        });

    });

});
