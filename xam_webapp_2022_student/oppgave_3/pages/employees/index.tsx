import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getEmployees } from '../../api/employees'
import Search from '../../components/Search'

export default function Employees() {
  const [data, setData] = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState()
  const [searchFilter, setSearchFilter] = useState('')
  const [filteredData, setFilteredData] = useState({})

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

  const search = async (event: any) => {
    event.preventDefault()
    let response = await fetch(`./api/search/${searchFilter}`)
    let data = await response.text()
    setFilteredData(data)
    console.log(data)
  }

  let filtered = []

  searchFilter ? (filtered = filteredData) : (filtered = data)
  console.log(filtered)

  return (
    <main>
      <nav className="navAnsatter">
        <h2>Ansatter</h2>
        <ul>
          <Link href={'/'}>
            <li className="btn">Til Hjemmeside</li>
          </Link>
          <Link href={'../employees/create'}>
            <li className="btn">Ny ansatt</li>
          </Link>
        </ul>
      </nav>
      <hr className="mrgTp" />
      <Search
        search={search}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <section className="ansatter">
        {filtered?.employees?.map((employee: any) => (
          <Link key={employee.id} href={`../employees/${employee.id}`}>
            <ul className="ansatt">
              <li>{employee.name}</li>
            </ul>
          </Link>
        ))}
        {/* {filtered.days?.length < 1 && <p>Ingen ansatt</p>} */}
      </section>
    </main>
  )
}
