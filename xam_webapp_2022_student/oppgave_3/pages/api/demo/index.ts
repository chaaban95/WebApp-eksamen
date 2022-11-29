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
    // Create employees IKKE SLETT - DET VIRKER
    // employees.map(async (employee) => {
    //   await prisma.employee.create({
    //     data: employee,
    //   })
    // })
    // Create lunch IKKE SLETT - DET VIRKER
    // await prisma.lunch.create({
    //   data: {},
    // })
    // Create weeks
    // Object?.entries(lunch.year)?.map(async ([key2, value2]) => {
    //   Object?.entries(value2.week)?.map(async ([key3, value3]) => {
    //     await prisma.week.create({
    //       data: {
    //         week: Number(key2),
    //         lunch: {
    //           connect: {},
    //         },
    //       },
    //     })
    //   })
    // })
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
