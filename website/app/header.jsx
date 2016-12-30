Comp.Header = class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: undefined
    }
  }

  render() {
    return (
      <div className='header'>
        <div className='header__logo center'>
          <img className='center' src='images/logo.svg'/>
        </div>

        <h1 className='header__title center'>ripsaw.js</h1>
        <h2 className='header__subtitle center'>interactive product design in the browser</h2>

        <div className='nav'>
          {this.renderHelp()}
          <Nav changeText={this.changeText.bind(this)}/>
        </div>
      </div>
    )
  }

  renderHelp() {
    var text = this.state.text
    var cls = text
      ? 'nav__help'
      : 'nav__help invisible'
    return (
      <div className={cls}>{text || 'a'}</div>
    )
  }

  changeText(text) {
    this.setState({text: text})
  }

}

var buttons = [
  {
    'name': 'Home',
    'icon': 'home',
    'url': 'home'
  }, {
    'name': 'Concept',
    'icon': 'lightbulb-o',
    'url': 'concept'
  }, {
    'name': 'Tutorial',
    'icon': 'mortar-board',
    'url': 'tutorial'
  }, {
    'name': 'Documentation',
    'icon': 'book',
    'url': 'documentation'
  }, {
    'name': 'Code',
    'icon': 'github',
    'url': 'https://github.com/pickled-plugins/ripsaw-js',
    isOutsideLink: true
  }, {
    'name': 'Demo',
    'icon': 'play-circle',
    'url': '/ripsaw-yourk/index.html',
    isOutsideLink: true
  }
]

class Nav extends React.Component {

  render() {
    return (
      <ul>
        {this.renderButtons()}
      </ul>
    )
  }

  renderButtons() {
    var {Link} = window.ReactRouter
    return buttons.map((button, i) => {
      var cls = `fa fa-${button.icon} fa-3x`,
        Comp = button.isOutsideLink
          ? 'a'
          : Link,
        hrefProp = button.isOutsideLink
          ? {
            href: button.url
          }
          : {
            to: button.url
          }
      return (
        <li>
          <Comp {...hrefProp} onMouseEnter={this.changeText.bind(this, button.name)} onMouseLeave={this.changeText.bind(this, undefined)}>
            <i className={cls}/>
          </Comp>
        </li>
      )
    })
  }

  changeText(text) {
    this.props.changeText(text)
  }
}
