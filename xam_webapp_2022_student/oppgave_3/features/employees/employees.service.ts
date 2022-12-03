import * as employeesRepository from './employees.repository'

// Create
export const create = async (name: any) => {
  const createdEmployee = await employeesRepository.create(name)

  // feil ved lagring av ansatt via ORM
  if (!createdEmployee.success)
    return { success: false, error: createdEmployee.error }

  return { success: true, data: createdEmployee.data }
}

// Update
export const update = async (id: any) => {
  const employee = await employeesRepository.exist(id)

  // feil med hentingen av data fra databasen via ORM
  if (employee?.error) return { success: false, error: employee.error }

  // Hvis data ikke har verdi eksisterer ikke ansatt
  if (!employee.data)
    return { success: false, error: 'Employee does not exist.' }

  const updatedEmployee = await employeesRepository.update(id)

  // feil ved lagring av ansatt via ORM
  if (!updatedEmployee.success)
    return { success: false, error: updatedEmployee.error }
  return { success: true, data: updatedEmployee.data }
}
