describe("Observer", function() {

    var obs,
        testSubscriber,
        testSubscriber2;

    beforeEach(function() {

        obs = RIPSAW.observer();

        testSubscriber = {

            dummyProperty: "maple syrup",
            isFireFunctionCalled: false,
            fireFunction: function() {

                this.isFireFunctionCalled = true;

            }

        };

        testSubscriber2 = {

            dummyProperty: "just honey",
            fireFunction: function() {

                this.isFireFunctionCalled = true;

            }

        };

    });

    describe("#subscribe()", function() {

        it("adds object to the list of subscribed objects", function() {

            obs.subscribe(testSubscriber);
            expect(obs.getSubscriber(0)).toEqual(testSubscriber);
            expect(obs.indexOf(testSubscriber)).toEqual(0);

        });

    });

    describe("#unsubscribe()", function() {

        beforeEach(function() {

            obs.subscribe(testSubscriber);
            obs.subscribe(testSubscriber2);
            obs.unsubscribe(testSubscriber);

        });

        it("removes object to the list of subscribed objects", function() {

            expect(obs.indexOf(testSubscriber)).toEqual(-1);

        });

        it("leaves in other subscribed objects", function() {

            expect(obs.getSubscriber(0)).toEqual(testSubscriber2);

        });

    });

    describe("#fire()", function() {

        it("calls specified method of all subscribed objects", function() {

            obs.subscribe(testSubscriber);
            obs.fire("fireFunction");

            expect(testSubscriber.isFireFunctionCalled).toEqual(true);

        });

    });

});
