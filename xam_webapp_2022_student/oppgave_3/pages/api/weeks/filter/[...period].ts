import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const weekId: any = req.query.period

    console.log(weekId)

    const weeks = await prisma.week.findMany({
      where: {
        week: {
          gte: Number(weekId[0]),
          lte: Number(weekId[1]),
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
