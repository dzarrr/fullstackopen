import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(
        persons => setPersons(persons)
      )
  }, [])

  const duplicateName = (newName) => {
    let duplicate = false

    persons.forEach(person => {
      if (person.name === newName) {
        duplicate = true
      }
    })

    return duplicate
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (duplicateName(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .update(newPerson)
        .then(updatedData => setPersons(persons.concat(updatedData)))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const getFilteredPerson = (persons) =>
    persons
    .filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>add a new </h2>
      <PersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={getFilteredPerson(persons)} />
      </div>
    </div>
  )
}

export default App