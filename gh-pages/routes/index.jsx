
(function() {

var Router = ReactRouter;
var { Route, RouteHandler, Link, HistoryLocation, HashLocation, Redirect } = ReactRouter;

var { Header, Footer, Home, Concept, Tutorial, Code, Documentation } = Comp;

class Layout extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div className="separator"></div>
				<RouteHandler />
				<div className="separator"></div>
				<Footer />
			</div>
		);
	}
}

var routes = (
	<Route handler={Layout}>
		<Route name='home' path='home' handler={Home} />
		<Route name='code' path='code' handler={Code} />
		<Route name='concept' path='concept' handler={Concept} />
		<Route name='tutorial' path='tutorial' handler={Tutorial}>
			<Route name='tutorial-page' path='tutorial/:no' handler={Tutorial} />
		</Route>
		<Route name='documentation' path='documentation' handler={Documentation} />
		<Redirect from='/' to='home' />
	</Route>
);

var el = document.getElementsByClassName('wrapper')[0];

Router.run(routes, Router.HashLocation, (Root, state) => {
	console.log(state);
	React.render(<Root />, el);
});

}());