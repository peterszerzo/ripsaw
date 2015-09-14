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
		'url': 'concept'
	},
	{
		'name': 'Tutorial',
		'icon': 'mortar-board',
		'url': 'tutorial'
	},
	{
		'name': 'Documentation',
		'icon': 'book',
		'url': 'documentation'
	},
	{
		'name': 'Code',
		'icon': 'github',
		'url': 'code'
	},
	{
		'name': 'Demo',
		'icon': 'play-circle',
		'url': 'public/ripsaw-yourk/index.html',
		isOutsideLink: true
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
			var cls = `fa fa-${button.icon} fa-3x`,
				Comp = button.isOutsideLink ? 'a' : Link,
				hrefProp = button.isOutsideLink ? { href: button.url } : { to: button.url };
			return (
				<li>
					<Comp 
						{...hrefProp}
						onMouseEnter={this.changeText.bind(this, button.name)} 
						onMouseLeave={this.changeText.bind(this, undefined)}
					>
						<i className={cls} />
					</Comp>
				</li>
			);
		});
	}

	changeText(text) {
		this.props.changeText(text);
	}

}


} ());

