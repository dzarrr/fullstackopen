import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')

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
    console.log(newName, newPhone)
    if (duplicateName(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        phone: newPhone
      }
      setPersons(persons.concat(newPerson))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
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
        onPhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons persons={getFilteredPerson(persons)} />
      </div>
    </div>
  )
}

export default App