describe("Voronoi", function() {

    describe("#getBoundingRectangle()", function() {

        var vn;

        it("finds rectangle around control points", function() {

            vn = new RIPSAW.Voronoi().addControlPoint({
                x: 1,
                y: 3
            }).addControlPoint({
                x: -1,
                y: +5
            });

            expect(vn.getBoundingRectangle()).toEqual({
                min: new RIPSAW.Vector(-1, 3),
                max: new RIPSAW.Vector(1, 5)
            });

        });

    });

    describe("#createRectangularGrid()", function() {

        var piece;

        beforeEach(function() {

            piece = new RIPSAW.Voronoi().createRectangularGrid(3, 3, 2, 2);

        });

        it("creates a rectangular grid", function() {

            expect(piece.control[0].perm).toEqual(new RIPSAW.Vector(0, 0, 0));
            expect(piece.control[1].perm).toEqual(new RIPSAW.Vector(0, 3, 0));
            expect(piece.control[2].perm).toEqual(new RIPSAW.Vector(3, 0, 0));
            expect(piece.control[3].perm).toEqual(new RIPSAW.Vector(3, 3, 0));

        });

        it("creates a normalized grid", function() {

            piece.normalize();

            expect(piece.control[0].perm).toEqual(new RIPSAW.Vector(-0.5, -0.5, 0));
            expect(piece.control[1].perm).toEqual(new RIPSAW.Vector(-0.5, +0.5, 0));
            expect(piece.control[2].perm).toEqual(new RIPSAW.Vector(+0.5, -0.5, 0));
            expect(piece.control[3].perm).toEqual(new RIPSAW.Vector(+0.5, +0.5, 0));

        });



    });

    describe("#addControlPoint", function() {

        var piece;

        it("adds a control point", function() {

            piece = new RIPSAW.Voronoi().addControlPoint({
                x: 1,
                y: 2
            }).addControlPoint({
                x: 2,
                y: 1
            });

            expect(piece.control[0].perm).toEqual(new RIPSAW.Vector(1, 2, 0));
            expect(piece.control[1].perm).toEqual(new RIPSAW.Vector(2, 1, 0));

        });


    });

});
