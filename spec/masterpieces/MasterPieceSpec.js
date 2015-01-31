describe("MasterPiece", function() {

    // masterpiece drawn in the upper quadrant of the screen
    var mp;

    beforeEach(function() {

        mp = new RIPSAW.MasterPiece(0.25, 0.25, 0.20);
        RIPSAW.W = 1000;
        RIPSAW.H = 500;
        RIPSAW.minWH = 500;

    });

    describe("#map()", function() {

        it("maps according to centroid and scale information", function() {

            var x = 1000 * 0.25 + 500 * 0.1 * 0.20,
                y = 500 * 0.25 + 500 * 0.05 * 0.20;

            expect(mp.map({
                x: 0.1,
                y: 0.05
            })).toEqual(new RIPSAW.Vector(x, y));

        });

    });

    describe("#getObjectDrag()", function() {

        it("normalizes mouse drag values to object coordinates", function() {

            // mock mouse drag
            RIPSAW.mouse.getDrag = function() {

                return new RIPSAW.Vector(100, 200);

            };

            expect(mp.getObjectDrag()).toEqual(new RIPSAW.Vector(100 / 500 / 0.2, 200 / 500 / 0.2));

        });

    });

    describe("#updateState()", function() {

        it("updates display info (centroid, zoom) and permissions as specified in state object", function() {

            mp.updateState({
                permissionsBinary: "10000",
                x0: 0.5,
                y0: 0.6,
                scale: 1.3
            });

            expect(mp.allow.draw).toEqual(true);
            expect(mp.allow.edit).toEqual(false);
            expect(mp.allow.pan).toEqual(false);
            expect(mp.allow.zoom).toEqual(false);
            expect(mp.allow.rotate).toEqual(false);

            expect(mp.centroid).toEqual(new RIPSAW.DragNode(0.5, 0.6));

            expect(mp.scale).toEqual(1.3);

        });

    });

});
