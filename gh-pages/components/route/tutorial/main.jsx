(function() {

var { Link } = ReactRouter;

Comp.Tutorial = class extends React.Component {

	render() {
		var Nav = Comp.TutorialNav;
		return (
			<div>				
				<Nav />
				<div className="row clearfix">
					<p className="grid-12 center">This tutorial walks through creating a simple guided design app on your webpage.</p>
					<p className="grid-12 center">Use the puzzle pieces to navigate through the steps.</p>
				</div>

			</div>
		);
	}

}


Comp.TutorialNav = class extends React.Component {

	render() {
		return (
			<div id="tut-nav">
				<Link to="tutorial-page"><i className="fa fa-puzzle-piece fa-2x"></i></Link>
				<Link to="tutorial-page"><i className="fa fa-puzzle-piece fa-2x"></i></Link>
				<Link to="tutorial-page"><i className="fa fa-puzzle-piece fa-2x"></i></Link>
				<Link to="tutorial-page"><i className="fa fa-puzzle-piece fa-2x"></i></Link>
			</div>
		);
	}

}

}());

