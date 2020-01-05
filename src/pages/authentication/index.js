import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CurrentUserContext } from '../../contexts/currentUser';

const Authentication = props => {
	const isLogin = props.match.path === '/login';
	const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
	const descriptionLink = isLogin ? '/register' : '/login';
	const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
	const apiUrl = isLogin ? '/users/login' : '/users';
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
	const [{ response, isLoading }, doFetch] = useFetch(apiUrl);
	const [token, setToken] = useLocalStorage('token');
	const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);

	const handleSubmit = event => {
		event.preventDefault();
		const user = isLogin ? { email, password } : { email, password, username };
		doFetch({
			method: 'POST',
			data: { user },
		});
	};

	useEffect(() => {
		if (!response) {
			return;
		}
		setToken(response.user.token);
		setIsSuccessfullSubmit(true);
		setCurrentUserState(state => ({
			...state,
			isLoggedIn: true,
			isLoading: false,
			currentUser: response.user,
		}));
	}, [response, setToken, setCurrentUserState]);

	console.log(currentUserState)

	if (isSuccessfullSubmit) {
		return <Redirect to="/" />;
	}

	return (
		<div className="auth-page">
			<div className="container page">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xs-12">
						<h1 className="text-xs-center">{pageTitle}</h1>
						<p className="text-xs-center">
							<Link to={descriptionLink}>{descriptionText}</Link>
						</p>
						<form onSubmit={handleSubmit}>
							<fieldset>
								{!isLogin && (
									<fieldset className="form-group">
										<input
											type="text"
											className="form-control form-control-lg"
											placeholder="Username"
											onChange={e => setUsername(e.target.value)}
											value={username}
										/>
									</fieldset>
								)}
								<fieldset className="form-group">
									<input
										type="email"
										className="form-control form-control-lg"
										placeholder="Email"
										onChange={e => setEmail(e.target.value)}
										value={email}
									/>
								</fieldset>
								<fieldset className="form-group">
									<input
										type="password"
										className="form-control form-control-lg"
										placeholder="Password"
										onChange={e => setPassword(e.target.value)}
										value={password}
									/>
								</fieldset>
								<button
									className="btn btn-lg btn-primary pull-xs-right"
									type="submit"
									disabled={isLoading}
								>
									{pageTitle}
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Authentication;
