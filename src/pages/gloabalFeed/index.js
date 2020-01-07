import React, { useEffect } from 'react';
import { stringify } from 'query-string';

import useFetch from '../../hooks/useFetch';
import Feed from '../../components/feed';
import Pagination from '../../components/pagination';
import { getPaginator, limit } from '../../utils';

const GlobalFeed = ({ location, match }) => {
	const { currentPage, offset } = getPaginator(location.search);
	const stringifiedParams = stringify({ limit, offset });
	const apiUrl = `/articles?${stringifiedParams}`;
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
	const url = match.url;

	useEffect(() => {
		doFetch();
	}, [doFetch, currentPage]);

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
						{response && !isLoading && (
							<>
								<Feed articles={response.articles} />
								<Pagination
									total={response.articlesCount}
									url={url}
									currentPage={currentPage}
									limit={limit}
								/>
							</>
						)}
					</div>
					<div className="col-md-3">Popular tags</div>
				</div>
			</div>
		</div>
	);
};

export default GlobalFeed;
