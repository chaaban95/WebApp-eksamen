import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Uke() {
  const [data, setData] = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState()

  const router = useRouter()
  const { id } = router.query

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  useEffect(() => {
    const handler = async () => {
      setStatus('loading')
      try {
        if (id) {
          const result = await fetch(`../../api/weeks/${id}`)
          const data = await result.json()
          setStatus('success')
          setData(data)
        }
      } catch (error) {
        setStatus('error')
        setError(error as any)
        setTimeout(() => {
          setStatus('idle')
        }, 2000)
      }
    }
    handler()
  }, [id])

  if (isLoading) {
    return <p>Henter data..</p>
  }

  if (isError) {
    return <p>Noe gikk galt..</p>
  }

  return (
    <main>
      <h2>Uke: {id}</h2>
      <div className="ukeWrapper">
        {data?.week?.map((days: any) =>
          days.day.length < 1 ? (
            <p>Fri dag</p>
          ) : (
            days.day.map((dag: any) => {
              return (
                <ul className="uke" key={dag.id}>
                  <li>{dag.name}</li>
                  <li>{dag.employee.name}</li>
                </ul>
              )
            })
          )
        )}
      </div>
      <Link href="/">
        <i className="btn mrgTp">Tilbake</i>
      </Link>
    </main>
  )
}
