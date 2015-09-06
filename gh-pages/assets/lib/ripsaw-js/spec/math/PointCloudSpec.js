describe("PointCloud", function() {

    describe("#construct and sort", function() {

        var pc;

        beforeEach(function() {

            pc = new RIPSAW.PointCloud([
                new RIPSAW.Vector(2, 0, 0),
                new RIPSAW.Vector(3, 1, 1),
                new RIPSAW.Vector(6, 1, 1),
                new RIPSAW.Vector(1.5, 1, 1),
            ]);

        });

        it("populates list array with correct length", function() {

            expect(pc._list.length).toEqual(4);

        });

        it("correctly assigns points", function() {

            expect(pc._list[1]).toEqual(new RIPSAW.Vector(3, 1, 1));

        });

        it("sorts by X", function() {

            pc.sortX();
            expect(pc._list[1]).toEqual(new RIPSAW.Vector(2, 0, 0));

        });


    });

    describe("#interpolateX()", function() {

        var pc;

        beforeEach(function() {

            pc = new RIPSAW.PointCloud([
                new RIPSAW.Vector(0, 0),
                new RIPSAW.Vector(2, 2),
                new RIPSAW.Vector(3, 1),
                new RIPSAW.Vector(0, 6),

            ]);

        });

        it("returns valid interpolations at all segments", function() {

            expect(pc.interpolateX(1)).toEqual([new RIPSAW.Vector(1, 1), new RIPSAW.Vector(1, 13 / 3)]);

        });



    });

});
