;(function (RIPSAW) {
/**
 * Prototypal inheritance.
 * @param {Object} o - Inherited object.
 * @returns {Object} F - New constructor instance.
 */
  RIPSAW.inherit = function (object) {
    function F () {}
    F.prototype = object
    return new F()
  }

/**
 * Prototypal inheritance.
 * @param {Function} Parent - Parent constructor.
 * @param {Function} Child - Child constructor.
 * @returns {Object} F - New constructor instance.
 */
  RIPSAW.inheritPrototype = function (Parent, Child) {
    var key

    if (typeof Child === 'undefined') {
      Child = function () {}
    }

    for (key in Parent.prototype) {
      Child.prototype[key] = Parent.prototype[key]
    }

    return Child
  }

/**
 * Simple bind.
 * @param {Function} method - Method to bind.
 * @param {Object} object - Object to bind to.
 */
  RIPSAW.bind = function (method, object) {
    return function () {
      return method.apply(object, Array.prototype.slice.call(arguments))
    }
  }

/**
 * Shallow copy of own properties only. No objects are copied from the prototype.
 * @param {object} [child={}] - Child object to copy into. If unspecified, a new object is returned.
 * @param {object} parent - Parent object.
 */
  RIPSAW.extend = function (child, parent) {
    var prop

    child = child || {}

    for (prop in parent) {
      if (parent.hasOwnProperty(prop)) {
        child[prop] = parent[prop]
      }
    }

    return child
  }
}(window.RIPSAW))
