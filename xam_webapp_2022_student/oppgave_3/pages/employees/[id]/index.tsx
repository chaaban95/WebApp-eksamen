import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Dag() {
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
          const result = await fetch(`../../api/employees/${id}`)
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

  console.log(data)

  return (
    <main>
      <h2>Ansatt: {id}</h2>
      <h2>Navn: {data?.employee?.name}</h2>
      <h3 className="mrgTp">Ansvarlig for:</h3>
      {data?.employee?.day?.length < 1 ? (
        <p>Ingen</p>
      ) : (
        data?.employee?.day.map((dag: any) => (
          <div className="ansvar" key={dag.id}>
            <p>
              <strong> Uke nr.:</strong> {dag.week.week}
            </p>
            <p>
              <strong>Dag:</strong> {dag.name}
            </p>
          </div>
        ))
      )}
      <Link href="../../employees">
        <i className="btn mrgRt">Tilbake</i>
      </Link>
      <Link href={`../../employees/${id}/update`}>
        <i className="btn">Endre Navn</i>
      </Link>
    </main>
  )
}
