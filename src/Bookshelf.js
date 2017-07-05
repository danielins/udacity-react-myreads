import React, { Component } from 'react'


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

							<li key={ book.id }>
								<div className='book'>
									<div className='book-top'>
										<div className='book-cover'
											style={{
												width: 128,
												height: 193,
												background: `url(${ book.imageLinks.thumbnail })`
											}}></div>
										<div className='book-shelf-changer'>
											<select>
												<option value='none' disabled>Move to...</option>
												<option value='currentlyReading'>Currently Reading</option>
												<option value='wantToRead'>Want to Read</option>
												<option value='read'>Read</option>
												<option value='none'>None</option>
											</select>
										</div>
									</div>
									<div className='book-title'>{ book.title }</div>
									<div className='book-authors'>{ book.authors.join(', ') }</div>
								</div>
							</li>

						))}

					</ol>
				</div>

			</section>

		)

	}

}


export default Bookshelf