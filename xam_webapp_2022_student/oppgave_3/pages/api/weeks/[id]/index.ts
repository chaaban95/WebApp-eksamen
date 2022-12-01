import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const { id } = req.query

      // Does not work not sure why??
      // const week = await prisma.week.findUnique({
      //   where: {
      //     week: id,
      //   },
      // })

      // Todo: get the right data
      // Using raw raw queries instead
      const days = await prisma.$queryRaw`SELECT name, employeeId as employee FROM day WHERE weekId = ${id}`

      return res.status(200).json({
        status: true,
        data: {
          method: req.method,
          resources: 'api/weeks/',
          data: days,
        },
      })

    default:
      return res.status(400).json({
        success: false,
        error: {
          type: 'Object',
          status: '400',
          message: 'Method not allowed',
        },
      })
  }
}
