"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comp = {};;

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

(function () {
	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;

	Comp.Header = (function (_React$Component2) {
		_inherits(_class2, _React$Component2);

		function _class2(props) {
			_classCallCheck(this, _class2);

			_get(Object.getPrototypeOf(_class2.prototype), "constructor", this).call(this, props);
			this.state = { text: undefined };
		}

		_createClass(_class2, [{
			key: "render",
			value: function render() {
				return React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "center", id: "banner" },
						React.createElement("img", { className: "center", src: "assets/images/logo.svg" })
					),
					React.createElement(
						"h1",
						{ className: "center" },
						"ripsaw.js"
					),
					React.createElement(
						"h2",
						{ className: "center" },
						"interactive product design in the browser"
					),
					React.createElement(
						"div",
						{ className: "nav" },
						this.renderHelp(),
						React.createElement(Nav, { changeText: this.changeText.bind(this) })
					)
				);
			}
		}, {
			key: "renderHelp",
			value: function renderHelp() {
				var text = this.state.text;
				if (!text) {
					return;
				}
				return React.createElement(
					"div",
					{ className: "jumper-hover-help" },
					text
				);
			}
		}, {
			key: "changeText",
			value: function changeText(text) {
				this.setState({ text: text });
			}
		}]);

		return _class2;
	})(React.Component);

	var buttons = [{
		'name': 'Home',
		'icon': 'home',
		'url': 'home'
	}, {
		'name': 'Concept',
		'icon': 'lightbulb-o',
		'url': 'home'
	}, {
		'name': 'Tutorial',
		'icon': 'mortar-board',
		'url': 'home'
	}, {
		'name': 'Documentation',
		'icon': 'book',
		'url': 'home'
	}, {
		'name': 'Code',
		'icon': 'github',
		'url': 'home'
	}, {
		'name': 'Demo',
		'icon': 'play-circle',
		'url': 'home'
	}];

	var Nav = (function (_React$Component3) {
		_inherits(Nav, _React$Component3);

		function Nav() {
			_classCallCheck(this, Nav);

			_get(Object.getPrototypeOf(Nav.prototype), "constructor", this).apply(this, arguments);
		}

		_createClass(Nav, [{
			key: "render",
			value: function render() {
				return React.createElement(
					"ul",
					null,
					this.renderButtons()
				);
			}
		}, {
			key: "renderButtons",
			value: function renderButtons() {
				var _this = this;

				return buttons.map(function (button, i) {
					var cls = "fa fa-" + button.icon + " fa-3x";
					return React.createElement(
						"li",
						null,
						React.createElement(
							Link,
							{
								to: "home",
								onMouseEnter: _this.changeText.bind(_this, button.name),
								onMouseLeave: _this.changeText.bind(_this, undefined)
							},
							React.createElement("i", { className: cls })
						)
					);
				});
			}
		}, {
			key: "changeText",
			value: function changeText(text) {
				this.props.changeText(text);
			}
		}]);

		return Nav;
	})(React.Component);
})();

;

Comp.Code = (function (_React$Component4) {
	_inherits(_class3, _React$Component4);

	function _class3() {
		_classCallCheck(this, _class3);

		_get(Object.getPrototypeOf(_class3.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class3, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"div",
						{ className: "grid-8 grid-offset-2" },
						React.createElement(
							"p",
							null,
							"The ",
							React.createElement(
								"a",
								{ href: "https://github.com/pickled-plugins/ripsaw-demo", target: "_blank" },
								"GitHub project"
							),
							" contains a light version of the library and a back-end demo using Rails."
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"a",
						{ className: "grid-3 center", href: "https://github.com/pickled-plugins/ripsaw-demo", target: "_blank" },
						React.createElement(
							"div",
							{ "class": "icon-group" },
							React.createElement("i", { className: "fa fa-play-circle-o fa-5x", "data-ch": "1" }),
							React.createElement("i", { className: "fa fa-github fa-2x" })
						)
					)
				)
			);
		}
	}]);

	return _class3;
})(React.Component);

