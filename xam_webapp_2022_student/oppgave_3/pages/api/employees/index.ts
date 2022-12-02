// import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from '../../../lib/db'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) {
//   if (req.method === 'GET') {
//     const employees = await prisma.employee.findMany()

//     return res.status(200).json({ success: true, employees })
//   } else {
//     return res.status(405).json({ success: false, error: 'Method not allowed' })
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next'

import * as employeeController from '../../../features/employees/employees.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      // kaller på kontrolleren som brukes til å hente alle ansatte
      await employeeController.getAllEmployees(req, res) //<---------------------Fungerer
      break
    case 'post':
      // kaller på kontrolleren som brukes til å lage ny ansatt
      await employeeController.createEmployee(req, res) //<------------- Fungerer
      break
    case 'put':
      // Kaller på kontrolleren som brukes for å oppdatere eksisterende ansatt
      await employeeController.updateEmployee(req, res) // <--------- Ikke laget TODO
    default:
      // gir 405 Method Not Allowed hvis brukeren prøver på noe annet
      // enn POST
      return res
        .status(405)
        .json({ success: false, error: 'Method not allowed' })
  }
}
