'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comp = {};
Comp.Concept = function () {
  return React.createElement(
    'div',
    { className: 'content__inner' },
    React.createElement(
      'div',
      { className: 'static' },
      React.createElement(
        'p',
        null,
        'ripsaw aspires to make design within reach for people who do not think of themselves as designers. This is a joint product design and software challenge guided by the following principles:'
      ),
      React.createElement(
        'ul',
        null,
        React.createElement(
          'li',
          null,
          'maximize complexity while minimizing control parameters'
        ),
        React.createElement(
          'li',
          null,
          'provide seamless interactions'
        ),
        React.createElement(
          'li',
          null,
          'maintain feasibility'
        )
      ),
      React.createElement(
        'p',
        null,
        'These shelf prototypes would take a fair amount of time to design, redesign and evaluate in classical CAD programs.'
      ),
      React.createElement('img', { src: 'images/concept/img-01.svg' }),
      React.createElement('img', { src: 'images/concept/img-02.svg' }),
      React.createElement(
        'p',
        null,
        'ripsaw builds these complex shapes based on mere 5 control points. A slight change in the arrangement of these points - as shown on the images below - produces significant changes in the geometry, which is understood and customized easily by anyone.'
      ),
      React.createElement('img', { src: 'images/concept/img-03.svg' }),
      React.createElement('img', { src: 'images/concept/img-04.svg' }),
      React.createElement(
        'p',
        null,
        'The mathematical concept (in this case, a city Voronoi diagram) does the hard work of generating the shape, keeping the designer\'s focus on usability and aesthetics.'
      )
    )
  );
};
Comp.Documentation = function () {
  return React.createElement(
    'div',
    { className: 'content__inner' },
    React.createElement(
      'div',
      { className: 'static' },
      React.createElement(
        'p',
        null,
        'Browse the ',
        React.createElement(
          'a',
          { href: 'doc/RIPSAW.html', target: '_blank' },
          'API documentation'
        ),
        ' to explore other ways of customizing maker apps powered by ripsaw.js.'
      ),
      React.createElement(
        'p',
        null,
        'ripsaw\'s consistent API allows developers to create extensions with new interactive geometries. All you need to do is create a constructor that inherits from RIPSAW.MasterPiece and provides the same core methods as RIPSAW.Bezier2D - the sample constructor featured in this demo.'
      ),
      React.createElement(
        'p',
        null,
        'This website will soon feature a developers\' tutorial demonstrating how to create a ripsaw extension that allows users to design a rectangle interactively.'
      )
    )
  );
};
Comp.Footer = function () {
  return React.createElement(
    'div',
    { className: 'footer' },
    React.createElement(
      'div',
      { className: 'center footer__logo' },
      React.createElement('img', { className: 'center', src: 'images/logo.svg' })
    ),
    React.createElement(
      'p',
      { className: 'center footer__credit' },
      'nerded out by Peter Szerzo',
      React.createElement('br', null),
      'hopping Brooklyn\u2019s finest coffee shops'
    )
  );
};
Comp.Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.state = {
      text: undefined
    };
    return _this;
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'header' },
        React.createElement(
          'div',
          { className: 'header__logo center' },
          React.createElement('img', { className: 'center', src: 'images/logo.svg' })
        ),
        React.createElement(
          'h1',
          { className: 'header__title center' },
          'ripsaw.js'
        ),
        React.createElement(
          'h2',
          { className: 'header__subtitle center' },
          'interactive product design in the browser'
        ),
        React.createElement(
          'div',
          { className: 'nav' },
          this.renderHelp(),
          React.createElement(Nav, { changeText: this.changeText.bind(this) })
        )
      );
    }
  }, {
    key: 'renderHelp',
    value: function renderHelp() {
      var text = this.state.text;
      var cls = text ? 'nav__help' : 'nav__help invisible';
      return React.createElement(
        'div',
        { className: cls },
        text || 'a'
      );
    }
  }, {
    key: 'changeText',
    value: function changeText(text) {
      this.setState({ text: text });
    }
  }]);

  return Header;
}(React.Component);

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
  'url': '/ripsaw-yourk/index.html',
  isOutsideLink: true
}];

