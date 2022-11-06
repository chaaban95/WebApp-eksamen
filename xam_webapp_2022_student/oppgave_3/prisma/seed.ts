import { PrismaClient } from '@prisma/client'

import { employees } from '../data/employees'
import lunch from '../data/lunch.json'

const prisma = new PrismaClient()



const createEmployees = async () => {
  employees.map(async (employee) => {
    await prisma.employee.create({data:
    })
  }
}

async function main() {
  console.log(`Start seeding ...`)
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
