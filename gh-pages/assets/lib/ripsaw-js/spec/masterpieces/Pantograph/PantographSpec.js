describe("Pantograph", function() {

    describe("#getSegmentHeight()", function() {


        it("returns the height of the segment", function() {

            var pg = new RIPSAW.Pantograph(2, 1, 0.75).setLegSpan(0.75);

            expect(RIPSAW.areNearEqual(pg.getSegmentHeight(0), Math.sqrt(3) / 2)).toEqual(true);


        });



    });

});
