import fetcher from '../lib/fetch'

const BASE_URL = '/api'
const EMPLOYEES_URL = `${BASE_URL}/employees`

export const getEmployees = (options: any) => {
  return fetcher(EMPLOYEES_URL, {
    method: 'GET',
    ...options,
  })
}
