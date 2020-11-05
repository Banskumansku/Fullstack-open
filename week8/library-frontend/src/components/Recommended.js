import React from 'react'

const Recommended = (props) => {

    const books = props.books.data.allBooks
    const me = props.me.data.me.favoriteGenre
    if (!me) {
        return null
    }
    const filteredByGenre = books.filter(book => book.genres.includes(me))

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
                    {filteredByGenre.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended