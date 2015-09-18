Comp.Tutorial.Part2 = class extends React.Component {

	render() {
		var TutorialNav = Comp.TutorialNav;
		return (
			<div>
				<TutorialNav />

<div class="row clearfix">

	<p class="grid-4 code-description">There is much room for customization. Add a new fresh color scheme and change to a new template.</p>

	<div class="code grid-8">
		<div class="code-filename">ripsaw-app.js</div>
		<div class="code-content">
			<pre>
`
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
`
			</pre>
		</div>
	</div>
</div>

			</div>
		);
	}

}