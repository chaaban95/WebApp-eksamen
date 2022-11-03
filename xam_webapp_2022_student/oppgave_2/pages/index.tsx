import { Student } from '@prisma/client'
import type { NextPage } from 'next'

const Home: NextPage = ({ student }) => {
  return (
    <main>
      <h1>Student gruppering</h1>
      <section>
        <label htmlFor="ingen">Ingen</label>
        <input name="filter" id="ingen" type="radio" checked></input>
        <label htmlFor="alder">Alder</label>
        <input name="filter" id="alder" type="radio"></input>
        <label htmlFor="kjønn">Kjønn</label>
        <input name="filter" id="kjønn" type="radio"></input>
        <label htmlFor="klasse">Klasse</label>
        <input name="filter" id="klasse" type="radio"></input>
      </section>
      {student.map((item: Student) => (
        <ul key={item.id}>
          <li>{item.id}</li>
          <li>{item.name}</li>
          <li>{item.age}</li>
          <li>{item.gender}</li>
          <li>{item.group}</li>
        </ul>
      ))}
    </main>
  )
}

export default Home

export const getServerSideProps = async () => {
  const student = await prisma.student.findMany({
    select: {
      id: true,
      name: true,
      age: true,
      gender: true,
      group: true,
    },
  })
  return {
    props: {
      student,
    },
  }
}
