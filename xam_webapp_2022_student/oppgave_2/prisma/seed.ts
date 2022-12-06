import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker/locale/nb_NO'

const prisma = new PrismaClient()

const students = (count: number) => {
  return Array(count)
    .fill(null)
    .map(() => {
      return {
        id: faker.datatype.uuid(),
        gender: faker.name.sexType(),
        name: faker.name.firstName(),
        age: faker.datatype.number({ min: 18, max: 35 }),
      }
    })
}

async function main() {
  console.log(`Start seeding ...`)
  const student = students(25)
  for (const st of student) {
    await prisma.student.create({ data: st })
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
