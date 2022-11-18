import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getStudents } from '../api/students'
import RadioNav from '../components/RadioNav'

const Home: NextPage = () => {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState({})
  const [error, setError] = useState({})
  const [filteredData, setFilteredData] = useState({})
  const [vis, setVis] = useState(true)

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
    if (event?.target.value == 'ingen') {
      setVis(true)
      setFilteredData({})
    }

    if (event?.target.value == 'age') {
      const result = data.students.reduce((gStudents, sStudent) => {
        if (gStudents[sStudent.age] == null) gStudents[sStudent.age] = []
        gStudents[sStudent.age].push(sStudent)
        return gStudents
      }, {})
      setVis(false)
      setFilteredData(result)
      console.log(result)
    }

    if (event?.target.value == 'gender') {
      const result = data.students.reduce((gStudents, sStudent) => {
        if (gStudents[sStudent.gender] == null) gStudents[sStudent.gender] = []
        gStudents[sStudent.gender].push(sStudent)
        return gStudents
      }, {})
      setVis(false)
      setFilteredData(result)
      console.log(result)
    }

    if (event?.target.value == 'group') {
      const result = data.students.reduce((gStudents, sStudent) => {
        if (gStudents[sStudent.group] == null) gStudents[sStudent.group] = []
        gStudents[sStudent.group].push(sStudent)
        return gStudents
      }, {})
      setVis(false)
      setFilteredData(result)
      console.log(result)
    }
  }

  return (
    <main>
      <RadioNav handleChange={handleChange} />
      <>
        {Object?.entries(filteredData)?.map(([key, student]) => {
          return (
            <>
              {<h2>Gruppering etter: {key}</h2>}
              {student.map((st) => (
                <ul key={st.id}>
                  <li>{st.id}</li>
                  <li>{st.name}</li>
                  <li>{st.age}</li>
                  <li>{st.gender}</li>
                  <li>{st.group}</li>
                </ul>
              ))}
              {<h2 className="count">Antall: {student.length}</h2>}
            </>
          )
        })}
      </>

      {vis &&
        data?.students
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
