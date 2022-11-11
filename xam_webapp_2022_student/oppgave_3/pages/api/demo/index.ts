import type { NextApiRequest, NextApiResponse } from 'next'

import { employees as employeesData } from '../../../data/employees'
import lunchData from '../../../data/lunch.json'

import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ['query'] })

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'post':
      async function main() {
        let employees: Prisma.EmployeeCreateInput[] = employeesData

        await Promise.all(
          employees.map(async (employee) => {
            await prisma.employee.create({
              data: employee,
            })
          })
        )
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
          message: 'Employees have been added!',
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
