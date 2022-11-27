import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import UkerNav from '../components/UkerNav'
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

  const active = { backgroundColor: 'rgb(6 6 6 / 0.4)' }
  const inactive = {}

  return (
    <main>
      <h1>Lunsjkalender</h1>
      <UkerNav />
      <section className="sec2">
        {Object?.entries(data.year)?.map(([key, value]) => {
          return (
            <div className="inSec" key={key}>
              {<h2>Uke {key}</h2>}
              <a
                style={visible && tempData == key ? active : inactive}
                value={key}
                onClick={(event) => handleClick(event, key)}
              >
                {tempData == key && buttonText ? 'Lukk dager' : 'Se dager'}
              </a>
              {visible && tempData == key
                ? Object?.entries(value.week).map(([key, value]) => (
                    <ul className="dager" key={key}>
                      <li> {key}</li>
                      <li>{value?.name}</li>
                    </ul>
                  ))
                : null}
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default Home
