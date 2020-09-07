import React from 'react'
import Person from './Person'

const Persons = ({ persons }) => {
    return (
        <div>
            <ul>
                {persons.map((person, i) =>
                    <Person key={i} person={person} />
                )}
            </ul>
        </div>
    )
}

export default Persons