import React from 'react'

const PersonForm = (props) => {
    const { onFormSubmit, onNameChange, name, onNumberChange, number } = props
  return (
    <form onSubmit={onFormSubmit}>
      <h2>add a new</h2>
      <div>
        name: <input onChange={onNameChange} value={name} />
      </div>
      <div>
        number: <input onChange={onNumberChange} value={number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm