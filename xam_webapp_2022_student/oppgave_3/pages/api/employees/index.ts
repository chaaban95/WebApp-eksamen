import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const employees = await prisma.employee.findMany()

    return res.status(200).json({ success: true, employees })
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
