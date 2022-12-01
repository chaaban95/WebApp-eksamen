import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import UkerNav from '../components/UkerNav'
import { getWeeks } from '../api/weeks'

const Home: NextPage = () => {
  const [visible, setVisible] = useState(false)
  const [tempData, setTempData] = useState('')
  const [buttonText, setButtonText] = useState(false)
  const [data, setData] = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState()

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  useEffect(() => {
    const handler = async () => {
      setStatus('loading')
      try {
        const result = await getWeeks({})
        setStatus('success')
        setData(result)
      } catch (error) {
        setStatus('error')
        setError(error as any)
        setTimeout(() => {
          setStatus('idle')
        }, 2000)
      }
    }
    handler()
  }, [])

  if (isLoading) {
    return <p>Henter data..</p>
  }

  if (isError) {
    return <p>Noe gikk galt..</p>
  }

  const handleClick = (event, key) => {
    console.log(key)

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
      {/* <p>{JSON.stringify(data.weeks.map((week) => week.week))}</p> */}

      <section className="sec2">
        {data.weeks?.map((week) => {
          return (
            <div className="inSec" key={week.id}>
              {<h2>Uke {week.week}</h2>}
              <a
                style={visible && tempData == week.week ? active : inactive}
                value={week.id}
                onClick={(event) => handleClick(event, week.week)}
              >
                {tempData == week.week && buttonText
                  ? 'Lukk dager'
                  : 'Se dager'}
              </a>
              {/* {visible && tempData == week.id
                ? week.lunch.map((lunch) => (
                    <ul className="dager" key={lunch.id}>
                      <li> {lunch.id}</li>
                      <li>{lunch.name}</li>
                    </ul>
                  ))
                : null} */}
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default Home