var Nav = function (_React$Component2) {
  _inherits(Nav, _React$Component2);

  function Nav() {
    _classCallCheck(this, Nav);

    return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
  }

  _createClass(Nav, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'ul',
        null,
        this.renderButtons()
      );
    }
  }, {
    key: 'renderButtons',
    value: function renderButtons() {
      var _this3 = this;

      var Link = window.ReactRouter.Link;

      return buttons.map(function (button, i) {
        var cls = 'fa fa-' + button.icon + ' fa-3x',
            Comp = button.isOutsideLink ? 'a' : Link,
            hrefProp = button.isOutsideLink ? {
          href: button.url
        } : {
          to: button.url
        };
        return React.createElement(
          'li',
          null,
          React.createElement(
            Comp,
            _extends({}, hrefProp, { onMouseEnter: _this3.changeText.bind(_this3, button.name), onMouseLeave: _this3.changeText.bind(_this3, undefined) }),
            React.createElement('i', { className: cls })
          )
        );
      });
    }
  }, {
    key: 'changeText',
    value: function changeText(text) {
      this.props.changeText(text);
    }
  }]);

  return Nav;
}(React.Component);

(function () {

  var text = [['Everyone can design. Even if there appears to be an entry barrier sometimes.'], ["There shouldn't be!", 'ripsaw.js is a lightweight JavaScript library that powers maker apps navigated easily by people without a design background. Design becomes a simple, intuitive and clean process, posing little compromise freedom of expression.'], ['Could you imagine designing a freeform fork such as this one with only 15 minutes of 3d modeling experience?']];

  var tutorialIntro = "See for yourself - check out ripsaw's live demos below:";

  var tutorialTexts = ['A first 3d experiment published in December 2013. Walk through creating your very own 3d utensil piece with the help of an interactive tutorial.', "Proof of concept and UX testing environment for a social platform for product design. Create, share and save 'masterpieces', and view everybody else's."];

  var demos = {
    '2d-fork': {
      title: '2d Fork',
      masterPiece: new RIPSAW.Bezier2D(RIPSAW.textAssets.shapeLibrary['fork']).normalize(),
      hint: 'The basics, Adobe Illustrator style.'
    },
    '3d-fork': {
      title: '3d Fork',
      masterPiece: new RIPSAW.Bezier3D(RIPSAW.textAssets.shapeLibrary['fork']).setAllView(),
      hint: 'The basics, this time with a customizable depth profile.'
    },
    'pantograph': {
      title: 'Pantograph',
      masterPiece: new RIPSAW.CurvingPantograph(6, 0.5, 0.57, 0.52, 0.5, 0.8, 0.4).normalize(),
      hint: 'Animating a kinetic structure.'
    },
    'voronoi': {
      title: 'Voronoi',
      masterPiece: new RIPSAW.Voronoi().createIrregularGrid(5).normalize(0.5),
      hint: 'Move the points around and right-click to generate a Voronoi wavefront generator.'
    },
    oldDemo: {
      title: 'A first 3d experiment published in December 2013. Walk through creating your very own 3d utensil piece with the help of an interactive tutorial.',
      url: '/ripsaw-yourk/index.html'
    },
    railsDemo: {
      title: "Proof of concept and UX testing environment for a social platform for product design. Create, share and save creations, and view everybody else's.",
      url: 'http://ripsaw-demo.herokuapp.com/'
    }
  };

  RIPSAW.containerID = 'ripsaw';

  Comp.Home = function (_React$Component3) {
    _inherits(Home, _React$Component3);

    function Home(props) {
      _classCallCheck(this, Home);

      var _this4 = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

      _this4.state = {
        currentDemo: null
      };
      return _this4;
    }

    _createClass(Home, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          'div',
          { className: 'content__inner' },
          React.createElement(
            'div',
            { className: 'grid' },
            React.createElement(
              'div',
              { className: 'grid__col grid__col--1-of-2' },
              React.createElement(
                'p',
                null,
                text[0][0]
              )
            ),
            React.createElement(
              'div',
              { className: 'grid__col grid__col--1-of-2' },
              React.createElement('img', { className: 'center', src: 'images/design-1.svg' })
            )
          ),
          React.createElement('div', { className: 'content__separator' }),
          React.createElement(
            'div',
            { className: 'grid' },
            React.createElement(
              'div',
              { className: 'grid__col grid__col--1-of-2' },
              React.createElement('img', { className: 'center', src: 'images/design-2.svg' })
            ),
            React.createElement(
              'div',
              { className: 'grid__col grid__col--1-of-2' },
              React.createElement(
                'p',
                null,
                text[1][0]
              ),
              React.createElement(
                'p',
                null,
                text[1][1]
              )
            )
          ),
          React.createElement('div', { className: 'content__separator' }),
          React.createElement(
            'div',
            { className: 'grid' },
            React.createElement(
              'div',
              { className: 'grid__col grid__col--1-of-2' },
              React.createElement(
                'p',
                null,
                text[2][0]
              )
            ),
            React.createElement(
              'div',
              { className: 'grid__col grid__col--1-of-2' },
              React.createElement('img', { className: 'center', src: 'images/fork3d.svg' })
            )
          ),
          React.createElement('div', { className: 'content__separator' }),
          React.createElement(
            'p',
            { className: 'center' },
            tutorialIntro
          ),
          React.createElement(
            'div',
            { className: 'grid' },
            this.renderDemos()
          ),
          React.createElement('div', { className: 'content__separator' }),
          React.createElement(
            'div',
            { className: 'grid' },
            React.createElement(
              'p',
              { className: 'grid__col grid__col--centered grid__col--1-of-2' },
              'The library transforms any HTML container into a design playground, and lives happily on',
              React.createElement(
                'a',
                { href: 'https://github.com/pickled-plugins/ripsaw-demo', target: '_blank' },
                'GitHub'
              ),
              '.'
            )
          ),
          this.renderModal()
        );
      }
    }, {
      key: 'renderDemos',
      value: function renderDemos() {
        var _this5 = this;

        return Object.keys(demos).map(function (key) {
          var demo = demos[key];
          return React.createElement(
            'div',
            { className: 'grid__col grid__col--1-of-2' },
            React.createElement(
              'div',
              { className: 'demo-link', onClick: _this5.launchRipsawModal.bind(_this5, key) },
              React.createElement(
                'div',
                { className: 'demo-link__content' },
                React.createElement(
                  'p',
                  null,
                  demo.title
                )
              )
            )
          );
        });
      }
    }, {
      key: 'renderModal',
      value: function renderModal() {
        if (!this.state.currentDemo) {
          return;
        }
        var Modal = Comp.Modal;
        return React.createElement(Modal, { contentId: 'ripsaw', closeModal: this.deactivateModal.bind(this), hint: this.state.currentDemo.hint });
      }
    }, {
      key: 'launchRipsawModal',
      value: function launchRipsawModal(key) {
        var demo = demos[key];
        if (demo.url) {
          return window.open(demo.url);
        }
        RIPSAW.masterPiece = demo.masterPiece;
        this.setState({ currentDemo: demo });
      }
    }, {
      key: 'deactivateModal',
      value: function deactivateModal() {
        this.setState({ currentDemo: null });
      }
    }]);

    return Home;
  }(React.Component);
})();
Comp.Icons = {};

