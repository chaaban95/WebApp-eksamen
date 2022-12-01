import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    // Working example DO NOT REMOVE
    // const weeks = await prisma.week.findMany({
    //   select: {
    //     week: true,
    //     day: {
    //       select: {
    //         name: true,
    //         employee: {
    //           select: {
    //             id: true,
    //             name: true,
    //           }
    //         }
    //       },
    //     },
    //   },
    // })

    const weeks = await prisma.week.findMany({
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
