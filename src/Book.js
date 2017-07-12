import React, { Component } from 'react'


class Book extends Component {

	onChangeHandler = (e) => {

		this.props.moveBook( this.props.book, e.target.value );

	}

	render() {

		return (
			<li>
				<div className='book'>
					<div className='book-top'>
						<div className='book-cover'
							style={{
								width: 128,
								height: 193,
								background: `url(${ this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'http://placehold.it/128x193?text=Cover+not+found' })`
							}}></div>
						<div className='book-shelf-changer'>
							<select onChange={ this.onChangeHandler } value={ this.props.book.shelf }>
								<option value='none' disabled>Move to...</option>
								
								{ this.props.shelfList.map((shelf) => (
									<option
										key={ shelf.id }
										value={shelf.id}
									>
										{shelf.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className='book-title'>{ this.props.book.title }</div>
					<div className='book-authors'>{ this.props.book.authors }</div>
				</div>
			</li>
		)

	}

}


export default Book