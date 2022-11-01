import type { NextApiRequest, NextApiResponse } from 'next'

const employees = [
    {
      id: 1,
      name: 'Trude',
      rules: 'days:123',
    },
    {
      id: 2,
      name: 'Lars',
      rules: '*',
    },
    {
      id: 3,
      name: 'Finn',
      rules: '*',
    },
    {
      id: 4,
      name: 'Kåre',
      rules: 'days:*|week:odd',
    },
    {
      id: 5,
      name: 'Olav',
      rules: '*',
    },
    {
      id: 6,
      name: 'Sebastian',
      rules: '*',
    },
    {
      id: 7,
      name: 'Trine',
      rules: 'days:*|week:even',
    },
    {
      id: 8,
      name: 'Simen',
      rules: 'days:24',
    },
    {
      id: 9,
      name: 'Ali',
      rules: 'days:1',
    },
    {
      id: 10,
      name: 'Josefine',
      rules: 'days:*|week:3',
    },
    {
      id: 11,
      name: 'Nora',
      rules: 'days:*|week:even',
    },
    {
      id: 12,
      name: 'Oline',
      rules: 'days:*|week:even',
    },
    {
      id: 13,
      name: 'Susanne',
      rules: 'days:*|week:odd',
    },
    {
      id: 14,
      name: 'Sharek',
      rules: 'days:*',
    },
    {
      id: 15,
      name: 'Carlos',
      rules: 'days:*|week:odd',
    },
  ]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return res.status(200).json({ success: true, data: [employees] })
}
