
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import EditAuthor from './components/EditAuthor'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')

  const books = useQuery(ALL_BOOKS, {
    pollInterval: 5000
  })
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 5000
  })
  if (authors.loading)  {
    return <div>loading...</div>
  }



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
      />

      <Books books={books}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <EditAuthor authors={authors}/>
    </div>
  )
}

export default App