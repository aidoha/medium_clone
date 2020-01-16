import React, { useEffect } from 'react';
import { stringify } from 'query-string';

import useFetch from '../../hooks/useFetch';
import Feed from '../../components/feed';
import Pagination from '../../components/pagination';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';
import PopularTags from '../../components/popularTags';
import FeedToggler from '../../components/feedToggler';
import { getPaginator, limit } from '../../utils';

const YourFeed = ({ location, match }) => {
	const tagName = match.params.slug;
	const { currentPage, offset } = getPaginator(location.search);
	const stringifiedParams = stringify({ limit, offset });
	const apiUrl = `/articles/feed?${stringifiedParams}`;
	const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
	const url = match.url;

	useEffect(() => {
		doFetch();
	}, [doFetch, currentPage, tagName]);

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
						<FeedToggler tagName={tagName} />
						{isLoading && <Loading />}
						{error && <ErrorMessage />}
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
					<div className="col-md-3">
						<PopularTags />
					</div>
				</div>
			</div>
		</div>
	);
};

export default YourFeed;
