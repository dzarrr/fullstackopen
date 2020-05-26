import React from 'react'

const Person = ({name, phone}) =>
  <p style={{margin:0}}>
    {name} {phone}
  </p>

const Persons = ({persons}) =>
  persons.map(person => 
    <Person key={person.name} name={person.name} phone={person.phone} />
  )

export default Persons;