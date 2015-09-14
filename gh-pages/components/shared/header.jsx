Comp.Header = class extends React.Component {

	render() {
		return (
			<div>
				<div class="center" id="banner">
					<img class="center" src="assets/images/logo.svg" />
				</div>

				<h1 class="center">ripsaw.js</h1>
				<h2 class="center">interactive product design in the browser</h2>

				<div class="nav">
					<div class="jumper-hover-help"></div>
					<ul>
						<li><a id="a-home" href="#pages/home"><i class="fa fa-home fa-3x"></i></a></li>
						<li><a id="a-concept" href="#pages/concept"><i class="fa fa-lightbulb-o fa-3x"></i></a></li>
						<li><a id="a-tutorial" href="#pages/tutorial"><i class="fa fa-mortar-board fa-3x"></i></a></li>
						<li><a id="a-documentation" href="#pages/documentation"><i class="fa fa-book fa-3x"></i></a></li>
						<li><a id="a-code" href="#pages/code"><i class="fa fa-github fa-3x"></i></a></li>
						<li><a href="ripsaw-yourk/index.html" target="_blank"><i class="fa fa-play-circle-o fa-3x"></i></a></li>
					</ul>
				</div>
			</div>
		);
	}

}