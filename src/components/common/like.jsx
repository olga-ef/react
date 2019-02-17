import React, { Component } from 'react';

class Like extends Component {
	
	render () {
		const { onLike, movie } = this.props;
		return <span className="clickable" onClick={() => onLike(movie)}><i className={this.getIcon()}></i></span>
		
	}

	getIcon () {
		let classes = 'fa fa-heart';
		classes += this.props.liked ? '' : '-o';
		return classes;
	}
}
export default Like  