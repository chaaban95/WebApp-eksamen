import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Pokemons from '../components/Pokemons'
import data from '../data/lunch.json'

const Home: NextPage = () => {
  const [visible, setVisible] = useState(false)
  const handleClick = () => {
    setVisible(!visible)
  }
  return (
    <main>
      <h1>Lunsjkalender</h1>
      <h2>Uker</h2>
      {Object?.entries(data.year)?.map(([key]) => (
        <span key={key}>
          <span>{key}</span>
        </span>
      ))}
      {Object?.entries(data.year)?.map(([key, value]) => {
        return (
          <>
            {<h2 key={key}>Uke {key}</h2>}
            <button onClick={handleClick}>Se dager</button>
            {visible &&
              Object?.entries(value.week).map(([key, value]) => (
                <ul key={key}>
                  <li> {key}</li>
                  <li>{value?.name}</li>
                </ul>
              ))}
          </>
        )
      })}
    </main>
  )
}

export default Home
