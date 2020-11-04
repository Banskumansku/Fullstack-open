import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const Edit = ({ author }) => {

    const [showEdit, setShowEdit] = useState(false)
    const [birthYear, setBirthyear] = useState('')
    const [editAuthor] = useMutation(EDIT_AUTHOR)


    const showEditStyle = !showEdit ? { display: '' } : { display: 'none' }
    const showEditForm = showEdit ? { display: '' } : { display: 'none' }

    const updateAuthor = async (event) => {
        event.preventDefault()
        console.log('edit author...', author, author.name)
        await editAuthor({ variables: { name: author.name, setBornTo: Number(birthYear) } })
        //console.log(created)
    }
    return (
        <td>
            <div style={showEditStyle}>
                <button onClick={() => setShowEdit(true)}>edit</button>
            </div>
            <div style={showEditForm}>
                <form onSubmit={updateAuthor}>
                    <input type='number' value={birthYear} onChange={({ target }) => setBirthyear(target.value)} />
                    <button type="submit">edit</button>
                </form>
            </div>
        </td>
    )
}

export default Edit