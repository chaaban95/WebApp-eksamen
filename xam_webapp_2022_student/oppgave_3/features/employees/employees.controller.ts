import * as employeesService from './employees.service'

// For å vise alle ansatte
export const getAllEmployees = async (req: any, res: any) => {
  {
    const gotAllEmployees = await employeesService.getAll()

    return res
      .status(200)
      .json({ success: true, employees: gotAllEmployees.employees })
  }
}

// Legge til en ansatt
export const createEmployee = async (req: any, res: any) => {
  const { name } = req.body

  if (!name)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field: name' })

  const createdEmployee = await employeesService.create({
    name,
  })

  if (!createdEmployee?.success) {
    return res.status(500).json({
      success: false,
      error: createdEmployee.error,
    })
  }

  return res.status(201).json({
    success: true,
    data: createdEmployee.data,
  })
}

// For å oppdatere navnet til en ansatt
export const updateEmployee = async (req: any, res: any) => {
  const { id } = req.query
  const { name } = req.body

  if (!id)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required URL paramater: id' })

  if (!name)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field: name' })

  const updatedEmployee = await employeesService.update(id, name)

  if (!updatedEmployee?.success) {
    return res.status(500).json({
      success: false,
      error: updatedEmployee.error,
    })
  }

  return res.status(200).json({
    success: true,
    data: updatedEmployee.data,
  })
}
