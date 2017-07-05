import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class BookSearch extends Component {

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	render() {

		return (

			<div className="search-books">

				<div className="search-books-bar">
					<Link
						to='/'
						className='close-search'>
							Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>

				<div className="search-books-results">
					<ol className="books-grid">

					</ol>
				</div>

			</div>

		)

	}

}


export default BookSearch