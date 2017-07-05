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
    books: []
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

                <Bookshelf
                  bookshelf='Currently Reading'
                  books={ this.state.books.filter(
                    (book) => book.shelf === "currentlyReading"
                  )}
                />

                <Bookshelf
                  bookshelf='Want to Read'
                  books={ this.state.books.filter(
                    (book) => book.shelf === "wantToRead"
                  )}
                />

                <Bookshelf
                  bookshelf='Read'
                  books={ this.state.books.filter(
                    (book) => book.shelf === "read"
                  )}
                />

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
