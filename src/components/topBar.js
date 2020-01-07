import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/currentUser';

const Topbar = () => {
	const [currentUserState] = useContext(CurrentUserContext);
	const { isLoggedIn, currentUser } = currentUserState;
	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/" className="navbar-brand">
					Medium
				</Link>
				<ul className="nav navbar-nav pull-xs-right">
					<li className="nav-item">
						<NavLink to="/" className="nav-link" exact>
							Home
						</NavLink>
					</li>
					{isLoggedIn === false && (
						<>
							<li className="nav-item">
								<NavLink to="/login" className="nav-link">
									Sign in
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/register" className="nav-link">
									Sign up
								</NavLink>
							</li>
						</>
					)}
					{isLoggedIn && (
						<>
							<li className="nav-item">
								<NavLink to="/articles/new" className="nav-link">
									<i className="ion-compose" />
									&nbsp; New Post
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to={`/profiles/${currentUser.username}`} className="nav-link">
									<img className="user-pic" src={currentUser.image} alt="" />
									&nbsp; {currentUser.username}
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Topbar;
