Comp.Tutorial = class extends React.Component {
  render() {
    return (
      <div className='content__inner'>

        <div className='static'>

          <p>Setting up a basic ripsaw app is simple. Just include a div with a &#8217;ripsaw-app&#8217; id that will contain ripsaw&#8217;s dynamically generated canvas. All magic happens within.</p>

          <div className='code'>
            <div className='code-filename'>index.html</div>
            <div className='code-content'>
              <pre>{
                  `<!DOCTYPE html>
                <html>
                <head>
                	<title>ripsaw example</title>
                	<link rel="stylesheet" type="text/css" href="style.css">
                </head>

                <body>
                	<div id="ripsaw-app"></div>
                	<script src="ripsaw.js"></script>
                	<script src="ripsaw-app.js"></script>
                </body>
                </html>
                `
                }</pre>
            </div>
          </div>

          <p>On the JavaScript side, all information about the geometry of the product is stored in a RIPSAW.masterPiece object. The Bezier2D constructor sets up this object as a 2d bezier spline using the "fork" template.</p>

          <div className='code'>
            <div className='code-filename'>ripsaw-app.js</div>
            <div className='code-content'>
              <pre>{`var geometry = RIPSAW.textAssets.shapeLibrary["fork"];

              // set masterpiece
              RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry);

              // scale geometry into (-0.5, -0.5) - (+0.5, +0.5) rectangle
              RIPSAW.masterPiece.normalize();

              // create canvas and add mouse event listeners
              RIPSAW.init();

              // run application (setInterval)
              RIPSAW.launch();
              `}</pre>
            </div>
          </div>

          <p>Finally, add some css to make sure that the container div fills the screen. But then again, you don&#8217;t have to. ripsaw scales the app to any size container - so feel free to experiment ~</p>

          <div className='code'>
            <div className='code-filename'>style.css</div>
            <div className='code-content'>
              <pre>{`body { margin: 0; }

              #ripsaw-app {
              	position: absolute;
              	top: 0;
              	bottom: 0;
              	width: 100%;
              }
              `}</pre>
            </div>
          </div>

          <p>Like so!</p>
          <div id='ripsaw-app'/>

          <p>There is much room for customization. Add a new fresh color scheme and change to a new template.</p>

          <div className='code'>
            <div className='code-filename'>ripsaw-app.js</div>
            <div className='code-content'>
              <pre>{ `var geometry = RIPSAW.textAssets.shapeLibrary["moustache"];

              RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry).normalize();

              // set new color scheme
              RIPSAW.colors.schemes.fresh: [
                  [178, 88, 79],   // 0: background
                  [230, 255, 95],  // 1: title
                  [255, 22, 0],    // 2: subtitle
                  [20, 105, 204],  // 3: misc text
                  [92, 132, 178],  // 4: control handle endpoints
                  [61, 103, 196],  // 5: control handle midpoint
                  [95, 90, 113],   // 6: nav bounding boxes
                  [255, 255, 255]  // 7: curve strokes
              ];

              // set new color scheme as active
              RIPSAW.colors.activeScheme = "fresh";

              // change container ID
              RIPSAW.containerID = 'new-wrapper';

              RIPSAW.init().launch();
              ` }</pre>
            </div>
          </div>

        </div>

      </div>
    )
  }

  componentDidMount() {
    var geometry = RIPSAW.textAssets.shapeLibrary['fork']
    RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry)
    RIPSAW.masterPiece.normalize()
    RIPSAW.init()
    RIPSAW.launch()
  }
}

