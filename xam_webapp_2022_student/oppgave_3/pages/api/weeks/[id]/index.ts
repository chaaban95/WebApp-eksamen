import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const { id } = req.query

<<<<<<< HEAD
<<<<<<< HEAD
      // Does not work not sure why??
      // const week = await prisma.week.findMany({
=======
      // This works dont touch..
      // const days = await prisma.week.findMany({
>>>>>>> 5cded7ba462b900956cbfc7295ffb03a4c078b15
=======
      // This works dont touch..
      // const days = await prisma.week.findMany({
>>>>>>> 5cded7ba462b900956cbfc7295ffb03a4c078b15
      //   where: {
      //     week: Number(id),
      //   },
      //   include: {
      //     day: true,
      //   },
      // })

<<<<<<< HEAD
<<<<<<< HEAD
      // Todo: get the right data
      // Using raw raw queries instead
      // const days =
      //  await prisma.$queryRaw`SELECT name, employeeId as employee FROM day WHERE weekId = ${id}`

      const days = await prisma.week.findMany({
        where: {
          week: Number(id),
        },
        include: {
          day: true,
=======
=======
>>>>>>> 5cded7ba462b900956cbfc7295ffb03a4c078b15
      const days = await prisma.day.findMany({
        where: {
          weekId: 'clb5g5o8r0002ty2o93k1i3uj',
        },
        include: {
          employee: true,
          week: true,
<<<<<<< HEAD
>>>>>>> 5cded7ba462b900956cbfc7295ffb03a4c078b15
=======
>>>>>>> 5cded7ba462b900956cbfc7295ffb03a4c078b15
        },
      })

      return res.status(200).json({
        status: true,
        data: {
          method: req.method,
          resources: 'api/weeks/[id]',
          data: days,
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
