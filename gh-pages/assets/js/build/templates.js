if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/footer/main.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<div class="center" id="footer">\n\n\t<img class="center" src="assets/images/logo.svg">\n\n</div>\n\n<p class="center" id="credit">nerded out by Peter Szerzo<br>hopping Brooklyn\'s finest coffee shops</p>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/header/main.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<div class="center" id="banner">\n\t<img class="center" src="assets/images/logo.svg">\n</div>\n\n<h1 class="center">ripsaw.js</h1>\n<h2 class="center">interactive product design in the browser</h2>\n\n<div class="nav">\n\t<div class="jumper-hover-help"></div>\n\t<ul>\n\t\t<li><a id="a-home" href="#pages/home"><i class="fa fa-home fa-3x"></i></a></li>\n\t\t<li><a id="a-concept" href="#pages/concept"><i class="fa fa-lightbulb-o fa-3x"></i></a></li>\n\t\t<li><a id="a-tutorial" href="#pages/tutorial"><i class="fa fa-mortar-board fa-3x"></i></a></li>\n\t\t<li><a id="a-documentation" href="#pages/documentation"><i class="fa fa-book fa-3x"></i></a></li>\n\t\t<li><a id="a-code" href="#pages/code"><i class="fa fa-github fa-3x"></i></a></li>\n\t\t<li><a href="ripsaw-yourk/index.html" target="_blank"><i class="fa fa-play-circle-o fa-3x"></i></a></li>\n\t</ul>\n</div>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/pages/code/main.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<div class="row clearfix">\n\n\t<div class="grid-8 grid-offset-2">\n\n\t\t<p>The <a href="https://github.com/pickled-plugins/ripsaw-demo" target="_blank">GitHub project</a> contains a light version of the library and a back-end demo using Rails.</p>\n\t\t\t\t\t\t\t\n\n\t</div>\n\n\n</div>\n\n<div class="row clearfix">\n\n\t<a class="grid-3 center" href="https://github.com/pickled-plugins/ripsaw-demo" target="_blank"><div class="icon-group"><i class="fa fa-play-circle-o fa-5x" data-ch="1"></i><i class="fa fa-github fa-2x"></i></div></a>\n\n</div>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/pages/concept/main.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<div class="row clearfix">\n\t\t\t\t\t\t\n\t<p class="grid-10 grid-offset-1">ripsaw aspires to make design within reach for people who do not think of themselves as designers. This is a joint product design and software challenge guided by the following principles:</p>\n\n\t<p class="grid-8 grid-offset-2"># maximize complexity while minimizing control parameters</p>\n\t<p class="grid-8 grid-offset-2"># provide seamless interactions </p>\n\t<p class="grid-8 grid-offset-2"># maintain feasibility</p>\n\n\t<p class="grid-10 grid-offset-1">These shelf prototypes would take a fair amount of time to design, redesign and evaluate in classical CAD programs.</p>\n\n\t<div class="img">\n\n\t\t<img class="center grid-3 grid-offset-2" src="assets/images/concept/img-01.svg">\n\n\t\t<img class="center grid-3 grid-offset-2" src="assets/images/concept/img-02.svg">\n\n\t</div>\n\n\t<p class="grid-10 grid-offset-1">ripsaw builds these complex shapes based on mere 5 control points. A slight change in the arrangement of these points produces significant changes in the geometry, which is understood and customized easily by anyone.</p>\n\t\t\t\t\t\t\n\t<div class="img">\t\n\t\t<img class="center" src="assets/images/concept/img-03.svg">\n\t\t<img class="center" src="assets/images/concept/img-04.svg">\n\n\t</div>\n\n\t<p class="grid-10 grid-offset-1">The mathematical concept (in this case, a city Voronoi diagram) does the hard work of generating the shape, keeping the user\'s focus on usability and aesthetics.</p>\n\n</div>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/pages/documentation/main.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<div class="row clearfix">\n\n\t<p class="grid-8 grid-offset-2">Browse the <a href="doc/RIPSAW.html" target="_blank">API documentation</a> to explore other ways of customizing maker apps powered by ripsaw.js.</p>\n\n\t<p class="grid-8 grid-offset-2">ripsaw\'s consistent API allows developers to create extensions with new interactive geometries. All you need to do is create a constructor that inherits from RIPSAW.MasterPiece and provides the same core methods as RIPSAW.Bezier2D - the sample constructor featured in this demo.</p>\n\n\t<p class="grid-8 grid-offset-2">This website will soon feature a developers\' tutorial demonstrating how to create a ripsaw extension that allows users to design a rectangle interactively.</p>\n\n</div>\n\n<div class="row clearfix">\n\n\t<a class="grid-4 center" href="doc/RIPSAW.html" target="_blank">\n\n\t\t<div class="icon-group">\n\t\t\t<i class="fa fa-play-circle-o fa-5x" data-ch="1"></i>\n\t\t\t<i class="fa fa-book fa-2x"></i>\n\t\t</div>\n\n\t</a>\n\n</div>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/pages/home/main.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('\t\t\t\t\t<div class="row clearfix">\n\n\t\t\t\t\t\t<div class="grid-6">\n\n\t\t\t\t\t\t\t<p>Everyone can design. Even if there appears to be an \'entry barrier\' sometimes.</p>\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="grid-6 hide-small"><img class="center" src="assets/images/design-1.svg"></div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row clearfix row-close">\n\n\t\t\t\t\t\t<div class="grid-6 hide-small"><img class="center" src="assets/images/design-2.svg"></div>\n\n\t\t\t\t\t\t<div class="grid-6">\n\n\t\t\t\t\t\t\t<p>There shouldn\'t be!</p>\n\n\t\t\t\t\t\t\t<p>ripsaw.js is a lightweight JavaScript library that aspires to power a suite of maker apps tailored specifically to people without a design background. These browser apps are conceived to make design a simple, intuitive and clean process, in a way that does not compromise freedom of expression.</p>\n\n\t\t\t\t\t\t\t<p>This project was born as a proof of concept to this idea.</p>\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row clearfix row-close">\n\n\t\t\t\t\t\t<div class="grid-6">\n\n\t\t\t\t\t\t\t<p>Could you imagine designing a freeform fork such as this one with only 15 minutes of 3d modeling experience?</p>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="grid-6"><img class="center" src="assets/images/fork3d.svg"></div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row row-close clearfix">\n\n\t\t\t\t\t\t<p class="grid-12 center">See for yourself - check out ripsaw\'s two live demos below:</p>\n\n\t\t\t\t\t</div>\n\n\n\t\t\t\t\t<div class="row clearfix">\n\n\t\t\t\t\t\t<div class="demo grid-5 grid-offset-1">\n\n\t\t\t\t\t\t\t<a class="center" href="ripsaw-yourk/index.html" target="_blank"><div class="icon-group"><i class="fa fa-play-circle-o fa-5x" data-ch="1"></i><i class="fa fa-child fa-2x"></i></div></a>\n\n\t\t\t\t\t\t\t<p class="center">A first 3d experiment published in December 2013. Walk through creating your very own 3d utensil piece with the help of an interactive tutorial.</p>\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="demo grid-5">\n\n\t\t\t\t\t\t\t<a class="center" href="http://ripsaw-demo.herokuapp.com" target="_blank"><div class="icon-group"><i class="fa fa-play-circle-o fa-5x" data-ch="1"></i><i class="fa fa-users fa-2x"></i></div></a>\n\n\t\t\t\t\t\t\t<p class="center">Proof of concept and UX testing environment for a social platform for product design. Create, share and save \'masterpieces\', and view everybody else\'s.</p>\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row clearfix">\n\t\t\t\t\t\t<p class="grid-12 center">Enjoy, browse around and check out the source on <a href="https://github.com/pickled-plugins/ripsaw-demo" target="_blank">GitHub</a>.</p>\n\t\t\t\t\t</div>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/pages/tutorial/main.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<div id="tut-nav">\n\t<a href="#pages/tutorial/1"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/2"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/3"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/4"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n</div>\n\n<div class="row clearfix">\n\n\t<p class="grid-12 center">This tutorial walks through creating a simple guided design app on your webpage.</p>\n\n\t<p class="grid-12 center">Use the puzzle pieces to navigate through the steps.</p>\n\n</div>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/pages/tutorial/pg/1.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<div id="tut-nav">\n\t<a href="#pages/tutorial/1"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/2"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/3"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/4"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n</div>\n\n<div class="row clearfix">\n\n\t\t\t\t\t\t<p class="grid-4 code-description">Setting up a basic ripsaw app is simple. Just include a div with a \'ripsaw-app\' id that will contain ripsaw\'s dynamically generated canvas. All magic happens within.</p>\n\n\t\t\t\t\t\t<div class="code grid-8">\n\t\t\t\t\t\t\t<div class="code-filename">index.html</div>\n\t\t\t\t\t\t\t<div class="code-content">\n\t\t\t\t\t\t\t\t<pre>\n&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n    &lt;title&gt;ripsaw example&lt;/title&gt;\n    &lt;link rel="stylesheet" type="text/css" href="style.css"&gt;\n&lt;/head&gt;\n\n&lt;body&gt;\n\n\t&lt;div id="ripsaw-app"&gt;&lt;/div&gt;\n\n\t&lt;script src="ripsaw-light.js"&gt;&lt;/script&gt;\n\n\t&lt;script src="ripsaw-app.js"&gt;&lt;/script&gt;\t\n\t\t\t    \n&lt;/body&gt;\n&lt;/html&gt;\n\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row clearfix">\n\t\t\t\t\t\t\n\t\t\t\t\t\t<p class="grid-4 code-description">On the JavaScript side, all information about the geometry of the product is stored in a RIPSAW.masterPiece object. The Bezier2D constructor sets up this object as a 2d bezier spline using the "fork" template.</p>\n\n\t\t\t\t\t\t<div class="code grid-8">\n\t\t\t\t\t\t\t<div class="code-filename">ripsaw-app.js</div>\n\t\t\t\t\t\t\t<div class="code-content">\n\t\t\t\t\t\t\t\t<pre>\nvar geometry = RIPSAW.textAssets.shapeLibrary["fork"];\n\n// set masterpiece\nRIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry);\n\n// scale geometry into (-0.5, -0.5) - (+0.5, +0.5) rectangle\nRIPSAW.masterPiece.normalize(); \n\n// create canvas and add mouse event listeners\nRIPSAW.init();\n\n// run application (setInterval)\nRIPSAW.launch();\n\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row clearfix">\n\n\t\t\t\t\t\t<p class="grid-4 code-description">Finally, add some css to make sure that the container div fills the screen. But then again, you don\'t have to. ripsaw scales the app to any size container - so feel free to experiment ~</p>\n\n\t\t\t\t\t\t<div class="code grid-8">\n\t\t\t\t\t\t\t<div class="code-filename">style.css</div>\n\t\t\t\t\t\t\t<div class="code-content">\n\t\t\t\t\t\t\t\t<pre>\nbody { margin: 0; }\n\n#ripsaw-app {\n\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\twidth: 100%;\n\n}\n\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row clearfix">\n\n\t\t\t\t\t\t<div class="grid-8 grid-offset-2" id="ripsaw-app"></div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row row-no-space">\n\n\t\t\t\t\t\t<p class="grid-2 grid-offset-2 code-description">~ like so!</p>\n\n\t\t\t\t\t</div>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/pages/tutorial/pg/2.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<div id="tut-nav">\n\t<a href="#pages/tutorial/1"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/2"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/3"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/4"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n</div>\n\n<div class="row clearfix">\n\n\t\t\t\t\t\t<p class="grid-4 code-description">There is much room for customization. Add a new fresh color scheme and change to a new template.</p>\n\n\t\t\t\t\t\t<div class="code grid-8">\n\t\t\t\t\t\t\t<div class="code-filename">ripsaw-app.js</div>\n\t\t\t\t\t\t\t<div class="code-content">\n\t\t\t\t\t\t\t\t<pre>\nvar geometry = RIPSAW.textAssets.shapeLibrary["moustache"];\n\nRIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry)\n\t.normalize();\n\n// set new color scheme\nRIPSAW.colors.schemes.fresh: [\n    [178, 88, 79],   // 0: background\n    [230, 255, 95],  // 1: title\n    [255, 22, 0],    // 2: subtitle\n    [20, 105, 204],  // 3: misc text\n    [92, 132, 178],  // 4: control handle endpoints\n    [61, 103, 196],  // 5: control handle midpoint\n    [95, 90, 113],   // 6: nav bounding boxes\n    [255, 255, 255]  // 7: curve strokes\t\n];\n\n// set new color scheme as active\nRIPSAW.colors.activeScheme = "fresh";\n\n// change container ID\nRIPSAW.containerID = \'new-wrapper\';\n\nRIPSAW.init().launch();\n\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/pages/tutorial/pg/3.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<div id="tut-nav">\n\t<a href="#pages/tutorial/1"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/2"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/3"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/4"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n</div>\n\n<div class="row clearfix">\n\n\t\t\t\t\t\t<p class="grid-4 code-description">Best of all, you can use your own creation as a template. Just initialize masterPiece with the path attribute of an SVG Bezier path (as drawn with the pen tool in Adobe Illustrator).</p>\n\n\t\t\t\t\t\t<div class="code grid-8">\n\t\t\t\t\t\t\t<div class="code-filename">ripsaw-app.js</div>\n\t\t\t\t\t\t\t<div class="code-content">\n\t\t\t\t\t\t\t\t<pre>\nRIPSAW.masterPiece = new RIPSAW.Bezier2D("M138,108C116,38,281,98,290,145s-64,44-76,115S51,316,91,230S148,142,138,108z")\n\t.normalize();\n\nRIPSAW.init().launch();\n\t\t\t\t\t\t\t\t</pre>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};

