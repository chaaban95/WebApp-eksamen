import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const { fromWeek, toWeek } = req.body

    const days = await prisma.week.findMany({
      where: {
        name: String(name),
      },
    })

    return res.status(200).json({ success: true, days })
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
