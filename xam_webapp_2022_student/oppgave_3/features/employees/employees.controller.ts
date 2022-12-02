import * as employeesService from './employees.service'

export const createEmployee = async (req: any, res: any) => {
  const { name } = req.body

  // 400 Bad Request hvis ansatt navn mangler
  if (!name)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field: name' })

  const createdEmployee = await employeesService.create({
    name,
  })

  // 500 Internal Server Error hvis noe går galt
  if (!createdEmployee?.success) {
    return res.status(500).json({
      success: false,
      error: createdEmployee.error,
    })
  }

  // 201 Created om alt går bra
  return res.status(201).json({
    success: true,
    data: createdEmployee.data,
  })
}

// For å vise alle ansatte
export const getAllEmployees = async (req: any, res: any) => {
  {
    const employees = await prisma.employee.findMany()
    return res.status(200).json({ success: true, employees })
  }
}

// For å oppdate en ansatt IKKE FERDIG
export const updateEmployee = async (req: any, res: any) => {
  throw new Error('Function not implemented.')
}
