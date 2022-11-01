import { List } from './listsModel'

const BASE_URL = 'http://localhost:8080'

export const getLists = async (): Promise<List[]> =>
  fetch(`${BASE_URL}/lists`)
    .then((response) => {
      return response.json()
    })
    .catch((reason) => reason)

export const saveList = async (list: List) =>
  fetch(`${BASE_URL}/lists/${list.id}`, {
    method: 'PUT',
    body: JSON.stringify(list),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.error(error)
  })
