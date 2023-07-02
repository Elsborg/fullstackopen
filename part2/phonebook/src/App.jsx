import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
   
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
    .catch(err => alert(err))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber 
    }

    
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
  
    if (existingPerson) {
      console.log('person: ',existingPerson)
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person))
            setSuccessMessage(`Updated ${updatedPerson.name}'s number`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
            
          })
          .catch(err => {
            if (err.data) {
              setErrorMessage(err)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            } else {
              setErrorMessage(
                `Information of ${updatedPerson.name} has already been removed from server`
              )
              setPersons(persons.filter((p) => p.id !== updatedPerson.id))
              setNewName("")
              setNewNumber("")
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }    
            }
          )
      }
      return 
    } 


    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setSuccessMessage(`Added ${personObject.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      setNewName('')
      setNewNumber('')
    })
    .catch((err) => {
      setErrorMessage(err)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })

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

  const handleDelete = id => {
    if(window.confirm(`Delete ${persons.find((item) => item.id === id)?.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(item => item.id !== id))
      })
      .catch(err => alert(err))
    } else {
      return
    }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
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
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App