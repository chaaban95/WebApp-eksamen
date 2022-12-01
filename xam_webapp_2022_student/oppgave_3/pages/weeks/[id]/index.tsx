import { getWeeks } from '../../../api/weeks'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function UkerNav() {
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
    <main>
      <h2>Uke: {id}</h2>
      <Link href="/">
        <i className="btn">Tilbake</i>
      </Link>
    </main>
  )
}
