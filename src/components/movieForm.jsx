import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';
import { saveMovie, getMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Form {
	state = {
		data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
		genres: [],
		errors: {}
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number().min(1).max(100).required().label('Stock in Number'),
		dailyRentalRate: Joi.number().min(1).max(10).required().label('Daily in Rate')
	};

	async componentDidMount () {
		await this.populateGenres();
		await this.populateMovie()
		
	};

	async populateGenres () {
		const { data: genres } = await getGenres();
		this.setState({ genres });
	}

	async populateMovie () {
		try {
			const movieId = this.props.match.params.id;
			if (movieId === 'new') return;

			const { data: movie} = await getMovie(movieId);
			this.setState({ data: this.mapToViewModel(movie) });
		}
		catch (ex) {
			if (ex.response && ex.response.status === 404) {
				this.props.history.replace("/not-found");
			}
		}
	}

	mapToViewModel (movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		};
	}

	doSubmit = async () => {
		await saveMovie(this.state.data);
		
		this.props.history.push('/movies')
	};

	render () {
		
		return (
			<div>
				<h1>Movie form </h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('title', 'Title')}
					{this.renderSelect('genreId', 'Genre', this.state.genres)}
					{this.renderInput('numberInStock', 'Number in Stock', 'number')}
					{this.renderInput('dailyRentalRate', 'Rate', 'number')}

					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

export default MovieForm;