if (!window.JST) {
  window.JST = {};
}
window.JST["gh-pages/assets/js/templates/pages/tutorial/pg/4.jst"] = function(__obj) {
  var _safe = function(value) {
    if (typeof value === 'undefined' && value == null)
      value = '';
    var result = new String(value);
    result.ecoSafe = true;
    return result;
  };
  return (function() {
    var __out = [], __self = this, _print = function(value) {
      if (typeof value !== 'undefined' && value != null)
        __out.push(value.ecoSafe ? value : __self.escape(value));
    }, _capture = function(callback) {
      var out = __out, result;
      __out = [];
      callback.call(this);
      result = __out.join('');
      __out = out;
      return _safe(result);
    };
    (function() {
      _print(_safe('<div id="tut-nav">\n\t<a href="#pages/tutorial/1"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/2"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/3"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n\t<a href="#pages/tutorial/4"><i class="fa fa-puzzle-piece fa-2x"></i></a>\n</div>\n\n<div class="row clearfix">\n\n\t<div class="grid-6">\n\n\t\t<p class="grid-12">ripsaw.js apps go a long way.</p> \n\t\t<p class="grid-12">they have their own navigation and support for app tutorials in a single DOM element, the ripsaw canvas.</p>\n\n\t</div>\n\n\t<div class="grid-6 row-close">\n\n\t\t<p class="grid-12">Coming up soon in this tutorial series:</p>\n\t\t<br>\n\t\t<p class="grid-12">~ 3d demos</p>\n\t\t<p class="grid-12">~ more and better design experiments</p>\n\t\t<p class="grid-12">~ export to desktop 3d modeling software (Rhino, SketchUp) and 3d printers (MakerBot)</p>\n\n\t</div>\n\t\t\t\t\t\t\n</div>'));
    
    }).call(this);
    
    return __out.join('');
  }).call((function() {
    var obj = {
      escape: function(value) {
        return ('' + value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      },
      safe: _safe
    }, key;
    for (key in __obj) obj[key] = __obj[key];
    return obj;
  })());
};
