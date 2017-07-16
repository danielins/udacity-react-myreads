import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends Component {

  /**
   * Initial state of books in library
   */
  state = {
    books: [],
    bookshelves: [
      {
        'id': 'currentlyReading',
        'name': 'Currently Reading'
      },
      {
        'id': 'wantToRead',
        'name': 'Want to Read'
      },
      {
        'id': 'read',
        'name': 'Read'
      },
      {
        'id': 'none',
        'name': 'None'
      }
    ]
  }

  /**
   * Call to API to get list of books
   */
  componentDidMount() {

    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })

  }


  /**
   * Function to call an update on a book
   * Either:
   * - adding it to the library
   * - changing its bookshelf
   * - removing from the library
   * @param book {Object} - instance of a book
   * @param shelfId {String} - id of a bookshelf
   */
  moveBook = (book, shelfId) => {

    let newLibrary = this.state.books;

    const bookIndex = this.isOnLibrary(book.id);

    // If is going to the put on the library or stay there
    // Check if book is already on library
    // If it is, change the shelf of the book
    if ( bookIndex >= 0 ) {

      // Check is the book is going to be removed from the library
      if ( shelfId !== 'none' ) {

        newLibrary[bookIndex].shelf = shelfId;

      } else {

        newLibrary.splice(bookIndex, 1);

      }

    // If it's not, push the book onto the library array with new shelf
    } else {

      book.shelf = shelfId;
      newLibrary.push(book);

    }

    // update the state
    this.setState({ books: newLibrary });

    // update the API
    BooksAPI.update(book, shelfId);

  }


  isOnLibrary = (id) => {

    return this.state.books.findIndex((book) => { 
      return book.id === id
    })

  }


  render() {
    return (
      <div className="app">

        <Route path='/search' render={() => (
          <BookSearch
            books={ this.state.books }
            moveBook={ this.moveBook }
            shelfList={ this.state.bookshelves }
          />
        )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                { this.state.bookshelves.filter((bookshelf) => bookshelf.id !== 'none').map((bookshelf) => (

                    <Bookshelf
                      key={ bookshelf.id }
                      bookshelf={ bookshelf.name }
                      books={ this.state.books.filter(
                        (book) => book.shelf === bookshelf.id
                      )}
                      moveBook={ this.moveBook }
                      shelfList={ this.state.bookshelves }
                    />

                ))}

              </div>
            </div>

            <div className="open-search">
              <Link
                to='/search'
                title='Add a book to your library'>
                Add a book
              </Link>
            </div>

          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
