import { Switch, Route } from 'react-router-dom';
import React from 'react';

import GlobalFeed from './pages/gloabalFeed';
import Article from './pages/article';
import Authentication from './pages/authentication';
import TagFeed from './pages/tagFeed';
import YourFeed from './pages/yourFeed';

export default () => {
	return (
		<Switch>
			<Route path="/" exact component={GlobalFeed} />
			<Route path="/feed" component={YourFeed} />
			<Route path="/tags/:slug" exact component={TagFeed} />
			<Route path="/login" component={Authentication} />
			<Route path="/register" component={Authentication} />
			<Route path="/articles/:slug" exact component={Article} />
		</Switch>
	);
};
