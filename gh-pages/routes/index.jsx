
(function() {

var Router = ReactRouter;
var { Route, RouteHandler, Link, HistoryLocation, HashLocation, Redirect } = ReactRouter;

Comp.routes = 'apples';

var Header = Comp.Header;
var Footer = Comp.Footer;
var Home = Comp.Home;
var Code = Comp.Code;

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
		<Redirect from='/' to='home' />
	</Route>
);

var el = document.getElementsByClassName('wrapper')[0];

Router.run(routes, Router.HashLocation, (Root, state) => {
	console.log('routing');
	React.render(<Root />, el);
});

}());