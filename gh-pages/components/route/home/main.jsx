Comp.Home = class extends React.Component {

	render() {
		return (
			<div>

					<div className="row clearfix">

						<div className="grid-6">

							<p>Everyone can design. Even if there appears to be an 'entry barrier' sometimes.</p>

						</div>

						<div className="grid-6 hide-small"><img className="center" src="assets/images/design-1.svg"></div>

					</div>

					<div className="row clearfix row-close">

						<div className="grid-6 hide-small"><img className="center" src="assets/images/design-2.svg"></div>

						<div className="grid-6">

							<p>There shouldn't be!</p>

							<p>ripsaw.js is a lightweight JavaScript library that aspires to power a suite of maker apps tailored specifically to people without a design background. These browser apps are conceived to make design a simple, intuitive and clean process, in a way that does not compromise freedom of expression.</p>

							<p>This project was born as a proof of concept to this idea.</p>

						</div>

					</div>

					<div className="row clearfix row-close">

						<div className="grid-6">

							<p>Could you imagine designing a freeform fork such as this one with only 15 minutes of 3d modeling experience?</p>
							
						</div>

						<div className="grid-6"><img className="center" src="assets/images/fork3d.svg"></div>

					</div>

					<div className="row row-close clearfix">

						<p className="grid-12 center">See for yourself - check out ripsaw's two live demos below:</p>

					</div>


					<div className="row clearfix">

						<div className="demo grid-5 grid-offset-1">

							<a className="center" href="ripsaw-yourk/index.html" target="_blank"><div className="icon-group"><i className="fa fa-play-circle-o fa-5x" data-ch="1"></i><i className="fa fa-child fa-2x"></i></div></a>

							<p className="center">A first 3d experiment published in December 2013. Walk through creating your very own 3d utensil piece with the help of an interactive tutorial.</p>

						</div>

						<div className="demo grid-5">

							<a className="center" href="http://ripsaw-demo.herokuapp.com" target="_blank"><div className="icon-group"><i className="fa fa-play-circle-o fa-5x" data-ch="1"></i><i className="fa fa-users fa-2x"></i></div></a>

							<p className="center">Proof of concept and UX testing environment for a social platform for product design. Create, share and save 'masterpieces', and view everybody else's.</p>

						</div>

					</div>

					<div className="row clearfix">
						<p className="grid-12 center">Enjoy, browse around and check out the source on <a href="https://github.com/pickled-plugins/ripsaw-demo" target="_blank">GitHub</a>.</p>
					</div>

			</div>
		);
	}

}