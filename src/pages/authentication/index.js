import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Authentication = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		setIsSubmitting(true);
	};

	useEffect(() => {
		if (!isSubmitting) {
			return;
		}
		document.title = email;
		axios('https://conduit.productionready.io/api/users/login', {
			method: 'POST',
			data: {
				user: {
					email: 'dsds@gmail.com',
					password: '123',
				},
			},
		})
			.then(res => {
				console.log('res', res);
				setIsSubmitting(false);
			})
			.catch(err => {
				console.log('err', err);
				setIsSubmitting(false);
			});
	});

	return (
		<div className="auth-page">
			<div className="container page">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xs-12">
						<h1 className="text-xs-center">Sign in</h1>
						<p className="text-xs-center">
							<Link to="/register">Need an account?</Link>
						</p>
						<form onSubmit={handleSubmit}>
							<fieldset>
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
									disabled={isSubmitting}
								>
									Sign in
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
