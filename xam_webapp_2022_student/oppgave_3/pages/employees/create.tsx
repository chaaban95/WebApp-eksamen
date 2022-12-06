import Link from 'next/link'
import { useState } from 'react'

export default function Create() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  const isSuccess = status === 'success'

  const submit = (e: any) => {
    e.preventDefault()
    setError('')

    if (name.length == 0) {
      setError('Navn mangler!')
      return
    }

    if (
      name.match(/\d+/g) ||
      name.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
    ) {
      setError('Navn kan ikke inneholde tall eller spesialtegn')
      return
    }

    if (name.length < 3 || name.length > 23) {
      setError('Navnet må være mellom 3 og 23 tegn')
      return
    }

    fetch('../api/employees/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
            window.location.href = '../employees'
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
      <h2>Legg til ny ansatt</h2>
      <form onSubmit={submit}>
        <input
          className="inSearch"
          placeholder="Navn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn" type="submit">
          Lage
        </button>
      </form>
      <p>{error}</p>
      <Link href="../employees">
        <i className="btn mrgTp">Tilbake</i>
      </Link>
    </main>
  )
}
