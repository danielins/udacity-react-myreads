import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookSearch extends Component {

	state = {
		query: '',
		foundBooks: []
	}

	updateQuery = (query) => {

		const trimmedQuery = query.trim()

		this.setState({ query: trimmedQuery })
		
		if ( trimmedQuery )
			BooksAPI.search( trimmedQuery ).then((books) => {
				this.setState({ foundBooks: books.length ? books : [] })
			})
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
					
					{ this.state.foundBooks.length <= 0 && (
						<p>
							No books were found.
						</p>
					)}
					
					<ol className="books-grid">

						{ this.state.foundBooks.map((book) => (

							<Book
								key={book.id}
								book={book}
							/>

						))}

					</ol>
				</div>

			</div>

		)

	}

}


export default BookSearch