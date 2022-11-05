import type { NextApiRequest, NextApiResponse } from 'next'

import { employees } from '../../../data/employees';


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
  
    switch (req.method?.toLowerCase()) {
  
      case 'post':
        return res.status(200).json({ status: true, data: {method: req.method, resources: '/employees/index', employees}})

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