describe('voronoiWaveFront', function() {

    var vwf;

    beforeEach(function() {

        vwf = RIPSAW.voronoiWaveFront();

    });

    describe('#add()', function() {

        it('adds wavefront element to list', function() {

            var list;

            vwf.clear();

            vwf.add(new RIPSAW.Line(new RIPSAW.Vector(1, 1), new RIPSAW.Vector(0, 0)));


            expect(vwf.getList())
                .toEqual(

                    [new RIPSAW.Line(new RIPSAW.Vector(1, 1), new RIPSAW.Vector(0, 0))]

            );

        });

    });


    describe('#build()', function() {

        it('builds wavefront around point list', function() {

            vwf = RIPSAW.voronoiWaveFront([new RIPSAW.DragNode(0, 0), new RIPSAW.DragNode(3, 5)]);

            vwf.build(2);

            expect(vwf.getList())
                .toEqual(

                    [

                        new RIPSAW.Line(new RIPSAW.Vector(+2, +0), new RIPSAW.Vector(+0, +2)),
                        new RIPSAW.Line(new RIPSAW.Vector(+0, +2), new RIPSAW.Vector(-2, +0)),
                        new RIPSAW.Line(new RIPSAW.Vector(-2, +0), new RIPSAW.Vector(+0, -2)),
                        new RIPSAW.Line(new RIPSAW.Vector(+0, -2), new RIPSAW.Vector(+2, +0)),
                        new RIPSAW.Line(new RIPSAW.Vector(+5, +5), new RIPSAW.Vector(+3, +7)),
                        new RIPSAW.Line(new RIPSAW.Vector(+3, +7), new RIPSAW.Vector(+1, +5)),
                        new RIPSAW.Line(new RIPSAW.Vector(+1, +5), new RIPSAW.Vector(+3, +3)),
                        new RIPSAW.Line(new RIPSAW.Vector(+3, +3), new RIPSAW.Vector(+5, +5))

                    ]

            );

        });

    });


    describe('#getIntersections()', function() {

        it('finds regular intersections', function() {

            var isects;

            vwf = RIPSAW.voronoiWaveFront([new RIPSAW.DragNode(0, 0), new RIPSAW.DragNode(5, 0)]);

            vwf.build(3);

            isects = vwf.getIntersections();

            expect(isects[0].isNearIdenticalTo(new RIPSAW.VoronoiIntersection([new RIPSAW.Vector(2.5, +0.5)], [0, 5]))).toEqual(true);
            expect(isects[1].isNearIdenticalTo(new RIPSAW.VoronoiIntersection([new RIPSAW.Vector(2.5, -0.5)], [3, 6]))).toEqual(true);

        });

    });

});
