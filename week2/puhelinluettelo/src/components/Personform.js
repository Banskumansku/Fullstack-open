import React from 'react'

const Personform = () => {
    return (
        <form onSubmit={addContact}>
            <div>
                <input value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <input value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Personform