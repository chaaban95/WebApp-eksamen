import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getStudents } from '../api/students'

const Home: NextPage = () => {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState({})
  const [error, setError] = useState({})

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  useEffect(() => {
    const handler = async () => {
      setStatus('loading')
      try {
        const result = await getStudents({})
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
    return <p>Henter data ...</p>
  }

  if (isError) {
    return <p>Noe gikk galt ...</p>
  }

  return (
    <main>
      <h1>Student gruppering</h1>
      <section>
        <label htmlFor="ingen">Ingen</label>
        <input name="filter" id="ingen" type="radio" defaultChecked></input>
        <label htmlFor="alder">Alder</label>
        <input name="filter" id="alder" type="radio"></input>
        <label htmlFor="kjønn">Kjønn</label>
        <input name="filter" id="kjønn" type="radio"></input>
        <label htmlFor="klasse">Klasse</label>
        <input name="filter" id="klasse" type="radio"></input>
      </section>

      {data?.students?.map((student) => (
        <ul key={student.id}>
          <li>{student.id}</li>
          <li>{student.name}</li>
          <li>{student.age}</li>
          <li>{student.gender}</li>
          <li>{student.group}</li>
        </ul>
      ))}
    </main>
  )
}

export default Home
