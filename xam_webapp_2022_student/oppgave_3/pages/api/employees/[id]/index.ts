import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const { id } = req.query

    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        day: {
          select: {
            id: true,
            name: true,
            week: {
              select: {
                id: true,
                week: true,
              },
            },
          },
        },
      },
    })

    return res.status(200).json({ success: true, employee })
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
