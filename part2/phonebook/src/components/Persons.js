import React from 'react'

const Person = ({name, number}) =>
  <p style={{margin:0}}>
    {name} {number}
  </p>

const Persons = ({persons}) =>
  persons.map(person => 
    <Person key={person.name} name={person.name} number={person.number} />
  )

export default Persons;