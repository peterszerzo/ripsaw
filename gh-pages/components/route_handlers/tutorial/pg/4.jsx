Comp.Tutorial.Part4 = class extends React.Component {

	render() {
		var TutorialNav = Comp.TutorialNav;
		return (
			<div>
				<TutorialNav />

				<div class="row clearfix">

					<div class="grid-6">

						<p class="grid-12">ripsaw.js apps go a long way.</p> 
						<p class="grid-12">they have their own navigation and support for app tutorials in a single DOM element, the ripsaw canvas.</p>

					</div>

					<div class="grid-6 row-close">

						<p class="grid-12">Coming up soon in this tutorial series:</p>
						<br />
						<p class="grid-12">~ 3d demos</p>
						<p class="grid-12">~ more and better design experiments</p>
						<p class="grid-12">~ export to desktop 3d modeling software (Rhino, SketchUp) and 3d printers (MakerBot)</p>

					</div>
										
				</div>

			</div>
		);
	}

}