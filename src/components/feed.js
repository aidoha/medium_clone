import React from 'react';
import { Link } from 'react-router-dom';
import TagList from './tagList';
import AddToFavorites from './addToFavorites';

const Feed = ({ articles }) => {
	return (
		<div>
			{articles.map((article, index) => {
				const { author, createdAt, slug, title, description, tagList, favorited, favoritesCount } = article;
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
							<div className="pull-xs-right">
								<AddToFavorites
									isFavorited={favorited}
									favoritesCount={favoritesCount}
									articleSlug={slug}
								/>
							</div>
						</div>
						<Link to={`/articles/${slug}`} className="preview-link">
							<h1>{title}</h1>
							<p>{description}</p>
							<span>Read more...</span>
							<TagList tags={tagList} />
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default Feed;
