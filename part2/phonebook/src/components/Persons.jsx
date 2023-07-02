import React from 'react';
import Person from './Person';

const Persons = ({ persons, filter, handleDelete }) => {
    return (
        <>
         {persons
         .filter((person) => 
            person.name.toLowerCase().includes(filter.toLowerCase())
         )
         .map((filteredPerson) => (
            <Person
                key={filteredPerson.name}
                person={filteredPerson}
                handleDelete={handleDelete}
            />
         ))
         }
        </>
    )
}

export default Persons;