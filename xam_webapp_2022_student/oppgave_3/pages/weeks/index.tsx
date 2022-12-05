import { getWeeks } from '../../api/weeks'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function UkerNav() {
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
    return (
      <main>
        <p>Henter data..</p>
      </main>
    )
  }

  if (isError) {
    return (
      <main>
        <p>Noe gikk galt..</p>
      </main>
    )
  }

  return (
    <>
      <h2 className="mrgTp">Uker</h2>
      <section className="ukerWrapper">
        {data.weeks?.map((week: any) => (
          <Link key={week.week} href={`../weeks/${week.week}`}>
            <span className="uker">
              <span>{week.week}</span>
            </span>
          </Link>
        ))}
      </section>
    </>
  )
}
