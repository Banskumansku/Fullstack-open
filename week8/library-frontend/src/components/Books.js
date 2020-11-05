import React, { useState } from 'react'

const Books = (props) => {

  const books = props.books.data.allBooks

  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState("Show all")

  setGenres([...books.flatMap(book => book.genres), "Show all"])


  const genreFilter = books.filter(book => (genre && genre !== "Show all") ? book.genres.includes(genre) : book)

  console.log(genres)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {genreFilter.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <ul>
        {genres.map((genre, id) =>
          <li key={id}>
            <button onClick={() => setGenre(genre)}> {genre} </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Books