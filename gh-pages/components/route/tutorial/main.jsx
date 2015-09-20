(function() {

var { Link } = ReactRouter;

var htmlCode = `<!DOCTYPE html>
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
`;

var cssCode = `body { margin: 0; }

#ripsaw-app {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
}
`;

var jsCode = `var geometry = RIPSAW.textAssets.shapeLibrary["fork"];

// set masterpiece
RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry);

// scale geometry into (-0.5, -0.5) - (+0.5, +0.5) rectangle
RIPSAW.masterPiece.normalize(); 

// create canvas and add mouse event listeners
RIPSAW.init();

// run application (setInterval)
RIPSAW.launch();
`;

var jsCode2 = `var geometry = RIPSAW.textAssets.shapeLibrary["moustache"];

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
`;

Comp.Tutorial = class extends React.Component {

	render() {
		return (
			<div className='content__inner'>			
				
				<div className='static'>

					<p>Setting up a basic ripsaw app is simple. Just include a div with a &#8217;ripsaw-app&#8217; id that will contain ripsaw&#8217;s dynamically generated canvas. All magic happens within.</p>

					<div className="code">
						<div className="code-filename">index.html</div>
						<div className="code-content">
							<pre>{ htmlCode }</pre>
						</div>
					</div>
						
					<p>On the JavaScript side, all information about the geometry of the product is stored in a RIPSAW.masterPiece object. The Bezier2D constructor sets up this object as a 2d bezier spline using the "fork" template.</p>

					<div className="code">
						<div className="code-filename">ripsaw-app.js</div>
						<div className="code-content">
							<pre>{ jsCode }</pre>
						</div>
					</div>


					<p>Finally, add some css to make sure that the container div fills the screen. But then again, you don&#8217;t have to. ripsaw scales the app to any size container - so feel free to experiment ~</p>

					<div className="code">
						<div className="code-filename">style.css</div>
						<div className="code-content">
							<pre>{cssCode}</pre>
						</div>
					</div>

					<p>Like so!</p>
					<div id="ripsaw-app"></div>

					<p>There is much room for customization. Add a new fresh color scheme and change to a new template.</p>

					<div className="code">
						<div className="code-filename">ripsaw-app.js</div>
						<div className="code-content">
							<pre>{ jsCode2 }</pre>
						</div>
					</div>

				</div>

			</div>
		);
	}

	componentDidMount() {

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

	componentWillUnmount() {
		
	}

}


}());

