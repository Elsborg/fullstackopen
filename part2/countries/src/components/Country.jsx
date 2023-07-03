import React from 'react'
import Weather from './Weather'


const Country = ({ country }) => {
  return (
    <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h4>Languages:</h4> 
        <ul>
            {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
            ))}
      </ul>

        <img
            width={100}
            src={country.flags.png}
            alt={country.flags.alt}
        />
        <Weather city={country.capital} />
    </div>
  )
}

export default Country