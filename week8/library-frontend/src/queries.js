import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres
    ) {
        title
        published
        author
        genres
    }
  }
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
      name
      born
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password)
    {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const BOOK_SUB = gql`
  fragment BOOK_SUB on Book {
    id
    title
    author {
      name
      born
      bookCount
    }
    genres
    published
  }
`

export const BOOK_SUBSCRIPTION = gql`
  subscription {
    bookSubscription {
      ...BOOK_SUB
    }
  }
  ${BOOK_SUB}
`  
