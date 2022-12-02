import * as employeesRepo from './employees.repository'

export const create = async (name: any) => {
  // const employee = await employeesRepo.exist(name)

  // feil med hentingen av data fra databasen via ORM
  // if (employee?.error) return { success: false, error: employee.error }

  // Ansatt finnes hvis data har verdi
  // if (employee.data) return { success: false, error: 'Employee already exist.' }

  const createdEmployee = await employeesRepo.create(name)

  // feil ved lagring av bruker via ORM
  if (!createdEmployee.success)
    return { success: false, error: createdEmployee.error }

  return { success: true, data: createdEmployee.data }
}
