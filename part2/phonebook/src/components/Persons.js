import React from 'react'

const Person = ({name, number, deletePerson}) =>
  <>
    <span style={{margin:0}}>
      {name} {number}
    </span>
    <button onClick={deletePerson} style={{marginLeft: '10px'}}>delete</button>
    <br></br>
  </>

const Persons = ({persons, handleDeletePerson}) =>
  persons.map(person =>
    <Person key={person.name} name={person.name} number={person.number} deletePerson={() => handleDeletePerson(person)}/>
  )

export default Persons;