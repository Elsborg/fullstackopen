import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([]);

  const displayCountries =
    filter &&
    countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )


  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
    .catch(err => alert(err))
  }, [])


  const onFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const showInfo = (countryName) => {
    setFilter(countryName.common);
  }

  return (
    <>
      <Filter value={filter} onChange={onFilterChange} />
      {!displayCountries ? null : displayCountries.length === 1 ? (
        <Country country={displayCountries[0]} />
      ) : (
        <Countries  
          countries={displayCountries ? displayCountries : []}
          showInfo={showInfo}
        />
      )}
    </>
  )
}

export default App
