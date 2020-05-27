import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState({content: null, status: ''})

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

  const updatePerson = () => {
    const updatedPerson = persons.find(p => p.name === newName)
    const changedPerson = { ...updatedPerson, number: newNumber}

    phonebookService
      .update(updatedPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
      })

  }

  const addPerson = (event) => {
    event.preventDefault()
    if (duplicateName(newName)) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      )) {
        updatePerson()
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .create(newPerson)
        .then(updatedData => {
          setPersons(persons.concat(updatedData))
          setMessage({content: `Added ${newPerson.name}`, status: "success"})
          setTimeout(() => {
            setMessage({content: null, status: ''})
          }, 5000)
        })
    }
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}`)){
      phonebookService
        .deletePerson(person.id)
        .then(() => {
          phonebookService.getAll()
          .then(updatedPersons => setPersons(updatedPersons))
        })
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
      <Notification content={message.content} status={message.status} />
      <Filter onChange={handleFilterChange} />
      <h2>add a new </h2>
      <PersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={getFilteredPerson(persons)} handleDeletePerson={deletePerson}/>
      </div>
    </div>
  )
}

export default App