Comp.Tutorial.Part1 = function() {
  var TutorialNav = Comp.TutorialNav
  return (
    <div>

      <div class='row clearfix'>

        <p class='grid-4 code-description'>Setting up a basic ripsaw app is simple. Just include a div with a &#8217;ripsaw-app&#8217; id that will contain ripsaw&#8217;s dynamically generated canvas. All magic happens within.</p>

        <div class='code grid-8'>
          <div class='code-filename'>index.html</div>
          <div class='code-content'>
            <pre>{ htmlCode }</pre>
          </div>
        </div>

      </div>

      <div class='row clearfix'>

        <p class='grid-4 code-description'>On the JavaScript side, all information about the geometry of the product is stored in a RIPSAW.masterPiece object. The Bezier2D constructor sets up this object as a 2d bezier spline using the "fork" template.</p>

        <div class='code grid-8'>
          <div class='code-filename'>ripsaw-app.js</div>
          <div class='code-content'>
            <pre>{ jsCode }</pre>
          </div>
        </div>

      </div>

      <div class='row clearfix'>

        <p class='grid-4 code-description'>Finally, add some css to make sure that the container div fills the screen. But then again, you don&#8217;t have to. ripsaw scales the app to any size container - so feel free to experiment ~</p>

        <div class='code grid-8'>
          <div class='code-filename'>style.css</div>
          <div class='code-content'>
            <pre>{cssCode}</pre>
          </div>
        </div>

      </div>

      <div class='row clearfix'>
        <div class='grid-8 grid-offset-2' id='ripsaw-app'/>
      </div>
      <div class='row row-no-space'>
        <p class='grid-2 grid-offset-2 code-description'>~ like so!</p>
      </div>
    </div>
  )
}

Comp.Tutorial.Part2 = function() {
  var TutorialNav = Comp.TutorialNav
  return (
    <div>
      <TutorialNav/>

      <div class='row clearfix'>

        <p class='grid-4 code-description'>There is much room for customization. Add a new fresh color scheme and change to a new template.</p>

        <div class='code grid-8'>
          <div class='code-filename'>ripsaw-app.js</div>
          <div class='code-content'>
            <pre>
{`
var geometry = RIPSAW.textAssets.shapeLibrary["moustache"];

RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry)
	.normalize();

// set new color scheme
RIPSAW.colors.schemes.fresh: [
    [178, 88, 79],   // 0: background
    [230, 255, 95],  // 1: title
    [255, 22, 0],    // 2: subtitle
    [20, 105, 204],  // 3: misc text
    [92, 132, 178],  // 4: control handle endpoints
    [61, 103, 196],  // 5: control handle midpoint
    [95, 90, 113],   // 6: nav bounding boxes
    [255, 255, 255]  // 7: curve strokes
];

// set new color scheme as active
RIPSAW.colors.activeScheme = "fresh";

// change container ID
RIPSAW.containerID = 'new-wrapper';

RIPSAW.init().launch();
`}
			</pre>
          </div>
        </div>
      </div>

    </div>
  )
}

Comp.Tutorial.Part3 = function() {
  var jsCode = `
		RIPSAW.masterPiece = new RIPSAW.Bezier2D("M138,108C116,38,281,98,290,145s-64,44-76,115S51,316,91,230S148,142,138,108z")
			.normalize();

		RIPSAW.init().launch();
		`

  var text = 'Best of all, you can use your own creation as a template. Just initialize masterPiece with the path attribute of an SVG Bezier path (as drawn with the pen tool in Adobe Illustrator).'
  var TutorialNav = Comp.TutorialNav
  return (
    <div>
      <TutorialNav/>

      <div class='row clearfix'>

        <p class='grid-4 code-description'>{text}</p>

        <div class='code grid-8'>
          <div class='code-filename'>ripsaw-app.js</div>
          <div class='code-content'>
            <pre>{ jsCode }</pre>
          </div>
        </div>

      </div>

    </div>
  )
}

Comp.Tutorial.Part4 = function() {
  var TutorialNav = Comp.TutorialNav
  return (
    <div>
      <TutorialNav/>

      <div class='row clearfix'>

        <div class='grid-6'>

          <p class='grid-12'>ripsaw.js apps go a long way.</p>
          <p class='grid-12'>they have their own navigation and support for app tutorials in a single DOM element, the ripsaw canvas.</p>

        </div>

        <div class='grid-6 row-close'>

          <p class='grid-12'>Coming up soon in this tutorial series:</p>
          <br/>
          <p class='grid-12'>~ 3d demos</p>
          <p class='grid-12'>~ more and better design experiments</p>
          <p class='grid-12'>~ export to desktop 3d modeling software (Rhino, SketchUp) and 3d printers (MakerBot)</p>

        </div>

      </div>

    </div>
  )
}
