import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from '@prisma/client'

import { employees } from '../../../data/employees'
import lunch from '../../../data/lunch.json'

const prisma = new PrismaClient({ log: ['query'] })

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  async function main() {
    await prisma.day.deleteMany({})
    await prisma.week.deleteMany({})
    await prisma.lunch.deleteMany({})
    await prisma.employee.deleteMany({})

    // Create employees IKKE SLETT - DET VIRKER
    employees.map(async (employee) => {
      await prisma.employee.create({
        data: employee,
      })
    })

    // Create lunch IKKE SLETT - DET VIRKER
    const crateLunch = await prisma.lunch.create({
      data: {},
    })

    // Create weeks VIRKER DELVIS (får ikke alle uker)
    Object?.entries(lunch.year)?.map(async ([key, value]) => {
      const createWeek = await prisma.week.create({
        data: {
          week: Number(key),
          lunch: {
            connect: { id: crateLunch.id },
          },
        },
      })
      // Create days
      // Object?.entries(value.week)?.map(async ([key2, value2]) => {
      //   const createDay = await prisma.week.create({
      //     data: {
      //       day: ,
      //       week: {
      //         connect: { id: },
      //       },
      //     },
      //   })
      // })
    })
  }

  main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      console.log('Added')
      await prisma.$disconnect()
    })
}
