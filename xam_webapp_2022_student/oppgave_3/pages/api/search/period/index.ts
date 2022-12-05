import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const { gte, lte } = req.body

    const weeks = await prisma.week.findMany({
      where: {
        week: {
          gte, // Greater than or equal
          lte, // Lower than or equal
        },
      },
      select: {
        week: true,
        day: {
          select: {
            id: true,
            name: true,
            employee: true,
          },
        },
      },
    })

    return res.status(200).json({ success: true, weeks })
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
