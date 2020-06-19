const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password  = process.argv[2]
const name      = process.argv[3]
const number    = process.argv[4]

const url = `mongodb+srv://super_user:${password}@clusterfullstackopen-rxxaa.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', noteSchema)

if ((name === undefined) && (number === undefined)) {
  console.log('phonebook: ')
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
} else {
  const entry = new Person({
    name,
    number
  })

  entry.save().then(result => {
    console.log(`Added ${entry.name} number ${entry.number} to phonebook`)
    mongoose.connection.close()
  })
}

