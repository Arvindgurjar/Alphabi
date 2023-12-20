
import React from 'react';
import "./paginate.css"
const Paginate = ({
	postsPerPage,
	totalPosts,
	currentPage,
	paginate,
	previousPage,
	nextPage,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="pagination-container">
			<ul className="pagination pagesText">
				<li onClick={previousPage}>
                Previous
				</li>
				{pageNumbers.map((number) => (
					<li
						key={number}
						onClick={() => paginate(number)}
						className={
							 number === currentPage ? "active-page" : ''
						}
					>
						{number}
					</li>
				))}
				<li onClick={nextPage}>
					Next
				</li>
			</ul>
		</div>
	);
};

export default Paginate;