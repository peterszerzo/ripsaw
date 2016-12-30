function start() {

  var {Router, Route, IndexRoute, hashHistory} = window.ReactRouter

  var {
    Header,
    Footer,
    Home,
    Concept,
    Tutorial,
    Code,
    Documentation
  } = Comp

  function Layout(props) {
    return (
      <div>
        <Header/>
        <div className='content'>
          <div className='content__margin'/>
          {props.children}
          <div className='content__margin'/>
        </div>
        <Footer/>
      </div>
    )
  }

  ReactDOM.render((
    <Router history={hashHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Home}/>
        <Route path='code' component={Code}/>
        <Route path='concept' component={Concept}/>
        <Route path='tutorial' component={Tutorial}/>
        <Route path='documentation' component={Documentation}/>
      </Route>
    </Router>
  ), document.getElementById('app'))

}

start()
