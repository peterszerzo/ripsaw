Comp.Tutorial.Part3 = class extends React.Component {

	render() {
		var TutorialNav = Comp.TutorialNav;
		return (
			<div>
				<TutorialNav />

<div class="row clearfix">

	<p class="grid-4 code-description">Best of all, you can use your own creation as a template. Just initialize masterPiece with the path attribute of an SVG Bezier path (as drawn with the pen tool in Adobe Illustrator).</p>

	<div class="code grid-8">
		<div class="code-filename">ripsaw-app.js</div>
		<div class="code-content">
			<pre>
RIPSAW.masterPiece = new RIPSAW.Bezier2D("M138,108C116,38,281,98,290,145s-64,44-76,115S51,316,91,230S148,142,138,108z")
	.normalize();

RIPSAW.init().launch();
			</pre>
		</div>
	</div>

</div>

			</div>
		);
	}

}