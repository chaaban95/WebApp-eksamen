import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const { id } = req.query

      // Does not work not sure why??
      // const week = await prisma.week.findUnique({
      //   where: {
      //     week: id,
      //   },
      // })

<<<<<<< HEAD
<<<<<<< HEAD
      // Using raw raw queries instead
      const week = await prisma.$queryRaw`SELECT * FROM week WHERE week = ${id}`
=======
      // Todo: get the right data
      // Using raw raw queries instead
      const days = await prisma.$queryRaw`SELECT * FROM day WHERE weekId = ${id}`
>>>>>>> 74614da67d42c63cf0501adef09db94b1bf27ab9
=======
      // Todo: get the right data
      // Using raw raw queries instead
      const days = await prisma.$queryRaw`SELECT * FROM day WHERE weekId = ${id}`
>>>>>>> 74614da67d42c63cf0501adef09db94b1bf27ab9

      return res.status(200).json({
        status: true,
        data: {
          method: req.method,
<<<<<<< HEAD
<<<<<<< HEAD
          resources: 'api/weeks/${id}',
          week,
=======
          resources: 'api/weeks/',
          data: days,
>>>>>>> 74614da67d42c63cf0501adef09db94b1bf27ab9
=======
          resources: 'api/weeks/',
          data: days,
>>>>>>> 74614da67d42c63cf0501adef09db94b1bf27ab9
        },
      })

    default:
      return res.status(400).json({
        success: false,
        error: {
          type: 'Object',
          status: '400',
          message: 'Method not allowed',
        },
      })
  }
}
