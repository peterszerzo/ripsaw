Comp.Concept = class extends React.Component {

	render() {
		return (
			<div className='content__inner'>
						
				<div className='static'>

					<p>ripsaw aspires to make design within reach for people who do not think of themselves as designers. This is a joint product design and software challenge guided by the following principles:</p>

					<ul>
						<li>maximize complexity while minimizing control parameters</li>
						<li>provide seamless interactions </li>
						<li>maintain feasibility</li>
					</ul>

					<p>These shelf prototypes would take a fair amount of time to design, redesign and evaluate in classical CAD programs.</p>

					<img src="public/images/concept/img-01.svg" />

					<img src="public/images/concept/img-02.svg" />

					<p>ripsaw builds these complex shapes based on mere 5 control points. A slight change in the arrangement of these points - as shown on the images below - produces significant changes in the geometry, which is understood and customized easily by anyone.</p>
											
					<img src="public/images/concept/img-03.svg" />
					<img src="public/images/concept/img-04.svg" />

					<p>The mathematical concept (in this case, a city Voronoi diagram) does the hard work of generating the shape, keeping the designer's focus on usability and aesthetics.</p>

				</div>

			</div>
		);
	}

}