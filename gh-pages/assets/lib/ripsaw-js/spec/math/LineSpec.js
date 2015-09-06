describe("Line", function() {

    var l, l1, l2, delta, p, eqn;

    describe("#pointAt()", function() {

        it("returns point on line at specified parameter (0 at start, 1 at end)", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 1, 2), new RIPSAW.Vector(2, 3, 4));
            expect(l.pointAt(0.5)).toEqual(new RIPSAW.Vector(1, 2, 3));

        });

    });

    describe("#hasInBoundingRectangleXY()", function() {

        it("returns true if line within xy bounding box", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 0, 0), new RIPSAW.Vector(2, 3, 4));

            expect(l.hasInBoundingRectangleXY(new RIPSAW.Vector(1, 1, 3))).toEqual(true);
            expect(l.hasInBoundingRectangleXY(new RIPSAW.Vector(1, -1, 3))).toEqual(false);

        });

    });


    describe("#getEquationXY()", function() {

        it("gets xy plane equation of line", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(1, 2));
            eqn = l.getEquationXY();
            //expect(l.getEquationXY()).to.eql({ a: 2, b: -1, c: 0 });
            expect(eqn.a).toEqual(2);
            expect(eqn.b).toEqual(-1);
            expect(eqn.c).toEqual(0);

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(0, 5));
            eqn = l.getEquationXY();
            //expect(l.getEquationXY()).to.eql({ a: 1, b: 0, c: 0 });
            expect(eqn.a).toEqual(1);
            expect(eqn.b).toEqual(0);
            expect(eqn.c).toEqual(0);

        });

    });

    describe("#getMidPerpXY()", function() {

        it("[felezőmerőleges]", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(0, 2));
            expect(l.getMidPerpXY()).toEqual(new RIPSAW.Line(new RIPSAW.Vector(0, 1), new RIPSAW.Vector(-1, 1)));

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(3, 4));
            expect(l.getMidPerpXY()).toEqual(new RIPSAW.Line(new RIPSAW.Vector(1.5, 2), new RIPSAW.Vector(0.7, 2.6)));

        });

    });


    describe("#scale()", function() {

        it("scales line with respect to start point", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(0, 2));
            expect(l.scale(-3)).toEqual(new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(0, -6)));

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 5), new RIPSAW.Vector(3, 4));
            expect(l.scale(5)).toEqual(new RIPSAW.Line(new RIPSAW.Vector(0, 5), new RIPSAW.Vector(15, 0)));

        });

    });


    describe("#distanceFromXY()", function() {

        it("simple case - horizontal line", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(2, 0));
            p = new RIPSAW.Vector(1, 1, 0);
            expect(l.getDistanceFromXY(p)).toEqual(1);

        });


        it("45 degree case", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(2, 2));
            p = new RIPSAW.Vector(1, 0, 0);
            expect(Math.abs(l.getDistanceFromXY(p) - Math.pow(2, 0.5) / 2) < 1e-10).toEqual(true);

        });

    });


    describe("#interpolateX()", function() {

        it("regular case", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 0, 0), new RIPSAW.Vector(2, 1, 3));
            expect(l.interpolateX(1)).toEqual(new RIPSAW.Vector(1, 0.5, 1.5));

        });


        it("x coordinates nearly equal", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 0, 0), new RIPSAW.Vector(RIPSAW.delta * 0.9, 1, 3));
            expect(l.interpolateX(1)).toEqual(new RIPSAW.Vector(0, 0, 0));

        });

    });


    describe("#intersectXY()", function() {


        it("inside intersection", function() {

            l1 = new RIPSAW.Line(new RIPSAW.Vector(0.5, 0.5), new RIPSAW.Vector(1.0, 1.0)),
            l2 = new RIPSAW.Line(new RIPSAW.Vector(2.0, 0.0), new RIPSAW.Vector(1.0, 1.0));

            expect(l1.intersectXY(l2)).toEqual({
                points: [new RIPSAW.Vector(1, 1, 0)],
                type: "inside",
                s1: +1,
                s2: +1
            });

        });


        it("outside intersection", function() {

            l1 = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(4, 4));
            l2 = new RIPSAW.Line(new RIPSAW.Vector(4, 0), new RIPSAW.Vector(3, 1));

            expect(l1.intersectXY(l2)).toEqual({
                points: [new RIPSAW.Vector(2, 2, 0)],
                type: "outside",
                s1: 0.5,
                s2: +2
            });

        });


        it("outside intersection", function() {

            l1 = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(4, 4));
            l2 = new RIPSAW.Line(new RIPSAW.Vector(5, 0), new RIPSAW.Vector(5, 1));

            expect(l1.intersectXY(l2)).toEqual({
                points: [new RIPSAW.Vector(5, 5, 0)],
                type: "outside",
                s1: 1.25,
                s2: 5
            });

        });



        it("inside intersection", function() {

            l1 = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(2, 0));
            l2 = new RIPSAW.Line(new RIPSAW.Vector(2, 0), new RIPSAW.Vector(2, 1));

            expect(l1.intersectXY(l2)).toEqual({
                points: [new RIPSAW.Vector(2, 0, 0)],
                type: "inside",
                s1: 1,
                s2: 0
            });

        });


        it("overlapping lines", function() {

            // overlapping lines
            l1 = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(2, 2));
            l2 = new RIPSAW.Line(new RIPSAW.Vector(3, 3), new RIPSAW.Vector(1, 1));

            expect(l1.intersectXY(l2)).toEqual({

                points: [new RIPSAW.Vector(1, 1), new RIPSAW.Vector(2, 2)],
                type: "overlap"

            });


            delta = RIPSAW.delta2 / 0.8;

            l1 = new RIPSAW.Line(new RIPSAW.Vector(0 + delta, 0), new RIPSAW.Vector(2 + delta, 2));
            l2 = new RIPSAW.Line(new RIPSAW.Vector(1, 1), new RIPSAW.Vector(3, 3));

            expect(l1.intersectXY(l2)).toEqual({

                points: [new RIPSAW.Vector(1, 1), new RIPSAW.Vector(2 + delta, 2)],
                type: "overlap"

            });

        });


        it("parallel lines", function() {

            delta = RIPSAW.delta2 / 0.6;

            l1 = new RIPSAW.Line(new RIPSAW.Vector(0 + delta, 0), new RIPSAW.Vector(2 + delta, 2));
            l2 = new RIPSAW.Line(new RIPSAW.Vector(1, 1), new RIPSAW.Vector(3, 3));

            expect(l1.intersectXY(l2)).toEqual({

                points: [],
                type: "parallel"

            });


            l1 = new RIPSAW.Line(new RIPSAW.Vector(0, 0), new RIPSAW.Vector(2, 2));
            l2 = new RIPSAW.Line(new RIPSAW.Vector(3, 0), new RIPSAW.Vector(5, 2));

            expect(l1.intersectXY(l2)).toEqual({

                points: [],
                type: "parallel"

            });

        });

    });


    describe("#getAngleXY()", function() {

        it("gets angle from the first quadrant", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(1, 1), new RIPSAW.Vector(2, 2));
            expect(l.getAngleXY()).toEqual(Math.PI / 4);

        });

        it("gets angle from the second quadrant", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(1, 1), new RIPSAW.Vector(0, 2));
            expect(l.getAngleXY()).toEqual(3 * Math.PI / 4);

        });

        it("gets angle from the third quadrant", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(2, 2), new RIPSAW.Vector(1, 1));
            expect(l.getAngleXY()).toEqual(5 * Math.PI / 4);

        });

        it("gets angle from the fourth quadrant", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(0, 2), new RIPSAW.Vector(1, 1));
            expect(l.getAngleXY()).toEqual(7 * Math.PI / 4);

        });

        it("gets angle for the +x direction", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(2, 2), new RIPSAW.Vector(3, 2));
            expect(l.getAngleXY()).toEqual(0);

        });

        it("gets angle for the -x direction", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(4, 2), new RIPSAW.Vector(3, 2));
            expect(l.getAngleXY()).toEqual(1 * Math.PI);

        });

        it("gets angle for the +y direction", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(2, 2), new RIPSAW.Vector(2, 5));
            expect(l.getAngleXY()).toEqual(Math.PI / 2);

        });

        it("gets angle for the -y direction", function() {

            l = new RIPSAW.Line(new RIPSAW.Vector(2, 7), new RIPSAW.Vector(2, 5));
            expect(l.getAngleXY()).toEqual(3 * Math.PI / 2);

        });

    });

});
