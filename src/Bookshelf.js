import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {

	render() {

		return (

			<section className='bookshelf'>
				
				<header className='bookshelf-header'>
					<h2>
						{ this.props.bookshelf }
					</h2>
				</header>

				<div className='bookshelf-books'>
					
					{ this.props.books.length <= 0 && (
						<p>
							No books on this shelf yet.
						</p>
					)}

					<ol className='books-grid'>

						{ this.props.books.map(( book ) => (

							<Book
								key={book.id}
								book={book}
							/>

						))}

					</ol>
				</div>

			</section>

		)

	}

}


export default Bookshelf