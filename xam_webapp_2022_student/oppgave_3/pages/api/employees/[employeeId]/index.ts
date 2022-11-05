import type { NextApiRequest, NextApiResponse } from 'next'
import { employees } from '../../../../data/employees';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  switch (req.method?.toLowerCase()) {
    case 'get':
      const id = req.query.employeeId
      return res.status(200).json({ status: true, data: { resources: `employees/${id}/index`}})  
    default:
      return res
      .status(400)
      .json({
        success: false, 
        error: { 
          type: 'object', 
          status:'400', 
          message:'Method not allowed'
        },
      });
  }
}
