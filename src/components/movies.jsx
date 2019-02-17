import React, { Component } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getMovies, deleteMovie } from '../services/movieService.js';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/genreService';
import { Link } from 'react-router-dom';

import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup'
import SearchBox from './searchBox';

class Movies extends Component {
	state = {
		movies: [],
		genres: [], 
		pageSize: 4,
		searchQuery: '',
		selectedGenre: null,
		currentPage: 1,
		sortColumn: { path: 'title', order: 'asc' }
	};

	async componentDidMount () {
		const { data } = await getGenres()
		const genres = [{_id: '', name: 'All Genres'}, ...data]
		const { data: movies } = await getMovies();
		this.setState({movies, genres})
	};

	getPageData = () => {
		const { pageSize, currentPage, selectedGenre, searchQuery, sortColumn, movies: allMovies } = this.state;

		let filtered = allMovies;
		if (searchQuery) {
			filtered = allMovies.filter( m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
		} else if (selectedGenre && selectedGenre._id) {
			filtered = allMovies.filter(m => m.genre._id === selectedGenre._id); 
		}

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies }
	}

	handleDelete = async movie => {
		const originalMovies = this.state.movies;
		const movies = originalMovies.filter(item => item._id !== movie._id)
		this.setState({movies});

		try {
			await deleteMovie(movie._id);
		}
		catch (ex) {
			if (ex.response && ex.response.status === 404) {
				toast.error('this movie has aledy been deleted');
			}
			this.setState({movies: originalMovies});
		}
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = {...movie};
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = page => {
		this.setState({ currentPage : page })
	};

	handleGenereSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' });
	};

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};

	handleChange = query => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
	};

	render () {
		const { pageSize, currentPage, sortColumn } = this.state;
		const { user } = this.props;

		const { totalCount, data: movies } = this.getPageData();
			 
		return (
		<div className="row">
			<div className="col-3">
				<ListGroup 
					items={this.state.genres}
					selectedItem={this.state.selectedGenre}  
					onItemSelect={this.handleGenereSelect}
				/>
			</div>
			<div className="col">
				{user && (
					<Link 
						to="/movies/new" 
						className="btn btn-primary" 
						style={{ marginBottom: 20 }} 
					> 
						New Movie  
					</Link>
				)}
				<p>Showin {totalCount} movies in the database</p>
				<SearchBox value={this.state.searchQuery} onChange={this.handleChange} />					 
				<MoviesTable
					movies={movies}
					sortColumn={sortColumn}
					onLike={this.handleLike}
					onDelete={this.handleDelete}
					onSort={this.handleSort}
				/>
				<Pagination 
					itemsCount={totalCount} 
					pageSize={pageSize}
					currentPage={currentPage}  
					onPageChange={this.handlePageChange} 
				/>
			</div>
		</div>);
	}
}

export default Movies