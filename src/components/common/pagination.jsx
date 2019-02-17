import React from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage })  => {
	const pagesCount = Math.ceil(itemsCount / pageSize);
	if (pagesCount === 1) return null;
	const pages = _.range(1, pagesCount + 1);

	return (
		<nav>
			<ul className="pagination">
				{ pages.map((page) => (
						<li className={page === currentPage ? 'page-item active' : 'page-item'} key={page}>
							<a className="page-link" href="#" onClick={() => onPageChange(page)}>{page}</a>
						</li>
					))
				}
			</ul>
		</nav>
	 );
}

Pagination.propTypes = {
	itemsCount: propTypes.number.isRequired, 
	pageSize: propTypes.number.isRequired, 
	onPageChange: propTypes.func.isRequired, 
	currentPage: propTypes.number.isRequired
}

export default Pagination  