import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from '@prisma/client'

import { employees as employeesData } from '../../../data/employees'
import lunchData from '../../../data/lunch.json'

const prisma = new PrismaClient({ log: ['query'] })

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      async function main() {
        // Create employees
        let employees: Prisma.EmployeeCreateInput[] = employeesData

        await Promise.all(
          employees.map(async (employee) => {
            await prisma.employee.create({
              data: employee,
            })
          })
        )

        // Create lunch
        const Lunch = await prisma.lunch.create({
          data: {},
        })

        // For loop for getting week and creating week in db.
        // for (const weeks of Object.values(lunchData.year)) {
        //   const week = await prisma.week.create({
        //     data: {
        //       week: week,
        //     },
        //   })
        // }

        // const weeks = Object.entries(lunchData.year)

        // const createWeek = await prisma.week.create({
        //   data: {
        //     id: ,
        //     week: 1
        //   },
        // })
      }

      main()
        .then(async () => {
          await prisma.$disconnect()
        })
        .catch(async (e) => {
          console.error(e)
          await prisma.$disconnect()
          process.exit(1)
        })

      return res.status(200).json({
        status: true,
        data: {
          method: req.method,
          message: 'Data has been added!',
        },
      })

    default:
      return res.status(400).json({
        success: false,
        error: {
          type: 'object',
          status: '400',
          message: 'Method not allowed',
        },
      })
  }
}
