import type { NextApiRequest, NextApiResponse } from 'next'
import { employees } from '../../../data/employees'
import lunch from '../../../data/lunch.json'
import prisma from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    // Start with clean database.
    await prisma.day.deleteMany({})
    await prisma.week.deleteMany({})
    await prisma.lunch.deleteMany({})
    await prisma.employee.deleteMany({})

    for (const employee of employees) {
      await prisma.employee.create({
        data: employee,
      })
    }

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

    return res
      .status(201)
      .json({ success: true, message: 'Database populated succesfully.' })
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
