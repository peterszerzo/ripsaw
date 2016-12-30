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

var tutorialIntro = "See for yourself - check out ripsaw's live demos below:";

var tutorialTexts = [
	"A first 3d experiment published in December 2013. Walk through creating your very own 3d utensil piece with the help of an interactive tutorial.",
	"Proof of concept and UX testing environment for a social platform for product design. Create, share and save 'masterpieces', and view everybody else's."
];

var demos = {
	'2d-fork': {
		title: '2d Fork',
		masterPiece: new RIPSAW.Bezier2D(RIPSAW.textAssets.shapeLibrary["fork"]).normalize(),
		hint: 'The basics, Adobe Illustrator style.'
	},
	'3d-fork': {
		title: '3d Fork',
		masterPiece: new RIPSAW.Bezier3D(RIPSAW.textAssets.shapeLibrary["fork"]).setAllView(),
		hint: 'The basics, this time with a customizable depth profile.'
	},
	'pantograph': {
		title: 'Pantograph',
		masterPiece: new RIPSAW.CurvingPantograph(6, 0.5, 0.57, 0.52, 0.5, 0.8, 0.4).normalize(),
		hint: 'Animating a kinetic structure.'
	},
	'voronoi': {
		title: 'Voronoi',
		masterPiece: new RIPSAW.Voronoi().createIrregularGrid(5).normalize(0.5),
		hint: 'Move the points around and right-click to generate a Voronoi wavefront generator.'
	},
	oldDemo: {
		title: 'A first 3d experiment published in December 2013. Walk through creating your very own 3d utensil piece with the help of an interactive tutorial.',
		url: '/public/ripsaw-yourk/index.html'
	},
	railsDemo: {
		title: "Proof of concept and UX testing environment for a social platform for product design. Create, share and save creations, and view everybody else's.",
		url: 'http://ripsaw-demo.herokuapp.com/'
	}
};

RIPSAW.containerID = 'ripsaw';

class Modal extends Comp.Modal {

	componentDidMount() {
		RIPSAW.init();
		RIPSAW.launch();
	}

	componentWillUnmount() {
		// RIPSAW cleanup
	}

}

Comp.Home = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			currentDemo: null
		};
	}

	render() {
		return (
			<div className='content__inner'>

				<div className="grid">
					<div className="grid__col grid__col--1-of-2">
						<p>{text[0][0]}</p>
					</div>
					<div className="grid__col grid__col--1-of-2">
						<img className="center" src="public/images/design-1.svg" />
					</div>
				</div>

				<div className='content__separator' />

				<div className="grid">
					<div className="grid__col grid__col--1-of-2">
						<img className="center" src="public/images/design-2.svg" />
					</div>
					<div className="grid__col grid__col--1-of-2">
						<p>{text[1][0]}</p>
						<p>{text[1][1]}</p>
					</div>
				</div>

				<div className='content__separator' />

				<div className="grid">
					<div className="grid__col grid__col--1-of-2">
						<p>{text[2][0]}</p>
					</div>
					<div className="grid__col grid__col--1-of-2">
						<img className="center" src="public/images/fork3d.svg" />
					</div>
				</div>

				<div className='content__separator' />

				<p className='center'>{ tutorialIntro }</p>

				<div className="grid">
					
					{ this.renderDemos() }
					
				</div>

				<div className='content__separator' />

				<div className="grid">
					<p className="grid__col grid__col--centered grid__col--1-of-2">The library transforms any HTML container into a design playground, and lives happily on <a href="https://github.com/pickled-plugins/ripsaw-demo" target="_blank">GitHub</a>.</p>
				</div>

				{ this.renderModal() }

			</div>

		);

	}

	renderDemos() {
		return Object.keys(demos).map((key) => {
			var demo = demos[key];
			return (
				<div className="grid__col grid__col--1-of-2">
					<div className='demo-link' onClick={this.launchRipsawModal.bind(this, key)}>
						<div className='demo-link__content'>
							<p>{ demo.title }</p>
						</div>
					</div>
				</div>
			);
		});
	}

	renderModal() {
		console.log(this.state);
		if (!this.state.currentDemo) { return; }
		console.log('there is a current demo');
		return (
			<Modal
				contentId='ripsaw'
				closeModal={this.deactivateModal.bind(this)}
				hint={ this.state.currentDemo.hint }
			/>
		);
	}

	launchRipsawModal(key) {
		var demo = demos[key];
		if (demo.url) { return window.open(demo.url); }
		RIPSAW.masterPiece = demo.masterPiece;
		this.setState({ currentDemo: demo });
	}

	deactivateModal() {
		this.setState({ currentDemo: null });
	}

}

}());