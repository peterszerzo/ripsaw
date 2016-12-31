;(function (RIPSAW) {
  RIPSAW.events = {

    on: function (name, callback) {
      this._events = (this._events || {})

      var events = this._events[name] || (this._events[name] = [])

      events.push({

        callback: callback

      })
    },

    off: function (name, callback) {
      var ev = this._events[name]
      var i
      var max
      var index = -1

      i = 0
      max = ev.length

      for (i = 0; i < max; i += 1) {
        if (ev[i].callback === callback) {
          index = i
        }
      }

      if (index !== -1) {
        ev.splice(index, 1)
      }
    },

    trigger: function (name) {
      var events = this._events[name] || []
      var i
      var max = events.length

      for (i = 0; i < max; i += 1) {
        events[i].callback()
      }
    }

  }
}(window.RIPSAW))