Comp.Documentation = (function (_React$Component5) {
	_inherits(_class4, _React$Component5);

	function _class4() {
		_classCallCheck(this, _class4);

		_get(Object.getPrototypeOf(_class4.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class4, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"p",
						{ className: "grid-8 grid-offset-2" },
						"Browse the ",
						React.createElement(
							"a",
							{ href: "doc/RIPSAW.html", target: "_blank" },
							"API documentation"
						),
						" to explore other ways of customizing maker apps powered by ripsaw.js."
					),
					React.createElement(
						"p",
						{ className: "grid-8 grid-offset-2" },
						"ripsaw's consistent API allows developers to create extensions with new interactive geometries. All you need to do is create a constructor that inherits from RIPSAW.MasterPiece and provides the same core methods as RIPSAW.Bezier2D - the sample constructor featured in this demo."
					),
					React.createElement(
						"p",
						{ className: "grid-8 grid-offset-2" },
						"This website will soon feature a developers' tutorial demonstrating how to create a ripsaw extension that allows users to design a rectangle interactively."
					)
				),
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"a",
						{ className: "grid-4 center", href: "doc/RIPSAW.html", target: "_blank" },
						React.createElement(
							"div",
							{ className: "icon-group" },
							React.createElement("i", { className: "fa fa-play-circle-o fa-5x", "data-ch": "1" }),
							React.createElement("i", { className: "fa fa-book fa-2x" })
						)
					)
				)
			);
		}
	}]);

	return _class4;
})(React.Component);

Comp.Concept = (function (_React$Component6) {
	_inherits(_class5, _React$Component6);

	function _class5() {
		_classCallCheck(this, _class5);

		_get(Object.getPrototypeOf(_class5.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class5, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"p",
						{ className: "grid-10 grid-offset-1" },
						"ripsaw aspires to make design within reach for people who do not think of themselves as designers. This is a joint product design and software challenge guided by the following principles:"
					),
					React.createElement(
						"p",
						{ className: "grid-8 grid-offset-2" },
						"# maximize complexity while minimizing control parameters"
					),
					React.createElement(
						"p",
						{ className: "grid-8 grid-offset-2" },
						"# provide seamless interactions "
					),
					React.createElement(
						"p",
						{ className: "grid-8 grid-offset-2" },
						"# maintain feasibility"
					),
					React.createElement(
						"p",
						{ className: "grid-10 grid-offset-1" },
						"These shelf prototypes would take a fair amount of time to design, redesign and evaluate in classical CAD programs."
					),
					React.createElement(
						"div",
						{ className: "img" },
						React.createElement("img", { className: "center grid-3 grid-offset-2", src: "assets/images/concept/img-01.svg" }),
						React.createElement("img", { className: "center grid-3 grid-offset-2", src: "assets/images/concept/img-02.svg" })
					),
					React.createElement(
						"p",
						{ className: "grid-10 grid-offset-1" },
						"ripsaw builds these complex shapes based on mere 5 control points. A slight change in the arrangement of these points produces significant changes in the geometry, which is understood and customized easily by anyone."
					),
					React.createElement(
						"div",
						{ className: "img" },
						React.createElement("img", { className: "center", src: "assets/images/concept/img-03.svg" }),
						React.createElement("img", { className: "center", src: "assets/images/concept/img-04.svg" })
					),
					React.createElement(
						"p",
						{ className: "grid-10 grid-offset-1" },
						"The mathematical concept (in this case, a city Voronoi diagram) does the hard work of generating the shape, keeping the user's focus on usability and aesthetics."
					)
				)
			);
		}
	}]);

	return _class5;
})(React.Component);

Comp.Home = (function (_React$Component7) {
	_inherits(_class6, _React$Component7);

	function _class6() {
		_classCallCheck(this, _class6);

		_get(Object.getPrototypeOf(_class6.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class6, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"div",
						{ className: "grid-6" },
						React.createElement(
							"p",
							null,
							"Everyone can design. Even if there appears to be an 'entry barrier' sometimes."
						)
					),
					React.createElement(
						"div",
						{ className: "grid-6 hide-small" },
						React.createElement("img", { className: "center", src: "assets/images/design-1.svg" })
					)
				),
				React.createElement(
					"div",
					{ className: "row clearfix row-close" },
					React.createElement(
						"div",
						{ className: "grid-6 hide-small" },
						React.createElement("img", { className: "center", src: "assets/images/design-2.svg" })
					),
					React.createElement(
						"div",
						{ className: "grid-6" },
						React.createElement(
							"p",
							null,
							"There shouldn't be!"
						),
						React.createElement(
							"p",
							null,
							"ripsaw.js is a lightweight JavaScript library that aspires to power a suite of maker apps tailored specifically to people without a design background. These browser apps are conceived to make design a simple, intuitive and clean process, in a way that does not compromise freedom of expression."
						),
						React.createElement(
							"p",
							null,
							"This project was born as a proof of concept to this idea."
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row clearfix row-close" },
					React.createElement(
						"div",
						{ className: "grid-6" },
						React.createElement(
							"p",
							null,
							"Could you imagine designing a freeform fork such as this one with only 15 minutes of 3d modeling experience?"
						)
					),
					React.createElement(
						"div",
						{ className: "grid-6" },
						React.createElement("img", { className: "center", src: "assets/images/fork3d.svg" })
					)
				),
				React.createElement(
					"div",
					{ className: "row row-close clearfix" },
					React.createElement(
						"p",
						{ className: "grid-12 center" },
						"See for yourself - check out ripsaw's two live demos below:"
					)
				),
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"div",
						{ className: "demo grid-5 grid-offset-1" },
						React.createElement(
							"a",
							{ className: "center", href: "ripsaw-yourk/index.html", target: "_blank" },
							React.createElement(
								"div",
								{ className: "icon-group" },
								React.createElement("i", { className: "fa fa-play-circle-o fa-5x", "data-ch": "1" }),
								React.createElement("i", { className: "fa fa-child fa-2x" })
							)
						),
						React.createElement(
							"p",
							{ className: "center" },
							"A first 3d experiment published in December 2013. Walk through creating your very own 3d utensil piece with the help of an interactive tutorial."
						)
					),
					React.createElement(
						"div",
						{ className: "demo grid-5" },
						React.createElement(
							"a",
							{ className: "center", href: "http://ripsaw-demo.herokuapp.com", target: "_blank" },
							React.createElement(
								"div",
								{ className: "icon-group" },
								React.createElement("i", { className: "fa fa-play-circle-o fa-5x", "data-ch": "1" }),
								React.createElement("i", { className: "fa fa-users fa-2x" })
							)
						),
						React.createElement(
							"p",
							{ className: "center" },
							"Proof of concept and UX testing environment for a social platform for product design. Create, share and save 'masterpieces', and view everybody else's."
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"p",
						{ className: "grid-12 center" },
						"Enjoy, browse around and check out the source on ",
						React.createElement(
							"a",
							{ href: "https://github.com/pickled-plugins/ripsaw-demo", target: "_blank" },
							"GitHub"
						),
						"."
					)
				)
			);
		}
	}]);

	return _class6;
})(React.Component);

