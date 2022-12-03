import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getEmployees } from '../../api/employees'

export default function Employees() {
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
        const result = await getEmployees({})
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

  return (
    <main>
      <nav className="navAnsatter">
        <h2 className="mrgBtm">Ansatter</h2>
        <ul>
          <Link href={'/'}>
            <li className="btn2">Til Hjemmeside</li>
          </Link>
          <Link href={'../employees/create'}>
            <li className="btn2">Ny ansatt</li>
          </Link>
        </ul>
      </nav>
      <hr />
      <section className="ansatter">
        {data.employees?.map((employee) => (
          <p className="ansatt" key={employee.id}>
            {/* <Link href={`../weeks/${week.week}`}> */}
            <span>{employee.name}</span>
            {/* </Link> */}
          </p>
        ))}
      </section>
    </main>
  )
}
