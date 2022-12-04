import Link from 'next/link'
import { useState } from 'react'

export default function Create() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

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
          window.location.href = '../employees'
        }
      })
  }

  return (
    <main>
      <h2>Legg til ny ansatt</h2>
      <form onSubmit={submit}>
        <input
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
