describe("DragNode", function() {

    describe("#constructor()", function() {

        it("has equal permanent and temporary coordinates", function() {

            var dn = new RIPSAW.DragNode(1.2, 2.001, 3);

            expect(dn.temp).toEqual(dn.perm);

        });

    });

});
