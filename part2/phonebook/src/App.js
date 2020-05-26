import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ search, setSearch ] = useState('')

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

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with 
        <input onChange={handleSearchChange}/>
      </div>
      <h2>add a new </h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons
          .filter(person =>
              person.name.toLowerCase().includes(search.toLowerCase())
            )
          .map(person => 
              <p key={person.name} style={{margin: 0}}>
                {person.name} {person.phone}
              </p>
            )
        }
      </div>
    </div>
  )
}

export default App