Comp.Icons.No = function () {
  return React.createElement(
    'svg',
    { viewBox: '0 0 100 100' },
    React.createElement('path', { d: 'M80.8,86.8c-1.6,0-3.1-0.6-4.2-1.8L50,58.5L23.4,85c-1.1,1.1-2.6,1.8-4.2,1.8c-1.6,0-3.1-0.6-4.2-1.8 c-1.1-1.1-1.8-2.6-1.8-4.2c0-1.6,0.6-3.1,1.8-4.2L41.5,50L15,23.4c-1.1-1.1-1.8-2.6-1.8-4.2c0-1.6,0.6-3.1,1.8-4.2 c1.1-1.1,2.6-1.8,4.2-1.8c1.6,0,3.1,0.6,4.2,1.8L50,41.5L76.6,15c1.1-1.1,2.6-1.8,4.2-1.8l0,0c1.6,0,3.1,0.6,4.2,1.8 c2.3,2.3,2.3,6.1,0,8.5L58.5,50L85,76.6c2.3,2.3,2.3,6.1,0,8.5C83.9,86.2,82.4,86.8,80.8,86.8z' })
  );
};
Comp.Modal = function (_React$Component4) {
  _inherits(_class, _React$Component4);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this6 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

    _this6.props.closeModal = _this6.props.closeModal;
    return _this6;
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'modal', onClick: this.handleOverlayClick.bind(this) },
        React.createElement(
          'div',
          { className: 'modal__close', onClick: this.handleCloseClick.bind(this) },
          React.createElement(Comp.Icons.No, null)
        ),
        React.createElement(
          'div',
          { className: 'modal__wrapper', onClick: this.stopPropagation },
          React.createElement(
            'div',
            { className: 'modal__header' },
            this.props.hint
          ),
          React.createElement('div', { className: 'modal__content', id: this.props.contentId })
        )
      );
    }
  }, {
    key: 'handleCloseClick',
    value: function handleCloseClick() {
      if (this.props.closeModal) {
        this.props.closeModal();
      }
    }
  }, {
    key: 'handleOverlayClick',
    value: function handleOverlayClick() {
      if (this.props.closeModal) {
        this.props.closeModal();
      }
    }
  }, {
    key: 'stopPropagation',
    value: function stopPropagation(e) {
      e.stopPropagation();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      RIPSAW.init();
      RIPSAW.launch();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }]);

  return _class;
}(React.Component);
Comp.Tutorial = function (_React$Component5) {
  _inherits(_class2, _React$Component5);

  function _class2() {
    _classCallCheck(this, _class2);

    return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
  }

  _createClass(_class2, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'content__inner' },
        React.createElement(
          'div',
          { className: 'static' },
          React.createElement(
            'p',
            null,
            'Setting up a basic ripsaw app is simple. Just include a div with a \u2019ripsaw-app\u2019 id that will contain ripsaw\u2019s dynamically generated canvas. All magic happens within.'
          ),
          React.createElement(
            'div',
            { className: 'code' },
            React.createElement(
              'div',
              { className: 'code-filename' },
              'index.html'
            ),
            React.createElement(
              'div',
              { className: 'code-content' },
              React.createElement(
                'pre',
                null,
                '<!DOCTYPE html>\n                <html>\n                <head>\n                \t<title>ripsaw example</title>\n                \t<link rel="stylesheet" type="text/css" href="style.css">\n                </head>\n\n                <body>\n                \t<div id="ripsaw-app"></div>\n                \t<script src="ripsaw.js"></script>\n                \t<script src="ripsaw-app.js"></script>\n                </body>\n                </html>\n                '
              )
            )
          ),
          React.createElement(
            'p',
            null,
            'On the JavaScript side, all information about the geometry of the product is stored in a RIPSAW.masterPiece object. The Bezier2D constructor sets up this object as a 2d bezier spline using the "fork" template.'
          ),
          React.createElement(
            'div',
            { className: 'code' },
            React.createElement(
              'div',
              { className: 'code-filename' },
              'ripsaw-app.js'
            ),
            React.createElement(
              'div',
              { className: 'code-content' },
              React.createElement(
                'pre',
                null,
                'var geometry = RIPSAW.textAssets.shapeLibrary["fork"];\n\n              // set masterpiece\n              RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry);\n\n              // scale geometry into (-0.5, -0.5) - (+0.5, +0.5) rectangle\n              RIPSAW.masterPiece.normalize();\n\n              // create canvas and add mouse event listeners\n              RIPSAW.init();\n\n              // run application (setInterval)\n              RIPSAW.launch();\n              '
              )
            )
          ),
          React.createElement(
            'p',
            null,
            'Finally, add some css to make sure that the container div fills the screen. But then again, you don\u2019t have to. ripsaw scales the app to any size container - so feel free to experiment ~'
          ),
          React.createElement(
            'div',
            { className: 'code' },
            React.createElement(
              'div',
              { className: 'code-filename' },
              'style.css'
            ),
            React.createElement(
              'div',
              { className: 'code-content' },
              React.createElement(
                'pre',
                null,
                'body { margin: 0; }\n\n              #ripsaw-app {\n              \tposition: absolute;\n              \ttop: 0;\n              \tbottom: 0;\n              \twidth: 100%;\n              }\n              '
              )
            )
          ),
          React.createElement(
            'p',
            null,
            'Like so!'
          ),
          React.createElement('div', { id: 'ripsaw-app' }),
          React.createElement(
            'p',
            null,
            'There is much room for customization. Add a new fresh color scheme and change to a new template.'
          ),
          React.createElement(
            'div',
            { className: 'code' },
            React.createElement(
              'div',
              { className: 'code-filename' },
              'ripsaw-app.js'
            ),
            React.createElement(
              'div',
              { className: 'code-content' },
              React.createElement(
                'pre',
                null,
                'var geometry = RIPSAW.textAssets.shapeLibrary["moustache"];\n\n              RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry).normalize();\n\n              // set new color scheme\n              RIPSAW.colors.schemes.fresh: [\n                  [178, 88, 79],   // 0: background\n                  [230, 255, 95],  // 1: title\n                  [255, 22, 0],    // 2: subtitle\n                  [20, 105, 204],  // 3: misc text\n                  [92, 132, 178],  // 4: control handle endpoints\n                  [61, 103, 196],  // 5: control handle midpoint\n                  [95, 90, 113],   // 6: nav bounding boxes\n                  [255, 255, 255]  // 7: curve strokes\n              ];\n\n              // set new color scheme as active\n              RIPSAW.colors.activeScheme = "fresh";\n\n              // change container ID\n              RIPSAW.containerID = \'new-wrapper\';\n\n              RIPSAW.init().launch();\n              '
              )
            )
          )
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var geometry = RIPSAW.textAssets.shapeLibrary['fork'];
      RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry);
      RIPSAW.masterPiece.normalize();
      RIPSAW.init();
      RIPSAW.launch();
    }
  }]);

  return _class2;
}(React.Component);

