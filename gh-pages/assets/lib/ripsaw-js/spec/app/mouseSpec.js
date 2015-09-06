describe("mouse", function() {

    describe("observer integration", function() {

        it('correctly integrates with Observer', function() {

            var messageReceiver = "",
                subscriber = {

                    name: "jimmy",

                    say: function() {

                        messageReceiver = "my name is " + this.name;

                    }

                };

            RIPSAW.mouse.subscribe(subscriber);

            RIPSAW.mouse.fire("say");

            expect(messageReceiver).toEqual("my name is jimmy");

        });

    });

});
