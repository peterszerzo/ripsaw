Comp.Concept = class extends React.Component {

	render() {
		return (
			<div>
				<div className="row clearfix">
						
					<p className="grid-10 grid-offset-1">ripsaw aspires to make design within reach for people who do not think of themselves as designers. This is a joint product design and software challenge guided by the following principles:</p>

					<p className="grid-8 grid-offset-2"># maximize complexity while minimizing control parameters</p>
					<p className="grid-8 grid-offset-2"># provide seamless interactions </p>
					<p className="grid-8 grid-offset-2"># maintain feasibility</p>

					<p className="grid-10 grid-offset-1">These shelf prototypes would take a fair amount of time to design, redesign and evaluate in classical CAD programs.</p>

					<div className="img">

						<img className="center grid-3 grid-offset-2" src="assets/images/concept/img-01.svg" />

						<img className="center grid-3 grid-offset-2" src="assets/images/concept/img-02.svg" />

					</div>

					<p className="grid-10 grid-offset-1">ripsaw builds these complex shapes based on mere 5 control points. A slight change in the arrangement of these points produces significant changes in the geometry, which is understood and customized easily by anyone.</p>
										
					<div className="img">	
						<img className="center" src="assets/images/concept/img-03.svg" />
						<img className="center" src="assets/images/concept/img-04.svg" />

					</div>

					<p className="grid-10 grid-offset-1">The mathematical concept (in this case, a city Voronoi diagram) does the hard work of generating the shape, keeping the user's focus on usability and aesthetics.</p>

				</div>

			</div>
		);
	}

}