Comp.Tutorial.Part1 = function () {
  var TutorialNav = Comp.TutorialNav;
  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { 'class': 'row clearfix' },
      React.createElement(
        'p',
        { 'class': 'grid-4 code-description' },
        'Setting up a basic ripsaw app is simple. Just include a div with a \u2019ripsaw-app\u2019 id that will contain ripsaw\u2019s dynamically generated canvas. All magic happens within.'
      ),
      React.createElement(
        'div',
        { 'class': 'code grid-8' },
        React.createElement(
          'div',
          { 'class': 'code-filename' },
          'index.html'
        ),
        React.createElement(
          'div',
          { 'class': 'code-content' },
          React.createElement(
            'pre',
            null,
            htmlCode
          )
        )
      )
    ),
    React.createElement(
      'div',
      { 'class': 'row clearfix' },
      React.createElement(
        'p',
        { 'class': 'grid-4 code-description' },
        'On the JavaScript side, all information about the geometry of the product is stored in a RIPSAW.masterPiece object. The Bezier2D constructor sets up this object as a 2d bezier spline using the "fork" template.'
      ),
      React.createElement(
        'div',
        { 'class': 'code grid-8' },
        React.createElement(
          'div',
          { 'class': 'code-filename' },
          'ripsaw-app.js'
        ),
        React.createElement(
          'div',
          { 'class': 'code-content' },
          React.createElement(
            'pre',
            null,
            jsCode
          )
        )
      )
    ),
    React.createElement(
      'div',
      { 'class': 'row clearfix' },
      React.createElement(
        'p',
        { 'class': 'grid-4 code-description' },
        'Finally, add some css to make sure that the container div fills the screen. But then again, you don\u2019t have to. ripsaw scales the app to any size container - so feel free to experiment ~'
      ),
      React.createElement(
        'div',
        { 'class': 'code grid-8' },
        React.createElement(
          'div',
          { 'class': 'code-filename' },
          'style.css'
        ),
        React.createElement(
          'div',
          { 'class': 'code-content' },
          React.createElement(
            'pre',
            null,
            cssCode
          )
        )
      )
    ),
    React.createElement(
      'div',
      { 'class': 'row clearfix' },
      React.createElement('div', { 'class': 'grid-8 grid-offset-2', id: 'ripsaw-app' })
    ),
    React.createElement(
      'div',
      { 'class': 'row row-no-space' },
      React.createElement(
        'p',
        { 'class': 'grid-2 grid-offset-2 code-description' },
        '~ like so!'
      )
    )
  );
};

