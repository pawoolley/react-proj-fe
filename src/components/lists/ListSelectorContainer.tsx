import React from 'react'
import { Button } from 'react-bootstrap'
import { selectFetchState, selectListId, selectLists } from '../../features/lists/listsSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { List } from '../../features/lists/listsModel'

const ListSelectorContainer = () => {
  const dispatch = useAppDispatch()
  const lists = useAppSelector(selectLists)
  const fetchState = useAppSelector(selectFetchState)

  if (fetchState.isLoading) {
    return <div>Loading...</div>
  }

  if (fetchState.error) {
    return <div>{fetchState.error}</div>
  }

  if (!lists || lists.length == 0) {
    return <div>No lists.</div>
  }

  const onListClick = (id: string) => dispatch(selectListId(id))
  const getListItemsCount = (list: List) => list.listItems?.length

  const listItems = lists.map((list) => {
    return (
      <Button size="lg" onClick={() => onListClick(list.id)} id={list.id} key={list.id}>
        {list.name} ({getListItemsCount(list)})
      </Button>
    )
  })

  return <div className="d-grid gap-2">{listItems}</div>
}

export default ListSelectorContainer
