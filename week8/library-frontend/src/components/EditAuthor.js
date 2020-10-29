import React, { useState } from 'react'

const EditAuthor = (props) => {
    const [filter, setFilter] = useState('')
    let editableAuthor = props.authors.data.allAuthors

    if (filter === '') {
        editableAuthor = []
    }
    editableAuthor = props.authors.data.allAuthors.filter(author => author.name.toLowerCase().includes(filter.toLowerCase()))
    const shown = filter === '' ? { display: 'none' } : { display: '' }

    return (<div>
        <h3>find author to edit</h3>
        <input
            value={filter}
            onChange={({ target }) => setFilter(target.value)}
            placeholder="type here for authors"
        />
        <table style={shown}>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Born</th>
                </tr>
                {editableAuthor.map(a =>
                    <tr key={a.id}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>)
}

export default EditAuthor