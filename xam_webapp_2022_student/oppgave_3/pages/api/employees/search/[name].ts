import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const { name } = req.query

    const employees = await prisma.employee.findMany({
      where: {
        name: {
          startsWith: String(name),
        },
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

    return res.status(200).json({ success: true, employees })
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
