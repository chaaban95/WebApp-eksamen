import { useRouter } from 'next/router'

export default function Week() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <h2>Hei {id}</h2>
    </>
  )
}
