import { useState } from 'react'

export default function Create() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const submit = (e: any) => {
    e.preventDefault()
    setError('')

    if (name.length < 4 || name.length > 24) {
      setError('Name must be between 4 and 24 characters')
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
          window.location.href = './index'
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

        <button type="submit">Lage</button>
      </form>
      <p>{error}</p>
    </main>
  )
}
