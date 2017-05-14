import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Repos from './Repos';
import About from './About';
import Repo from './Repo';
import Home from './Home';

module.exports = (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/repos" component={Repos}>
			<Route path="/repos/:userName/:repoName" component={Repo} />
		</Route>
		<Route path="/about" component={About} />
	</Route>
);
