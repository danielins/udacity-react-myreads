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
		
		if ( trimmedQuery ) {
			BooksAPI.search( trimmedQuery ).then((books) => {

				//check if the book is already on the library
				// if it is, update the value of the shelf
				books.forEach((book) => {

					let bookFound = false;

					this.props.books.forEach((libraryBook) => {
						if ( libraryBook.id === book.id ) {
							bookFound = true;
							book.shelf = libraryBook.shelf;
						}
					});

					// if the book is not on the library, consider it none
					if (!bookFound) { book.shelf = "none"; }

				});

				this.setState({ foundBooks: books.length ? books : [] })
			})
		}
	}

	moveBookSearch = (book, shelfId) => {

		// call the default moveBook function
		this.props.moveBook(book, shelfId);

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
								moveBook={ this.moveBookSearch }
								shelfList={ this.props.shelfList }
							/>

						))}

					</ol>
				</div>

			</div>

		)

	}

}


export default BookSearch