Comp.Tutorial.Part2 = function () {
  var TutorialNav = Comp.TutorialNav;
  return React.createElement(
    'div',
    null,
    React.createElement(TutorialNav, null),
    React.createElement(
      'div',
      { 'class': 'row clearfix' },
      React.createElement(
        'p',
        { 'class': 'grid-4 code-description' },
        'There is much room for customization. Add a new fresh color scheme and change to a new template.'
      ),
      React.createElement(
        'div',
        { 'class': 'code grid-8' },
        React.createElement(
          'div',
          { 'class': 'code-filename' },
          'ripsaw-app.js'
        ),
        React.createElement(
          'div',
          { 'class': 'code-content' },
          React.createElement(
            'pre',
            null,
            '\nvar geometry = RIPSAW.textAssets.shapeLibrary["moustache"];\n\nRIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry)\n\t.normalize();\n\n// set new color scheme\nRIPSAW.colors.schemes.fresh: [\n    [178, 88, 79],   // 0: background\n    [230, 255, 95],  // 1: title\n    [255, 22, 0],    // 2: subtitle\n    [20, 105, 204],  // 3: misc text\n    [92, 132, 178],  // 4: control handle endpoints\n    [61, 103, 196],  // 5: control handle midpoint\n    [95, 90, 113],   // 6: nav bounding boxes\n    [255, 255, 255]  // 7: curve strokes\n];\n\n// set new color scheme as active\nRIPSAW.colors.activeScheme = "fresh";\n\n// change container ID\nRIPSAW.containerID = \'new-wrapper\';\n\nRIPSAW.init().launch();\n'
          )
        )
      )
    )
  );
};

