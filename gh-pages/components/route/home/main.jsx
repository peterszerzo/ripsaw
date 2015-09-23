(function() {

var text = [
	[
		'Everyone can design. Even if there appears to be an entry barrier sometimes.'
	],
	[
		"There shouldn't be!",
		"ripsaw.js is a lightweight JavaScript library that powers maker apps navigated easily by people without a design background. Design becomes a simple, intuitive and clean process, posing little compromise freedom of expression."
	],
	[
		"Could you imagine designing a freeform fork such as this one with only 15 minutes of 3d modeling experience?"
	]
];

var tutorialIntro = "See for yourself - check out ripsaw's two live demos below:";

var tutorialTexts = [
	"A first 3d experiment published in December 2013. Walk through creating your very own 3d utensil piece with the help of an interactive tutorial.",
	"Proof of concept and UX testing environment for a social platform for product design. Create, share and save 'masterpieces', and view everybody else's."
];


Comp.Home = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isModalActive: false
		};
	}

	render() {
		return (
			<div className='content__inner'>

				<div className="row clearfix">
					<div className="grid-6">
						<p>{text[0][0]}</p>
					</div>
					<div className="grid-6"><img className="center" src="assets/images/design-1.svg" /></div>
				</div>

				<div className='content__separator' />

				<div className="row clearfix row-close">
					<div className="grid-6"><img className="center" src="assets/images/design-2.svg" /></div>
					<div className="grid-6">
						<p>{text[1][0]}</p>
						<p>{text[1][1]}</p>
					</div>
				</div>

				<div className='content__separator' />

				<div className="row clearfix row-close">
					<div className="grid-6">
						<p>{text[2][0]}</p>
					</div>
					<div className="grid-6"><img className="center" src="assets/images/fork3d.svg" /></div>
				</div>

				<div className='content__separator' />

				<p className='center' onClick={this.activateModal.bind(this)}>{ tutorialIntro }</p>

				<div className="row clearfix">
					
					<div className="grid-6" onClick={this.launchRipsawModal.bind(this, '2d-fork')}>
						<p className='center highlighted'>A 2d Fork</p>
					</div>

					<div className="grid-6" onClick={this.launchRipsawModal.bind(this, '3d-fork')}>
						<p className='center highlighted'>A 3d Fork</p>
					</div>

					<div className="grid-6" onClick={this.launchRipsawModal.bind(this, 'pantograph')}>
						<p className='center highlighted'>A Pantograph</p>
					</div>

					<div className="grid-6" onClick={this.launchRipsawModal.bind(this, 'voronoi')}>
						<p className='center highlighted'>A Voronoi Shape</p>
					</div>

					<a href="/public/ripsaw-yourk/index.html" className="grid-6">
						<p className='center highlighted'>{ tutorialTexts[0] }</p>
					</a>

					<a href="http://ripsaw-demo.herokuapp.com/" className='grid-6'>
						<p className='center highlighted'>{ tutorialTexts[1] }</p>
					</a>
					
				</div>

				<div className='content__separator' />

				<div className="row clearfix">
					<p className="grid-12 center">Enjoy, browse around and check out the source on <a href="https://github.com/pickled-plugins/ripsaw-demo" target="_blank">GitHub</a>.</p>
				</div>

				{ this.state.isModalActive ? this.renderModal() : null }

			</div>

		);

	}

	renderModal() {
		return (
			<div className='modal' onClick={this.deactivateModal.bind(this)}>
				<div className='modal__content' id='ripsaw' onClick={this.stopPropagation.bind(this)}>

				</div>
			</div>
		);
	}

	componentDidMount() {
		RIPSAW.containerID = 'ripsaw';
	}

	componentDidUpdate() {
		if (this.state.isModalActive) {
			this.launchApp();
		}
	}

	launchRipsawModal(type) {
		switch (type) {
			case '2d-fork':
				RIPSAW.masterPiece = new RIPSAW.Bezier2D(RIPSAW.textAssets.shapeLibrary["fork"]).normalize();
				break;
			case '3d-fork':
				RIPSAW.masterPiece = new RIPSAW.Bezier3D(RIPSAW.textAssets.shapeLibrary["fork"]).setAllView();
				break;
			case 'voronoi':
				RIPSAW.masterPiece = new RIPSAW.Voronoi().createIrregularGrid(5).normalize(0.5);
				break;
			case 'pantograph':
				RIPSAW.masterPiece = new RIPSAW.CurvingPantograph(6, 0.5, 0.57, 0.52, 0.5, 0.8, 0.4).normalize();
				break;
			default:
				console.log('bad');
		}
		this.activateModal();
	}

	launchApp() {
		RIPSAW.init();
		RIPSAW.launch();
	}

	stopPropagation(e) {
		e.stopPropagation();
	}

	activateModal() {
		this.setState({ isModalActive: true });
	}

	deactivateModal() {
		this.setState({ isModalActive: false });
	}

}

}());