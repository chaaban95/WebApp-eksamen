import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Update() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  const router = useRouter()
  const { id } = router.query

  const isSuccess = status === 'success'

  const submit = (e: any) => {
    e.preventDefault()
    setError('')

    if (name.length == 0) {
      setError('Navn mangler!')
      return
    }

    if (name.length < 3 || name.length > 23) {
      setError('Navnet må være mellom 3 og 23 tegn')
      return
    }

    fetch(`../../api/employees/${id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error)
        } else {
          setStatus('success')
          setTimeout(() => {
            window.location.href = `../../employees/${id}/`
          }, 2000)
        }
      })
  }

  if (isSuccess) {
    return (
      <main>
        <p>Vellykket, omdiriger til forrige side, vennligst vent..</p>
      </main>
    )
  }

  return (
    <main>
      <h2>Endre navn</h2>
      <form onSubmit={submit}>
        <input
          className="inSearch"
          placeholder="Navn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn" type="submit">
          Oppdatere
        </button>
        <p className="feedback">{error}</p>
      </form>
      <Link href={`../../employees/${id}`}>
        <i className="btn mrgTp">Tilbake</i>
      </Link>
    </main>
  )
}
