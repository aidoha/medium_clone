import React from 'react';
import classNames from 'classnames';
import useFetch from '../hooks/useFetch';

const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
	const apiUrl = `/articles/${articleSlug}/favorite`;
	const [{ response }, doFetch] = useFetch(apiUrl);
	const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount;
	const isFavoritedWithResponse = response ? response.article.favorited : isFavorited;
	const buttonClasses = classNames({
		btn: true,
		'btn-sm': true,
		'btn-primary': isFavoritedWithResponse,
		'btn-outline-primary': !isFavoritedWithResponse,
	});

	const handleLike = event => {
		event.preventDefault();
		doFetch({
			method: isFavoritedWithResponse ? 'DELETE' : 'POST',
		});
	};
	return (
		<button className={buttonClasses} onClick={handleLike}>
			<i className="ion-heart"></i>
			<span>&nbsp; {favoritesCountWithResponse}</span>
		</button>
	);
};

export default AddToFavorites;
