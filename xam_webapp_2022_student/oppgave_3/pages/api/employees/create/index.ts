import type { NextApiRequest, NextApiResponse } from 'next'
import * as employeesController from '../../../../features/employees/employees.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    const employee = await employeesController.createEmployee(req, res)
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
}