Comp.Tutorial.Part3 = function () {
  var jsCode = '\n\t\tRIPSAW.masterPiece = new RIPSAW.Bezier2D("M138,108C116,38,281,98,290,145s-64,44-76,115S51,316,91,230S148,142,138,108z")\n\t\t\t.normalize();\n\n\t\tRIPSAW.init().launch();\n\t\t';

  var text = 'Best of all, you can use your own creation as a template. Just initialize masterPiece with the path attribute of an SVG Bezier path (as drawn with the pen tool in Adobe Illustrator).';
  var TutorialNav = Comp.TutorialNav;
  return React.createElement(
    'div',
    null,
    React.createElement(TutorialNav, null),
    React.createElement(
      'div',
      { 'class': 'row clearfix' },
      React.createElement(
        'p',
        { 'class': 'grid-4 code-description' },
        text
      ),
      React.createElement(
        'div',
        { 'class': 'code grid-8' },
        React.createElement(
          'div',
          { 'class': 'code-filename' },
          'ripsaw-app.js'
        ),
        React.createElement(
          'div',
          { 'class': 'code-content' },
          React.createElement(
            'pre',
            null,
            jsCode
          )
        )
      )
    )
  );
};

Comp.Tutorial.Part4 = function () {
  var TutorialNav = Comp.TutorialNav;
  return React.createElement(
    'div',
    null,
    React.createElement(TutorialNav, null),
    React.createElement(
      'div',
      { 'class': 'row clearfix' },
      React.createElement(
        'div',
        { 'class': 'grid-6' },
        React.createElement(
          'p',
          { 'class': 'grid-12' },
          'ripsaw.js apps go a long way.'
        ),
        React.createElement(
          'p',
          { 'class': 'grid-12' },
          'they have their own navigation and support for app tutorials in a single DOM element, the ripsaw canvas.'
        )
      ),
      React.createElement(
        'div',
        { 'class': 'grid-6 row-close' },
        React.createElement(
          'p',
          { 'class': 'grid-12' },
          'Coming up soon in this tutorial series:'
        ),
        React.createElement('br', null),
        React.createElement(
          'p',
          { 'class': 'grid-12' },
          '~ 3d demos'
        ),
        React.createElement(
          'p',
          { 'class': 'grid-12' },
          '~ more and better design experiments'
        ),
        React.createElement(
          'p',
          { 'class': 'grid-12' },
          '~ export to desktop 3d modeling software (Rhino, SketchUp) and 3d printers (MakerBot)'
        )
      )
    )
  );
};
function start() {
  var _window$ReactRouter = window.ReactRouter,
      Router = _window$ReactRouter.Router,
      Route = _window$ReactRouter.Route,
      IndexRoute = _window$ReactRouter.IndexRoute,
      hashHistory = _window$ReactRouter.hashHistory;
  var Header = Comp.Header,
      Footer = Comp.Footer,
      Home = Comp.Home,
      Concept = Comp.Concept,
      Tutorial = Comp.Tutorial,
      Code = Comp.Code,
      Documentation = Comp.Documentation;


  function Layout(props) {
    return React.createElement(
      'div',
      null,
      React.createElement(Header, null),
      React.createElement(
        'div',
        { className: 'content' },
        React.createElement('div', { className: 'content__margin' }),
        props.children,
        React.createElement('div', { className: 'content__margin' })
      ),
      React.createElement(Footer, null)
    );
  }

  ReactDOM.render(React.createElement(
    Router,
    { history: hashHistory },
    React.createElement(
      Route,
      { path: '/', component: Layout },
      React.createElement(IndexRoute, { component: Home }),
      React.createElement(Route, { path: 'code', component: Code }),
      React.createElement(Route, { path: 'concept', component: Concept }),
      React.createElement(Route, { path: 'tutorial', component: Tutorial }),
      React.createElement(Route, { path: 'documentation', component: Documentation })
    )
  ), document.getElementById('app'));
}

start();

