import type { NextApiRequest, NextApiResponse } from 'next'
import * as employeesController from '../../../../features/employees/employees.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'PUT') {
    const employee = await employeesController.updateEmployee(req, res)

    return res.status(200).json({ success: true, employee })
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
