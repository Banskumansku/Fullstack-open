
import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import EditAuthor from './components/EditAuthor'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommended from './components/Recommended'
import { BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`new book added: ${subscriptionData.data.bookAdded.title}`)
    }
  })


  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const books = useQuery(ALL_BOOKS, {
    pollInterval: 5000
  })
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 5000
  })

  const me = useQuery(ME, {
    pollInterval: 5000
  })

  console.log(me)
  
  if (books.loading || me.loading || authors.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const showLogged = { display: token ? "block" : "none" };
  const showUnlogged = { display: !token ? "block" : "none" };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button style={showLogged} onClick={logout} >logout</button>
        <button style={showUnlogged} onClick={() => setPage('login')} >login</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={showLogged} onClick={() => setPage('add')}>add book</button>
        <button style={showLogged} onClick={() => setPage('recommend')}>recommend</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
      />
      <div style={{ display: page === 'books' ? '' : 'none' }}>
        <Books books={books}
          show={page === 'books'}
        />
      </div>
      <NewBook
        show={page === 'add'}
      />

      <div style={{ display: page === 'authors' && !!token ? '' : 'none' }}>
        <EditAuthor authors={authors} />
      </div>
      <div style={{ display: page === 'login' && !token ? '' : 'none' }}>
        <LoginForm setToken={setToken} />
      </div>
      <div style={{ display: page === 'recommend' && !!token ? '' : 'none' }}>
        <Recommended books={books} me={me} />
      </div>
    </div>
  )
}

export default App