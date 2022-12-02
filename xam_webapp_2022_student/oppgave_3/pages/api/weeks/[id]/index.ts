import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query

    const week = await prisma.week.findMany({
      where: {
        week: Number(id),
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

    return res.status(200).json({ success: true, week })
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
