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

    employees.map(async (employee) => {
      await prisma.employee.create({
        data: employee,
      })
    })

    const createLunch = await prisma.lunch.create({ data: {} })

    for (const [key, value] of Object.entries(lunch.year)) {
      const createWeek = await prisma.week.create({
        data: {
          week: Number(key),
          lunch: {
            connect: {
              id: createLunch.id,
            },
          },
        },
      })

      for (const [key2, value2] of Object.entries(value.week)) {
        if (value2) {
          await prisma.day.create({
            data: {
              name: key2,
              week: {
                connect: {
                  id: createWeek.id,
                },
              },
              employee: {
                connect: {
                  id: value2?.id,
                },
              },
            },
          })
        }
      }
    }
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
