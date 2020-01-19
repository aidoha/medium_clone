import React, { useEffect, useState, useContext } from 'react';
import ArticleForm from '../../components/articleForm';
import useFetch from '../../hooks/useFetch';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/currentUser';

const CreateArticle = () => {
	const [currentUserState] = useContext(CurrentUserContext);
	const apiUrl = '/articles';
	const [{ response, error }, doFetch] = useFetch(apiUrl);
	const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
	const initialValues = {
		title: '',
		description: '',
		body: '',
		tagList: [],
	};

	const handleSubmit = article => {
		doFetch({
			method: 'POST',
			data: { article },
		});
	};

	useEffect(() => {
		if (!response) {
			return;
		}
		setIsSuccessfulSubmit(true);
	}, [response]);

	if (currentUserState.isLoggedIn === false) {
		return <Redirect to="/" />;
	}

	if (isSuccessfulSubmit) {
		return <Redirect to={`/articles/${response.article.slug}`} />;
	}

	return (
		<div>
			<ArticleForm onSubmit={handleSubmit} errors={(error && error.errors) || {}} initialValues={initialValues} />
		</div>
	);
};

export default CreateArticle;
