describe('events', function() {

	var obj, 
		triggerListener1, callback1,
		triggerListener2, callback2;

	beforeEach(function() {

		obj = {};
		RIPSAW.extend(obj, RIPSAW.events);

		triggerListener1 = false;
		callback1 = function() {

			triggerListener1 = true;

		};

		triggerListener2 = false;
		callback2 = function() {

			triggerListener2 = true;

		};

	});

	describe('#on()', function() {

		it('adds single event to events hash', function() {

			obj.on('some-event', callback1);

			expect(obj._events['some-event'].length).toEqual(1);

		});

		it('adds two events to events hash', function() {

			obj.on('some-event', callback1);
			obj.on('some-event', callback2);

			expect(obj._events['some-event'].length).toEqual(2);

		});

	});

	describe('#off()', function() {

		it('removes a single event from events hash', function() {

			obj.on('some-event', callback1);
			obj.off('some-event', callback1);

			expect(obj._events['some-event'].length).toEqual(0);

		});

		it('removes a single event from events hash, leaving other callback', function() {

			obj.on('some-event', callback1);
			obj.on('some-event', callback2);

			obj.off('some-event', callback1);

			expect(obj._events['some-event'].length).toEqual(1);

		});

	});

	describe('#on() and #trigger() integration', function() {

		it('registers and triggers event', function() {

			obj.on('some-event', callback1);

			obj.trigger('some-event');

			expect(triggerListener1).toEqual(true);

		});

	});

});