Comp.Documentation = (function (_React$Component8) {
	_inherits(_class7, _React$Component8);

	function _class7() {
		_classCallCheck(this, _class7);

		_get(Object.getPrototypeOf(_class7.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class7, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ id: "tut-nav" },
					React.createElement(
						"a",
						{ href: "#pages/tutorial/1" },
						React.createElement("i", { className: "fa fa-puzzle-piece fa-2x" })
					),
					React.createElement(
						"a",
						{ href: "#pages/tutorial/2" },
						React.createElement("i", { className: "fa fa-puzzle-piece fa-2x" })
					),
					React.createElement(
						"a",
						{ href: "#pages/tutorial/3" },
						React.createElement("i", { className: "fa fa-puzzle-piece fa-2x" })
					),
					React.createElement(
						"a",
						{ href: "#pages/tutorial/4" },
						React.createElement("i", { className: "fa fa-puzzle-piece fa-2x" })
					)
				),
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"p",
						{ className: "grid-12 center" },
						"This tutorial walks through creating a simple guided design app on your webpage."
					),
					React.createElement(
						"p",
						{ className: "grid-12 center" },
						"Use the puzzle pieces to navigate through the steps."
					)
				)
			);
		}
	}]);

	return _class7;
})(React.Component);

(function () {

	var Router = ReactRouter;
	var _ReactRouter2 = ReactRouter;
	var Route = _ReactRouter2.Route;
	var RouteHandler = _ReactRouter2.RouteHandler;
	var Link = _ReactRouter2.Link;
	var HistoryLocation = _ReactRouter2.HistoryLocation;
	var HashLocation = _ReactRouter2.HashLocation;
	var Redirect = _ReactRouter2.Redirect;

	Comp.routes = 'apples';

	var Header = Comp.Header;
	var Footer = Comp.Footer;
	var Home = Comp.Home;
	var Code = Comp.Code;

	var Layout = (function (_React$Component9) {
		_inherits(Layout, _React$Component9);

		function Layout() {
			_classCallCheck(this, Layout);

			_get(Object.getPrototypeOf(Layout.prototype), "constructor", this).apply(this, arguments);
		}

		_createClass(Layout, [{
			key: "render",
			value: function render() {
				return React.createElement(
					"div",
					null,
					React.createElement(Header, null),
					React.createElement("div", { className: "separator" }),
					React.createElement(RouteHandler, null),
					React.createElement("div", { className: "separator" }),
					React.createElement(Footer, null)
				);
			}
		}]);

		return Layout;
	})(React.Component);

	var routes = React.createElement(
		Route,
		{ handler: Layout },
		React.createElement(Route, { name: "home", path: "home", handler: Home }),
		React.createElement(Route, { name: "code", path: "code", handler: Code }),
		React.createElement(Redirect, { from: "/", to: "home" })
	);

	var el = document.getElementsByClassName('wrapper')[0];

	Router.run(routes, Router.HashLocation, function (Root, state) {
		console.log('routing');
		React.render(React.createElement(Root, null), el);
	});
})();