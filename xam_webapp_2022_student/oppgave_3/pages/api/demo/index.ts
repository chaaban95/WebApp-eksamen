import { employees } from '../../../data/employees'
import lunch from '../../../data/lunch.json'

export default async function handler(req, res) {
  await prisma.day.deleteMany({})
  await prisma.week.deleteMany({})
  await prisma.lunch.deleteMany({})
  await prisma.employee.deleteMany({})

  for (const employee of employees) {
    await prisma.employee.create({
      data: employee,
    })
  }

  const createLunch = await prisma.lunch.create({ data: {} })

  for (const [key, value] of Object.entries(lunch.year)) {
    const createWeek = await prisma.week.create({
      data: {
        week: Number(key),
        lunch: {
          connect: {
            id: createLunch.id,
          },
        },
      },
    })

    for (const [key2, value2] of Object.entries(value.week)) {
      if (value2) {
        await prisma.day.create({
          data: {
            name: key2,
            week: {
              connect: {
                id: createWeek.id,
              },
            },
            employee: {
              connect: {
                id: value2?.id,
              },
            },
          },
        })
      }
    }
  }

  return res.status(200).json({ success: true })
}
