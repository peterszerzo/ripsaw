;(function (RIPSAW) {
/**
 * Constructs observer instances in the functional pattern.
 * @namespace observer
 * @memberof RIPSAW
 */
  RIPSAW.observer = function () {
    var subscribers = []
    var self = {}

    /**
     * Returns subscriber's index in private subscribers array.
     * @memberof RIPSAW.observer
     * @param {Object} subscriber
     */
    self.indexOf = function (subscriber) {
      return subscribers.indexOf(subscriber)
    }

    /**
     * Returns subscriber at a given index.
     * @memberof RIPSAW.observer
     * @param {number} index
     * @returns {Object} subscriber
     */
    self.getSubscriber = function (index) {
      return subscribers[index]
    }

    /**
     * Subscribes object to observer.
     * @memberof RIPSAW.observer
     * @param {Object} subscriber
     * @returns {Object} this
     */
    self.subscribe = function (subscriber) {
      subscribers.push(subscriber)

      return self
    }

    /**
     * Unsubscribes object from observer.
     * @memberof RIPSAW.observer
     * @param {Object} subscriber
     * @returns {Object} this
     */
    self.unsubscribe = function (subscriber) {
      var index = this.indexOf(subscriber)

      if ((typeof index !== 'undefined') && (index !== -1)) {
        subscribers.splice(index, 1)
      }

      return self
    }

    /**
     * Fires method on all subscribers.
     * @memberof RIPSAW.observer
     * @param {String} methodName - Method to be called on subscribers.
     * @returns {Object} this
     */
    self.fire = function (methodName) {
      var i
      var max = subscribers.length
      var subscriber

      for (i = 0; i < max; i += 1) {
        subscriber = subscribers[i]

        if ((typeof subscriber !== 'undefined') && (typeof subscriber[methodName] !== 'undefined')) {
          subscriber[methodName]()
        }
      }
    }

    return self
  }
}(window.RIPSAW))
