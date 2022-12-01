import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const weeks = await prisma.week.findMany()
    return res.status(200).json({ success: true, weeks })
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
