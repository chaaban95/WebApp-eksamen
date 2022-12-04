import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Update() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()
  const { id } = router.query

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
          window.location.href = `../../employees/${id}/`
        }
      })
  }

  return (
    <main>
      <h2>Endre navn</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Navn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Oppdatere</button>
      </form>
      <p>{error}</p>
      <Link href={`../../employees/${id}`}>
        <i className="btn">Tilbake</i>
      </Link>
    </main>
  )
}
