export type ListItem = {
  description: string
  ticked: boolean
}

export type List = {
  id: string
  name: string
  description: string
  listItems?: ListItem[]
  createdAt: string
  updatedAt?: string
}
