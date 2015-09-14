"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comp = {};
Comp.Footer = (function (_React$Component) {
	_inherits(_class, _React$Component);

	function _class() {
		_classCallCheck(this, _class);

		_get(Object.getPrototypeOf(_class.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "center", id: "footer" },
					React.createElement("img", { className: "center", src: "assets/images/logo.svg" })
				),
				React.createElement(
					"p",
					{ className: "center", id: "credit" },
					"nerded out by Peter Szerzo",
					React.createElement("br", null),
					"hopping Brooklyn’s finest coffee shops"
				)
			);
		}
	}]);

	return _class;
})(React.Component);
Comp.Header = (function (_React$Component2) {
	_inherits(_class2, _React$Component2);

	function _class2() {
		_classCallCheck(this, _class2);

		_get(Object.getPrototypeOf(_class2.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class2, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ "class": "center", id: "banner" },
					React.createElement("img", { "class": "center", src: "assets/images/logo.svg" })
				),
				React.createElement(
					"h1",
					{ "class": "center" },
					"ripsaw.js"
				),
				React.createElement(
					"h2",
					{ "class": "center" },
					"interactive product design in the browser"
				),
				React.createElement(
					"div",
					{ "class": "nav" },
					React.createElement("div", { "class": "jumper-hover-help" }),
					React.createElement(
						"ul",
						null,
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ id: "a-home", href: "#pages/home" },
								React.createElement("i", { "class": "fa fa-home fa-3x" })
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ id: "a-concept", href: "#pages/concept" },
								React.createElement("i", { "class": "fa fa-lightbulb-o fa-3x" })
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ id: "a-tutorial", href: "#pages/tutorial" },
								React.createElement("i", { "class": "fa fa-mortar-board fa-3x" })
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ id: "a-documentation", href: "#pages/documentation" },
								React.createElement("i", { "class": "fa fa-book fa-3x" })
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ id: "a-code", href: "#pages/code" },
								React.createElement("i", { "class": "fa fa-github fa-3x" })
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "ripsaw-yourk/index.html", target: "_blank" },
								React.createElement("i", { "class": "fa fa-play-circle-o fa-3x" })
							)
						)
					)
				)
			);
		}
	}]);

	return _class2;
})(React.Component);