describe("stage", function() {

    beforeEach(function() {

        RIPSAW.stage.no = 1;

    });

    describe("#change()", function() {

        it("changes stage number by an increment", function() {

            RIPSAW.stage.change(1);
            expect(RIPSAW.stage.no).toEqual(2);

        });

        it("rounds to one decimal place", function() {

            RIPSAW.stage.change(1.01);
            expect(RIPSAW.stage.no).toEqual(2);

        });

    });

    describe("#set()", function() {

        it("sets stage number to target value", function() {

            RIPSAW.stage.set(3);
            expect(RIPSAW.stage.no).toEqual(3);

        });

        it("rounds to one decimal place", function() {

            RIPSAW.stage.set(3.01);
            expect(RIPSAW.stage.no).toEqual(3);

        });

    });

    describe("#set()", function() {

        it("sets stage number to target value", function() {

            RIPSAW.stage.set(3);
            expect(RIPSAW.stage.no).toEqual(3);

        });

        it("rounds to one decimal place", function() {

            RIPSAW.stage.set(3.01);
            expect(RIPSAW.stage.no).toEqual(3);

        });

    });

    describe("observer integration", function() {

        it('correctly integrates with Observer', function() {

            var messageReceiver = "",
                subscriber = {

                    name: "jimmy",

                    say: function() {

                        messageReceiver = "my name is " + this.name;

                    }

                };

            RIPSAW.stage.subscribe(subscriber);

            RIPSAW.stage.fire("say");

            expect(messageReceiver).toEqual("my name is jimmy");

        });

    });

});
