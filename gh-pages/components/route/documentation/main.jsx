Comp.Documentation = class extends React.Component {

	render() {
		return (
			<div>
				
				<div className="row clearfix">

					<p className="grid-8 grid-offset-2">Browse the <a href="doc/RIPSAW.html" target="_blank">API documentation</a> to explore other ways of customizing maker apps powered by ripsaw.js.</p>

					<p className="grid-8 grid-offset-2">ripsaw's consistent API allows developers to create extensions with new interactive geometries. All you need to do is create a constructor that inherits from RIPSAW.MasterPiece and provides the same core methods as RIPSAW.Bezier2D - the sample constructor featured in this demo.</p>

					<p className="grid-8 grid-offset-2">This website will soon feature a developers' tutorial demonstrating how to create a ripsaw extension that allows users to design a rectangle interactively.</p>

				</div>

				<div className="row clearfix">

					<a className="grid-4 center" href="doc/RIPSAW.html" target="_blank">

						<div className="icon-group">
							<i className="fa fa-play-circle-o fa-5x" data-ch="1"></i>
							<i className="fa fa-book fa-2x"></i>
						</div>

					</a>

				</div>

			</div>
		);
	}

}