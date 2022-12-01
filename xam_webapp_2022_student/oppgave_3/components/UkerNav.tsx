import { getWeeks } from '../api/weeks'
import { useEffect, useState } from 'react'

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
    return <p>Henter data..</p>
  }

  if (isError) {
    return <p>Noe gikk galt..</p>
  }

  return (
    <>
      <h2>Uker</h2>
      <section className="ukerWrapper">
        {data.weeks?.map((week) => (
          <span className="uker" key={week.id}>
            <span>{week.week}</span>
          </span>
        ))}
      </section>
    </>
  )
}
