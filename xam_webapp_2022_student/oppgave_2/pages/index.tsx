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
    return <p>Henter data..</p>
  }

  if (isError) {
    return <p>Noe gikk galt..</p>
  }

  function handleChange(event) {
    console.log(event.target.value)

    if (event.target.value == 'age') {
      console.log(
        data.students.reduce((acc, cur) => {
          if (acc[cur.age]) {
            acc[cur.age]++
          } else {
            acc[cur.age] = 1
          }
          return acc
        }, {})
      )
    }

    if (event.target.value == 'gender') {
      console.log(
        data.students.reduce((acc, cur) => {
          if (acc[cur.gender]) {
            acc[cur.gender]++
          } else {
            acc[cur.gender] = 1
          }
          return acc
        }, {})
      )
    }

    if (event.target.value == 'group') {
      console.log(
        data.students.reduce((acc, cur) => {
          if (acc[cur.group]) {
            acc[cur.group]++
          } else {
            acc[cur.group] = 1
          }
          return acc
        }, {})
      )
    }
  }

  return (
    <main>
      <h1>Student gruppering</h1>
      <section>
        <label htmlFor="ingen">Ingen</label>
        <input
          name="filter"
          id="ingen"
          value="ingen"
          type="radio"
          defaultChecked
          onChange={handleChange}
        ></input>
        <label htmlFor="alder">Alder</label>
        <input
          name="filter"
          id="alder"
          value="age"
          type="radio"
          onChange={handleChange}
        ></input>
        <label htmlFor="kjønn">Kjønn</label>
        <input
          name="filter"
          id="kjønn"
          value="gender"
          type="radio"
          onChange={handleChange}
        ></input>
        <label htmlFor="klasse">Klasse</label>
        <input
          name="filter"
          id="klasse"
          value="group"
          type="radio"
          onChange={handleChange}
        ></input>
      </section>
      {/* <p className="antall">Antall studenter: {data.students.length}</p> */}
      {data?.students
        ?.sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((student) => (
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
