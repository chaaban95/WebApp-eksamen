import * as employeesRepository from './employees.repository'

// getAll
export const getAll = async () => {
  const gotAllEmployees = await employeesRepository.getAll()

  if (!gotAllEmployees.success)
    return { success: false, error: gotAllEmployees.error }

  return { success: true, employees: gotAllEmployees.employees }
}

// create
export const create = async (name: any) => {
  const createdEmployee = await employeesRepository.create(name)

  if (!createdEmployee.success)
    return { success: false, error: createdEmployee.error }

  return { success: true, data: createdEmployee.data }
}

// update
export const update = async (id: any, name: any) => {
  const employee = await employeesRepository.exist(id)

  if (employee?.error) return { success: false, error: employee.error }

  if (!employee.data)
    return { success: false, error: 'Employee does not exist.' }

  const updatedEmployee = await employeesRepository.update(id, name)

  if (!updatedEmployee.success)
    return { success: false, error: updatedEmployee.error }
  return { success: true, data: updatedEmployee.data }
}
