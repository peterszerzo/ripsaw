describe('Inheritance Patterns', function () {
  var parent, child

  describe('#inherit()', function () {
    beforeEach(function () {
      parent = {

        name: 'Peggie',
        say: function () {
          return 'my name is ' + this.name
        }

      }

      child = RIPSAW.inherit(parent)
    })

    it('inherits all parent properties', function () {
      expect(child.say()).toEqual('my name is Peggie')
    })

    it('does not inherit parent properties as "own" properties', function () {
      expect(child.hasOwnProperty('name')).toEqual(false)
    })

    it('overrides property inherited in the prototype', function () {
      child.name = 'Mike'
      expect(child.say()).toEqual('my name is Mike')
    })
  })

  describe('#inheritPrototype()', function () {
    it('copies prototype methods and properties to child', function () {
      var Parent = function () {
          this.name = 'papa'
        },

        Child = function () {
          this.name = 'jimmy'
        }

      Parent.prototype = {

        say: function () {
          return 'my name is ' + this.name
        }

      }

      RIPSAW.inheritPrototype(Parent, Child)

      expect(new Child().say()).toEqual('my name is jimmy')
    })
  })

  describe('#bind()', function () {
    var one, two

    it('binds a method of an object to the this of another object', function () {
      one = {

        name: 'Charlie #1',

        say: function () {
          return 'my name is ' + this.name
        }

      }

      two = {

        name: 'Charlie #2'

      }

      two.say = RIPSAW.bind(one.say, two)

      expect(two.say()).toEqual('my name is Charlie #2')
    })
  })

  describe('#extend()', function () {
    var one, two

    it('creates shallow copy', function () {
      one = {

        name: 'Charlie #1',

        say: function () {
          return 'my name is ' + this.name
        }

      }

      two = {

        name: 'Charlie #2'

      }

      RIPSAW.extend(two, one)

      expect(two.name).toEqual('Charlie #1')
    })

    it('copies inner objects by reference', function () {
      one = {

        name: 'Charlie #1',

        info: {

          age: 29,
          dogsAge: 9

        }

      }

      two = {}

      expect(one.info.age).toEqual(29)

      RIPSAW.extend(two, one)

      two.info.age = 32

      expect(one.info.age).toEqual(32)
    })
  })
})
