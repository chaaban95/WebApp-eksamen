import prisma from '../../lib/db'

// Lage ansatt i databasen
export const create = async (data: any) => {
  // bruker try/catch for å håndtere feil gitt av Prisma
  try {
    // bruker prisma clienten til å lage en ansatt
    const employee = await prisma.employee.create(data)

    return { success: true, data: employee }
  } catch (error) {
    return { success: false, error: 'Failed creating employee.' }
  }
}

// Se om en ansatt eksisterer
// export const exist = async (id: any) => {
//   try {
//     const employee = await prisma.employee.findUnique({
//       where: {
//         id,
//       },
//     })

//     return { success: true, data: employee }
//   } catch (error) {
//     return { success: false, error: 'Failed finding employee.' }
//   }
// }
