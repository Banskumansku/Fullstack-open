import React from 'react'

const Person = ({ person, removeContact }) => {
    return (
        <div>
            <li>{person.name}: {person.number} <span><button onClick={removeContact}>Remove</button></span> </li>
        </div>
    )
}

export default Person