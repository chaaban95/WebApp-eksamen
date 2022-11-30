import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':

      const weeks = await prisma.week.findMany()

      return res.status(200).json({
        status: true,
        data: { method: req.method, resources: '/weeks/index', weeks },
      })

    default:
      return res.status(400).json({
        success: false,
        error: {
          type: 'object',
          status: '400',
          message: 'Method not allowed',
        },
      })
  }
}
