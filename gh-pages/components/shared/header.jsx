(function() {

var { Link } = ReactRouter;

Comp.Header = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = { text: undefined };
	}

	render() {
		return (
			<div>
				<div className="center" id="banner">
					<img className="center" src="assets/images/logo.svg" />
				</div>

				<h1 className="center">ripsaw.js</h1>
				<h2 className="center">interactive product design in the browser</h2>

				<div className="nav">
					{ this.renderHelp() }
					<Nav changeText={this.changeText.bind(this)} />
				</div>
			</div>
		);
	}

	renderHelp() {
		var text = this.state.text;
		if (!text) { return; }
		return (<div className="jumper-hover-help">{ text }</div>);
	}

	changeText(text) {
		this.setState({ text: text });
	}

}

var buttons = [
	{
		'name': 'Home',
		'icon': 'home',
		'url': 'home'
	},
	{
		'name': 'Concept',
		'icon': 'lightbulb-o',
		'url': 'home'
	},
	{
		'name': 'Tutorial',
		'icon': 'mortar-board',
		'url': 'home'
	},
	{
		'name': 'Documentation',
		'icon': 'book',
		'url': 'home'
	},
	{
		'name': 'Code',
		'icon': 'github',
		'url': 'home'
	},
	{
		'name': 'Demo',
		'icon': 'play-circle',
		'url': 'home'
	}
]


class Nav extends React.Component {

	render() {
		return (
			<ul>
				{ this.renderButtons() }
			</ul>
		);
	}

	renderButtons() {
		return buttons.map((button, i) => {
			var cls = `fa fa-${button.icon} fa-3x`;
			return (
				<li>
					<Link 
						to='home' 
						onMouseEnter={this.changeText.bind(this, button.name)} 
						onMouseLeave={this.changeText.bind(this, undefined)}
					>
						<i className={cls} />
					</Link>
				</li>
			);
		});
	}

	changeText(text) {
		this.props.changeText(text);
	}

}


} ());

