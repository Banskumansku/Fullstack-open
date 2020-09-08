import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/PersonService'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([{ name: '', number: '' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([{ name: '', number: '' }])
  const [notificationMessage, setNotificationMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
        setFilteredPersons(response)
      })
  }, [])


  const addContact = (event) => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, do you want to update number?`)) {
        const updatedPerson = persons.find(p => p.name === newName)
        personService.update(updatedPerson.id, personObject).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
          setFilteredPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
          setNotificationMessage(
            `Contact '${personObject.name}' was updated to server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Contact '${personObject.name}' was added to server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const removeContact = (deletePerson) => {
    if (window.confirm(`Do you really want to delete ${deletePerson.name}?`)) {
      personService.remove(deletePerson.id).then(value => {
        setPersons(persons.filter(person => person !== deletePerson))
        setFilteredPersons(filteredPersons.filter(person => person !== deletePerson))
        setNotificationMessage(
          `Contact '${deletePerson.name}' was deleted from the server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const updatePersons = (event) => setFilteredPersons(event.target.value === '' ? persons : persons.filter(person => person.name.includes(event.target.value)));

  return (
    <div>
      <div>
        <p>Filter</p>
        <input
          onChange={updatePersons} />
      </div>
      <h2>Phonebook</h2>
      <Notification notificationMessage={notificationMessage} />
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
      <h2>Contacts</h2>
      <ul>
        {filteredPersons.map((person, i) =>
          <Person key={i}
            person={person}
            removeContact={() => removeContact(person)} />
        )}
      </ul>
    </div>
  )

}

export default App