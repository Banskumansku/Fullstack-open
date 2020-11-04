import React, { useState } from 'react'
import Edit from './Edit'

const EditAuthor = (props) => {
    const [filter, setFilter] = useState('')
    let editableAuthor = props.authors.data.allAuthors

    if (filter === '') {
        editableAuthor = []
    }
    editableAuthor = props.authors.data.allAuthors.filter(author => author.name.toLowerCase().includes(filter.toLowerCase()))
    const showAuthors = filter === '' ? { display: 'none' } : { display: '' }

    return (<div>
        <h3>set birth year</h3>
        <input
            value={filter}
            onChange={({ target }) => setFilter(target.value)}
            placeholder="type here for authors"
        />
        <table style={showAuthors}>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Born</th>
                </tr>
                {editableAuthor.map(a =>
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <Edit author={a} />

                    </tr>
                )}
            </tbody>
        </table>
    </div>)
}

export default EditAuthor