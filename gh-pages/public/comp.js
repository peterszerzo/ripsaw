"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
				{ className: "footer" },
				React.createElement(
					"div",
					{ className: "center footer__logo" },
					React.createElement("img", { className: "center", src: "assets/images/logo.svg" })
				),
				React.createElement(
					"p",
					{ className: "center footer__credit" },
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
					{ className: "header" },
					React.createElement(
						"div",
						{ className: "header__logo center" },
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
				var text = this.state.text,
				    cls = text ? 'nav__help' : 'nav__help invisible';
				return React.createElement(
					"div",
					{ className: cls },
					text || 'a'
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
		'url': 'concept'
	}, {
		'name': 'Tutorial',
		'icon': 'mortar-board',
		'url': 'tutorial'
	}, {
		'name': 'Documentation',
		'icon': 'book',
		'url': 'documentation'
	}, {
		'name': 'Code',
		'icon': 'github',
		'url': 'https://github.com/pickled-plugins/ripsaw-js',
		isOutsideLink: true
	}, {
		'name': 'Demo',
		'icon': 'play-circle',
		'url': 'public/ripsaw-yourk/index.html',
		isOutsideLink: true
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
					var cls = "fa fa-" + button.icon + " fa-3x",
					    Comp = button.isOutsideLink ? 'a' : Link,
					    hrefProp = button.isOutsideLink ? { href: button.url } : { to: button.url };
					return React.createElement(
						"li",
						null,
						React.createElement(
							Comp,
							_extends({}, hrefProp, {
								onMouseEnter: _this.changeText.bind(_this, button.name),
								onMouseLeave: _this.changeText.bind(_this, undefined)
							}),
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

Comp.Concept = (function (_React$Component4) {
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
				{ className: "content__inner" },
				React.createElement(
					"div",
					{ className: "static" },
					React.createElement(
						"p",
						null,
						"ripsaw aspires to make design within reach for people who do not think of themselves as designers. This is a joint product design and software challenge guided by the following principles:"
					),
					React.createElement(
						"ul",
						null,
						React.createElement(
							"li",
							null,
							"maximize complexity while minimizing control parameters"
						),
						React.createElement(
							"li",
							null,
							"provide seamless interactions "
						),
						React.createElement(
							"li",
							null,
							"maintain feasibility"
						)
					),
					React.createElement(
						"p",
						null,
						"These shelf prototypes would take a fair amount of time to design, redesign and evaluate in classical CAD programs."
					),
					React.createElement("img", { src: "assets/images/concept/img-01.svg" }),
					React.createElement("img", { src: "assets/images/concept/img-02.svg" }),
					React.createElement(
						"p",
						null,
						"ripsaw builds these complex shapes based on mere 5 control points. A slight change in the arrangement of these points produces significant changes in the geometry, which is understood and customized easily by anyone."
					),
					React.createElement("img", { src: "assets/images/concept/img-03.svg" }),
					React.createElement("img", { src: "assets/images/concept/img-04.svg" }),
					React.createElement(
						"p",
						null,
						"The mathematical concept (in this case, a city Voronoi diagram) does the hard work of generating the shape, keeping the user's focus on usability and aesthetics."
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
				{ className: "content__inner" },
				React.createElement(
					"div",
					{ className: "static" },
					React.createElement(
						"p",
						null,
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
						null,
						"ripsaw's consistent API allows developers to create extensions with new interactive geometries. All you need to do is create a constructor that inherits from RIPSAW.MasterPiece and provides the same core methods as RIPSAW.Bezier2D - the sample constructor featured in this demo."
					),
					React.createElement(
						"p",
						null,
						"This website will soon feature a developers' tutorial demonstrating how to create a ripsaw extension that allows users to design a rectangle interactively."
					),
					React.createElement(
						"a",
						{ href: "doc/RIPSAW.html", target: "_blank" },
						React.createElement("i", { className: "fa fa-play-circle-o fa-5x", "data-ch": "1" })
					)
				)
			);
		}
	}]);

	return _class4;
})(React.Component);

Comp.Home = (function (_React$Component6) {
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
				{ className: "content__inner" },
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"div",
						{ className: "grid-6" },
						React.createElement(
							"p",
							null,
							"Everyone can design. Even if there appears to be an entry barrier sometimes."
						)
					),
					React.createElement(
						"div",
						{ className: "grid-6" },
						React.createElement("img", { className: "center", src: "assets/images/design-1.svg" })
					)
				),
				React.createElement("div", { className: "content__separator" }),
				React.createElement(
					"div",
					{ className: "row clearfix row-close" },
					React.createElement(
						"div",
						{ className: "grid-6" },
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
							"ripsaw.js is a lightweight JavaScript library that powers maker apps navigated easily by people without a design background. Design becomes a simple, intuitive and clean process, posing little compromise freedom of expression."
						)
					)
				),
				React.createElement("div", { className: "content__separator" }),
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
				React.createElement("div", { className: "content__separator" }),
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
						{ className: "grid-6" },
						React.createElement(
							"p",
							null,
							"A first 3d experiment published in December 2013. Walk through creating your very own 3d utensil piece with the help of an interactive tutorial."
						)
					),
					React.createElement(
						"div",
						{ className: "grid-6" },
						React.createElement(
							"a",
							{ href: "ripsaw-yourk/index.html", target: "_blank" },
							React.createElement("i", { className: "fa fa-play-circle-o fa-5x", "data-ch": "1" })
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"div",
						{ className: "grid-6" },
						React.createElement(
							"p",
							null,
							"Proof of concept and UX testing environment for a social platform for product design. Create, share and save 'masterpieces', and view everybody else's."
						)
					),
					React.createElement(
						"div",
						{ className: "grid-6" },
						React.createElement(
							"a",
							{ href: "http://ripsaw-demo.herokuapp.com", target: "_blank" },
							React.createElement("i", { className: "fa fa-play-circle-o fa-5x", "data-ch": "1" })
						)
					)
				),
				React.createElement("div", { className: "content__separator" }),
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

	return _class5;
})(React.Component);

(function () {
	var _ReactRouter2 = ReactRouter;
	var Link = _ReactRouter2.Link;

	var htmlCode = "<!DOCTYPE html>\n<html>\n<head>\n\t<title>ripsaw example</title>\n\t<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">\n</head>\n\n<body>\n\t<div id=\"ripsaw-app\"></div>\n\t<script src=\"ripsaw.js\"></script>\n\t<script src=\"ripsaw-app.js\"></script>\t\n</body>\n</html>\n";

	var cssCode = "body { margin: 0; }\n\n#ripsaw-app {\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\twidth: 100%;\n}\n";

	var jsCode = "var geometry = RIPSAW.textAssets.shapeLibrary[\"fork\"];\n\n// set masterpiece\nRIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry);\n\n// scale geometry into (-0.5, -0.5) - (+0.5, +0.5) rectangle\nRIPSAW.masterPiece.normalize(); \n\n// create canvas and add mouse event listeners\nRIPSAW.init();\n\n// run application (setInterval)\nRIPSAW.launch();\n";

	var jsCode2 = "var geometry = RIPSAW.textAssets.shapeLibrary[\"moustache\"];\n\nRIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry).normalize();\n\n// set new color scheme\nRIPSAW.colors.schemes.fresh: [\n    [178, 88, 79],   // 0: background\n    [230, 255, 95],  // 1: title\n    [255, 22, 0],    // 2: subtitle\n    [20, 105, 204],  // 3: misc text\n    [92, 132, 178],  // 4: control handle endpoints\n    [61, 103, 196],  // 5: control handle midpoint\n    [95, 90, 113],   // 6: nav bounding boxes\n    [255, 255, 255]  // 7: curve strokes\t\n];\n\n// set new color scheme as active\nRIPSAW.colors.activeScheme = \"fresh\";\n\n// change container ID\nRIPSAW.containerID = 'new-wrapper';\n\nRIPSAW.init().launch();\n";

	Comp.Tutorial = (function (_React$Component7) {
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
					{ className: "content__inner" },
					React.createElement(
						"div",
						{ className: "static" },
						React.createElement(
							"p",
							null,
							"Setting up a basic ripsaw app is simple. Just include a div with a ’ripsaw-app’ id that will contain ripsaw’s dynamically generated canvas. All magic happens within."
						),
						React.createElement(
							"div",
							{ className: "code" },
							React.createElement(
								"div",
								{ className: "code-filename" },
								"index.html"
							),
							React.createElement(
								"div",
								{ className: "code-content" },
								React.createElement(
									"pre",
									null,
									htmlCode
								)
							)
						),
						React.createElement(
							"p",
							null,
							"On the JavaScript side, all information about the geometry of the product is stored in a RIPSAW.masterPiece object. The Bezier2D constructor sets up this object as a 2d bezier spline using the \"fork\" template."
						),
						React.createElement(
							"div",
							{ className: "code" },
							React.createElement(
								"div",
								{ className: "code-filename" },
								"ripsaw-app.js"
							),
							React.createElement(
								"div",
								{ className: "code-content" },
								React.createElement(
									"pre",
									null,
									jsCode
								)
							)
						),
						React.createElement(
							"p",
							null,
							"Finally, add some css to make sure that the container div fills the screen. But then again, you don’t have to. ripsaw scales the app to any size container - so feel free to experiment ~"
						),
						React.createElement(
							"div",
							{ className: "code" },
							React.createElement(
								"div",
								{ className: "code-filename" },
								"style.css"
							),
							React.createElement(
								"div",
								{ className: "code-content" },
								React.createElement(
									"pre",
									null,
									cssCode
								)
							)
						),
						React.createElement(
							"p",
							null,
							"Like so!"
						),
						React.createElement("div", { id: "ripsaw-app" }),
						React.createElement(
							"p",
							null,
							"There is much room for customization. Add a new fresh color scheme and change to a new template."
						),
						React.createElement(
							"div",
							{ className: "code" },
							React.createElement(
								"div",
								{ className: "code-filename" },
								"ripsaw-app.js"
							),
							React.createElement(
								"div",
								{ className: "code-content" },
								React.createElement(
									"pre",
									null,
									jsCode2
								)
							)
						)
					)
				);
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {

				var geometry = RIPSAW.textAssets.shapeLibrary["fork"];

				// set masterpiece
				RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry);

				// scale geometry into (-0.5, -0.5) - (+0.5, +0.5) rectangle
				RIPSAW.masterPiece.normalize();

				// create canvas and add mouse event listeners
				RIPSAW.init();

				// run application (setInterval)
				RIPSAW.launch();
			}
		}, {
			key: "componentWillUnmount",
			value: function componentWillUnmount() {}
		}]);

		return _class6;
	})(React.Component);
})();

