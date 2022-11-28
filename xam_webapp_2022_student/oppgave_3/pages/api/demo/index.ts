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
    // Create employees
    // employees.map(async (employee) => {
    //   await prisma.employee.create({
    //     data: employee,
    //   })
    // })
    // Create lunch
    // const keys = Object.keys(lunch.year)
    // await prisma.lunch.create({
    //   data: {},
    // })
    // Create weeks
    // Object?.entries(lunch.year)?.map(async ([key, value]) => {
    //   Object?.entries(value.week)?.map(async ([key2, value2]) => {
    //     await prisma.week.create({
    //       data: {
    //         week: {
    //           key,
    //           lunch: {
    //             create: {
    //               keys
    //             }
    //           }
    //         },
    //       },
    //     })
    //     await prisma.day.create({
    //       data: key2,
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
