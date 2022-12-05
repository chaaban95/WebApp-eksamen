import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getWeeks } from '../api/weeks'
import UkerNav from './weeks'

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

  const handleClick = (event: any, week: any) => {
    setTempData(week)
    setVisible(!visible)
    setButtonText(!buttonText)
  }

  const active = { backgroundColor: 'rgb(6 6 6 / 0.4)' }
  const inactive = {}

  return (
    <main>
      <nav className="navForside">
        <h1>Lunsjkalender</h1>
        <Link href={'../employees'}>
          <button className="btn">Til Ansatte</button>
        </Link>
      </nav>
      <UkerNav />
      <section className="sec2">
        {data?.weeks?.map((week: any) => {
          return (
            <div className="inSec" key={week.week}>
              {<h2>Uke {week.week}</h2>}
              <a
                style={visible && tempData == week.week ? active : inactive}
                value={week.week}
                onClick={(event) => handleClick(event, week.week)}
              >
                {tempData == week.week && buttonText
                  ? 'Lukk dager'
                  : 'Se dager'}
              </a>
              {visible && tempData == week.week ? (
                week.day.length < 1 ? (
                  <p>Fri ^_^</p>
                ) : (
                  week.day.map((day: any) => (
                    <ul className="dager" key={day.id}>
                      <li>{day.name}:</li>
                      <li>{day.employee.name}</li>
                    </ul>
                  ))
                )
              ) : null}
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default Home