;

(function () {

	Comp.Tutorial.Part1 = (function (_React$Component8) {
		_inherits(_class7, _React$Component8);

		function _class7() {
			_classCallCheck(this, _class7);

			_get(Object.getPrototypeOf(_class7.prototype), "constructor", this).apply(this, arguments);
		}

		_createClass(_class7, [{
			key: "render",
			value: function render() {
				var TutorialNav = Comp.TutorialNav;
				return React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ "class": "row clearfix" },
						React.createElement(
							"p",
							{ "class": "grid-4 code-description" },
							"Setting up a basic ripsaw app is simple. Just include a div with a ’ripsaw-app’ id that will contain ripsaw’s dynamically generated canvas. All magic happens within."
						),
						React.createElement(
							"div",
							{ "class": "code grid-8" },
							React.createElement(
								"div",
								{ "class": "code-filename" },
								"index.html"
							),
							React.createElement(
								"div",
								{ "class": "code-content" },
								React.createElement(
									"pre",
									null,
									htmlCode
								)
							)
						)
					),
					React.createElement(
						"div",
						{ "class": "row clearfix" },
						React.createElement(
							"p",
							{ "class": "grid-4 code-description" },
							"On the JavaScript side, all information about the geometry of the product is stored in a RIPSAW.masterPiece object. The Bezier2D constructor sets up this object as a 2d bezier spline using the \"fork\" template."
						),
						React.createElement(
							"div",
							{ "class": "code grid-8" },
							React.createElement(
								"div",
								{ "class": "code-filename" },
								"ripsaw-app.js"
							),
							React.createElement(
								"div",
								{ "class": "code-content" },
								React.createElement(
									"pre",
									null,
									jsCode
								)
							)
						)
					),
					React.createElement(
						"div",
						{ "class": "row clearfix" },
						React.createElement(
							"p",
							{ "class": "grid-4 code-description" },
							"Finally, add some css to make sure that the container div fills the screen. But then again, you don’t have to. ripsaw scales the app to any size container - so feel free to experiment ~"
						),
						React.createElement(
							"div",
							{ "class": "code grid-8" },
							React.createElement(
								"div",
								{ "class": "code-filename" },
								"style.css"
							),
							React.createElement(
								"div",
								{ "class": "code-content" },
								React.createElement(
									"pre",
									null,
									cssCode
								)
							)
						)
					),
					React.createElement(
						"div",
						{ "class": "row clearfix" },
						React.createElement("div", { "class": "grid-8 grid-offset-2", id: "ripsaw-app" })
					),
					React.createElement(
						"div",
						{ "class": "row row-no-space" },
						React.createElement(
							"p",
							{ "class": "grid-2 grid-offset-2 code-description" },
							"~ like so!"
						)
					)
				);
			}
		}]);

		return _class7;
	})(React.Component);
})();;

