import React from 'react';
import { Link } from 'react-router-dom';

const Feed = ({ articles }) => {
	return (
		<div>
			{articles.map((article, index) => {
				const { author, createdAt, slug, title, description, tagList } = article;
				const { username, image } = author;
				return (
					<div className="article-preview" key={index}>
						<div className="article-meta">
							<Link to={`/profiles/${username}`}>
								<img src={image} alt="" />
							</Link>
							<div className="info">
								<Link to={`/profiles/${username}`}>{username}</Link>
								<span className="date">{createdAt}</span>
							</div>
						</div>
						<Link to={`/articles/${slug}`} className="preview-link">
							<h1>{title}</h1>
							<p>{description}</p>
							<span>Read more...</span>
							<ul className="tag-list">
								{tagList.map(tag => (
									<li key={tag} className="tag-default tag-pill tag-outline">
										{tag}
									</li>
								))}
							</ul>
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default Feed;
