describe("Navigation", function() {

    var nav;

    beforeEach(function() {

        nav = new RIPSAW.Navigation({

            buttons: [{
                name: "mow lawn",
                x: 0.2,
                y: 0.8,
                animate: false
            }, {
                name: "make babies",
                x: 0.3,
                y: 0.2,
                animate: false
            }, {
                name: "do not yell at dog",
                x: 0.6,
                y: 0.3,
                animate: false
            }, {
                name: "wash salad forks",
                x: 0.5,
                y: 0.1,
                animate: false
            }, {
                name: "sweep mess under carpet",
                x: 0.1,
                y: 0,
                animate: false
            }],
            displayHelp: true,
            xHelp: 0.5,
            yHelp: 0.85,
            defaultMode: "sweep mess under carpet",
            buttonGroups: [
                [0, 1],
                [2, 3, 4]
            ]
        });

    });

    describe("#getButtonGroupBoundaries()", function() {

        it('returns button group boundaries', function() {

            expect(nav.getButtonGroupBoundaries(0)).toEqual({

                min: new RIPSAW.Vector(0.2, 0.2),
                max: new RIPSAW.Vector(0.3, 0.8)

            });

            expect(nav.getButtonGroupBoundaries(1)).toEqual({

                min: new RIPSAW.Vector(0.1, 0),
                max: new RIPSAW.Vector(0.6, 0.3)

            });

        });

    });

});
