import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
   
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber 
    }

    const existingName = persons.map((person) => person.name.toLocaleLowerCase())
    
    if (existingName.includes(newName.toLocaleLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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

  const showFilter = filter === ''
  ? persons
  : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()))

const filteredPersons = () => showFilter.map(person => 
  <p key={person.name}>{person.name} {person.number}</p>
)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm 
       onFormSubmit={addPerson} 
       name={newName}
       onNameChange={handleNameChange}
       number={newNumber}
       onNumberChange={handleNumberChange}
       />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons()}  />
    </div>
  )
}

export default App