import React, { useContext, memo } from 'react';

import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/currentUser';

const FeedToggler = memo(({ tagName }) => {
	const [currentUserState] = useContext(CurrentUserContext);
	const { isLoggedIn } = currentUserState;
	return (
		<div className="feed-toggler">
			<ul className="nav nav-pills outline-active">
				{isLoggedIn && (
					<li className="nav-item">
						<NavLink to="/feed" className="nav-link">
							Your Feed
						</NavLink>
					</li>
				)}
				<li className="nav-item">
					<NavLink to="/" exact className="nav-link">
						Global Feed
					</NavLink>
				</li>
				{tagName && (
					<li className="nav-item">
						<NavLink to={`/tags/${tagName}`} exact className="nav-link">
							<i className="ion-pound"></i>
							{tagName}
						</NavLink>
					</li>
				)}
			</ul>
		</div>
	);
});

export default FeedToggler;
