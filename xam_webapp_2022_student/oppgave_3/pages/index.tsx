import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import data from '../data/lunch.json'

const Home: NextPage = () => {
  const [visible, setVisible] = useState(false)
  const [tempData, setTempData] = useState('')
  const [buttonText, setButtonText] = useState(false)

  const handleClick = (event, key) => {
    console.log(event.target.value)

    setTempData(key)
    setVisible(!visible)
    setButtonText(!buttonText)
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
            <button value={key} onClick={(event) => handleClick(event, key)}>
              {tempData == key && buttonText ? 'Lukk dager' : 'Se dager'}
            </button>
            {visible && tempData == key
              ? Object?.entries(value.week).map(([key, value]) => (
                  <ul key={key}>
                    <li> {key}</li>
                    <li>{value?.name}</li>
                  </ul>
                ))
              : null}
          </>
        )
      })}
    </main>
  )
}

export default Home
