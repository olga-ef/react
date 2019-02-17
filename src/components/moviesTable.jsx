import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Like from './common/like';
import Table from './common/table';
import auth from '../services/authService';


class MoviesTable extends Component {
	columns = [
		{path:  'title', label: 'Title', content: movie => <Link to={`movies/${movie._id}`}>{movie.title}</Link>},
		{path: 'genre.name', label: 'Genre'},
		{path: 'numberInStock', label: 'Stock'},
		{path: 'dailyRentalRate', label: 'Rate'},
		{key: 'like', content: movie => <Like movie={movie} onLike={this.props.onLike} liked={movie.liked} />}
	];

	deleteColumn = {
		key: 'delete',
		content: movie => (
			<button 
				onClick={() => this.props.onDelete(movie)} 
				className="btn btn-danger"
			>
				Delete
			</button> 
		)
	}

	constructor () {
		super();
		const user = auth.getCurrentUser();
		if (user && user.isAdmin) {
			this.columns.push(this.deleteColumn)	
		}
	}
	render () {
		const { movies, sortColumn, onSort} = this.props;
		return (
			<Table
				data={movies}
				onSort={onSort}
				sortColumn={sortColumn}
				columns={this.columns}
			 />
		);
	}
};

export default	MoviesTable;