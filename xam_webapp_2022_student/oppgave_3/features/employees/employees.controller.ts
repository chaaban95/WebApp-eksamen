import * as employeesService from './employees.service'

// For å vise alle ansatte
export const getAllEmployees = async (req: any, res: any) => {
  {
    const employees = await prisma.employee.findMany()
    return res.status(200).json({ success: true, employees })
  }
}

// Legge til en ansatte
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

// For å oppdatere navnet til en ansatt
export const updateEmployee = async (req: any, res: any) => {
  const { id, name } = req.body
  // const { name } = req.body

  // 400 Bad Request hvis ansatt mangler id
  if (!id)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field: id' })

  // 400 Bad Request hvis ansatt mangler navn
  if (!name)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field: name' })

  const updatedEmployee = await employeesService.update(id, name)

  // 500 Internal Server Error hvis noe går galt
  if (!updatedEmployee?.success) {
    return res.status(500).json({
      success: false,
      error: updatedEmployee.error,
    })
  }

  // 200 OK om alt går bra
  return res.status(200).json({
    success: true,
    data: updatedEmployee.data,
  })
}
