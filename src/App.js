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

  render() {
    return (
      <div className="app">

        <Route path='/search' render={() => (
          <BookSearch />
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
