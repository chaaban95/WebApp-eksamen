// import type { NextApiRequest, NextApiResponse } from 'next'
// import * as employeesController from '../../../../features/employees/employees.controller'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) {
//   if (req.method === 'PUT') {

//     const {id} = req.query

//     const employee = await employeesController.updateEmployee(req, res)

//     return res.status(200).json({ success: true, employee })
//   } else {
//     return res.status(405).json({ success: false, error: 'Method not allowed' })
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'PUT') {
    const { id } = req.query
    const { name } = req.body

    const employee = await prisma.employee.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    })

    return res.status(201).json({ success: true, employee })
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
