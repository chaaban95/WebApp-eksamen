import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const { id } = req.query

      // This works dont touch..
      // const days = await prisma.week.findMany({
      //   where: {
      //     week: Number(id),
      //   },
      //   include: {
      //     day: true,
      //   },
      // })

      const days = await prisma.day.findMany({
        where: {
          weekId: 'clb5g5o8r0002ty2o93k1i3uj',
        },
        include: {
          employee: true,
          week: true,
        },
      })

      return res.status(200).json({
        status: true,
        data: {
          method: req.method,
          resources: 'api/weeks/[id]',
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
