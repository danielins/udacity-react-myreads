import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends Component {

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
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
