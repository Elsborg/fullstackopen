import React from 'react'

const Filter = ({ filter, onChange}) => {
  return (
    <div>
        Find countries <input
         value={filter}
         onChange={onChange}
         />
    </div>
  )
}

export default Filter