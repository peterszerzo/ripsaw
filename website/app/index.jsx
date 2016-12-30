function start() {

  var Router = window.ReactRouter
  var { Route, IndexRoute, browserHistory } = window.ReactRouter

  var { Header, Footer, Home, Concept, Tutorial, Code, Documentation } = Comp

  function Layout () {
      return (
        <div>
          <Header />
          <div className='content'>
            <div className='content__margin' />
            <RouteHandler />
            <div className='content__margin' />
          </div>
          <Footer />
        </div>
      )
    }

  ReactDOM.render((
    <Router history={browserHistory}>
      <Route component={Layout}>
        <IndexRoute name='home' path='home' component={Home} />
        <Route name='code' path='code' component={Code} />
        <Route name='concept' path='concept' component={Concept} />
        <Route name='tutorial' path='tutorial' component={Tutorial} />
        <Route name='documentation' path='documentation' component={Documentation} />
      </Route>
    </Router>
), document.getElementById('app'))

}

start()
