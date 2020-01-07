import React, { useEffect } from 'react';

import useFetch from '../../hooks/useFetch';
import Feed from '../../components/feed';

const GlobalFeed = () => {
	const apiUrl = '/articles?limit=20&offset=0';
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

	useEffect(() => {
		doFetch();
	}, [doFetch]);

	return (
		<div className="home-page">
			<div className="banner">
				<div className="container">
					<h1>Medium Clone</h1>
					<p>A place to share knowledge</p>
				</div>
			</div>
			<div className="container page">
				<div className="row">
					<div className="col-md-9">
						{isLoading && <div>Loading...</div>}
						{error && <div>Some error happened</div>}
						{response && <Feed articles={response.articles} />}
					</div>
					<div className="col-md-3">Popular tags</div>
				</div>
			</div>
		</div>
	);
};

export default GlobalFeed;
