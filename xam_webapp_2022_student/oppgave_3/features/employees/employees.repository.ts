import prisma from '../../lib/db'

export const getAll = async () => {
  try {
    // const employees = await prisma.employee.findMany()

    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        day: {
          select: {
            id: true,
            name: true,
            week: {
              select: {
                id: true,
                week: true,
              },
            },
          },
        },
      },
    })

    return { success: true, employees }
  } catch (error) {
    return { success: false, error: 'Failed collecting employees.' }
  }
}

// Legge til ansatt i databasen
export const create = async (data: any) => {
  try {
    const employee = await prisma.employee.create({ data })

    return { success: true, data: employee }
  } catch (error) {
    return { success: false, error: 'Failed creating employee.' }
  }
}

// TODO:Oppdatere ansatt med en gitt id fra databasen
export const update = async (id: any, name: any) => {
  try {
    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    return { success: true, data: employee }
  } catch (error) {
    return { success: false, error: 'Failed updating employee name.' }
  }
}

// Se om en ansatt med gitt ID eksisterer i databasen
export const exist = async (id: any) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    })

    return { success: true, data: employee }
  } catch (error) {
    return { success: false, error: 'Failed finding employee.' }
  }
}