Comp.Tutorial.Part2 = (function (_React$Component9) {
	_inherits(_class8, _React$Component9);

	function _class8() {
		_classCallCheck(this, _class8);

		_get(Object.getPrototypeOf(_class8.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class8, [{
		key: "render",
		value: function render() {
			var TutorialNav = Comp.TutorialNav;
			return React.createElement(
				"div",
				null,
				React.createElement(TutorialNav, null),
				React.createElement(
					"div",
					{ "class": "row clearfix" },
					React.createElement(
						"p",
						{ "class": "grid-4 code-description" },
						"There is much room for customization. Add a new fresh color scheme and change to a new template."
					),
					React.createElement(
						"div",
						{ "class": "code grid-8" },
						React.createElement(
							"div",
							{ "class": "code-filename" },
							"ripsaw-app.js"
						),
						React.createElement(
							"div",
							{ "class": "code-content" },
							React.createElement(
								"pre",
								null,
								"` var geometry = RIPSAW.textAssets.shapeLibrary[\"moustache\"]; RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry) .normalize(); // set new color scheme RIPSAW.colors.schemes.fresh: [ [178, 88, 79],   // 0: background [230, 255, 95],  // 1: title [255, 22, 0],    // 2: subtitle [20, 105, 204],  // 3: misc text [92, 132, 178],  // 4: control handle endpoints [61, 103, 196],  // 5: control handle midpoint [95, 90, 113],   // 6: nav bounding boxes [255, 255, 255]  // 7: curve strokes ]; // set new color scheme as active RIPSAW.colors.activeScheme = \"fresh\"; // change container ID RIPSAW.containerID = 'new-wrapper'; RIPSAW.init().launch(); `"
							)
						)
					)
				)
			);
		}
	}]);

	return _class8;
})(React.Component);

(function () {

	var jsCode = "\nRIPSAW.masterPiece = new RIPSAW.Bezier2D(\"M138,108C116,38,281,98,290,145s-64,44-76,115S51,316,91,230S148,142,138,108z\")\n\t.normalize();\n\nRIPSAW.init().launch();\n";

	var text = 'Best of all, you can use your own creation as a template. Just initialize masterPiece with the path attribute of an SVG Bezier path (as drawn with the pen tool in Adobe Illustrator).';

	Comp.Tutorial.Part3 = (function (_React$Component10) {
		_inherits(_class9, _React$Component10);

		function _class9() {
			_classCallCheck(this, _class9);

			_get(Object.getPrototypeOf(_class9.prototype), "constructor", this).apply(this, arguments);
		}

		_createClass(_class9, [{
			key: "render",
			value: function render() {
				var TutorialNav = Comp.TutorialNav;
				return React.createElement(
					"div",
					null,
					React.createElement(TutorialNav, null),
					React.createElement(
						"div",
						{ "class": "row clearfix" },
						React.createElement(
							"p",
							{ "class": "grid-4 code-description" },
							text
						),
						React.createElement(
							"div",
							{ "class": "code grid-8" },
							React.createElement(
								"div",
								{ "class": "code-filename" },
								"ripsaw-app.js"
							),
							React.createElement(
								"div",
								{ "class": "code-content" },
								React.createElement(
									"pre",
									null,
									jsCode
								)
							)
						)
					)
				);
			}
		}]);

		return _class9;
	})(React.Component);
})();;

Comp.Tutorial.Part4 = (function (_React$Component11) {
	_inherits(_class10, _React$Component11);

	function _class10() {
		_classCallCheck(this, _class10);

		_get(Object.getPrototypeOf(_class10.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class10, [{
		key: "render",
		value: function render() {
			var TutorialNav = Comp.TutorialNav;
			return React.createElement(
				"div",
				null,
				React.createElement(TutorialNav, null),
				React.createElement(
					"div",
					{ "class": "row clearfix" },
					React.createElement(
						"div",
						{ "class": "grid-6" },
						React.createElement(
							"p",
							{ "class": "grid-12" },
							"ripsaw.js apps go a long way."
						),
						React.createElement(
							"p",
							{ "class": "grid-12" },
							"they have their own navigation and support for app tutorials in a single DOM element, the ripsaw canvas."
						)
					),
					React.createElement(
						"div",
						{ "class": "grid-6 row-close" },
						React.createElement(
							"p",
							{ "class": "grid-12" },
							"Coming up soon in this tutorial series:"
						),
						React.createElement("br", null),
						React.createElement(
							"p",
							{ "class": "grid-12" },
							"~ 3d demos"
						),
						React.createElement(
							"p",
							{ "class": "grid-12" },
							"~ more and better design experiments"
						),
						React.createElement(
							"p",
							{ "class": "grid-12" },
							"~ export to desktop 3d modeling software (Rhino, SketchUp) and 3d printers (MakerBot)"
						)
					)
				)
			);
		}
	}]);

	return _class10;
})(React.Component);

(function () {

	var Router = ReactRouter;
	var _ReactRouter3 = ReactRouter;
	var Route = _ReactRouter3.Route;
	var RouteHandler = _ReactRouter3.RouteHandler;
	var Link = _ReactRouter3.Link;
	var HistoryLocation = _ReactRouter3.HistoryLocation;
	var HashLocation = _ReactRouter3.HashLocation;
	var Redirect = _ReactRouter3.Redirect;
	var Header = Comp.Header;
	var Footer = Comp.Footer;
	var Home = Comp.Home;
	var Concept = Comp.Concept;
	var Tutorial = Comp.Tutorial;
	var Code = Comp.Code;
	var Documentation = Comp.Documentation;

	var Layout = (function (_React$Component12) {
		_inherits(Layout, _React$Component12);

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
					React.createElement(
						"div",
						{ className: "content" },
						React.createElement("div", { className: "content__margin" }),
						React.createElement(RouteHandler, null),
						React.createElement("div", { className: "content__margin" })
					),
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
		React.createElement(Route, { name: "concept", path: "concept", handler: Concept }),
		React.createElement(Route, { name: "tutorial", path: "tutorial", handler: Tutorial }),
		React.createElement(Route, { name: "documentation", path: "documentation", handler: Documentation }),
		React.createElement(Redirect, { from: "/", to: "home" })
	);

	var el = document.getElementsByClassName('wrapper')[0];

	Router.run(routes, Router.HashLocation, function (Root, state) {
		console.log(state);
		React.render(React.createElement(Root, null), el);
	});
})();