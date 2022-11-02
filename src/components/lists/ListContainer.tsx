import React, { useEffect, useState } from 'react'
import { List } from '../../features/lists/listsModel'
import ListItemInput from './ListItemInput'
import ListItem from './ListItem'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import './ListContainer.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { saveList, selectSelectedListId } from '../../features/lists/listsSlice'
import _ from 'lodash'
import { Save } from 'react-bootstrap-icons'

const ListContainer = () => {
  const selectedListId = useAppSelector(selectSelectedListId)
  const selectedList = useAppSelector((state) => state.lists.lists.find((list) => list.id === selectedListId))
  const dispatch = useAppDispatch()

  const [currentList, setCurrentList] = useState<List | undefined>()
  const [listHasChanged, setListHasChanged] = useState<boolean>(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false)

  useEffect(() => {
    // Detect if we don't yet have a list, or we're changing lists
    if (selectedListId != currentList?.id) {
      setHasUnsavedChanges(listHasChanged)
      if (!listHasChanged) {
        setCurrentList(selectedList)
      }
    }
  }, [selectedListId, currentList, listHasChanged, selectedList])

  const getCopyOfCurrentList = (): List => _.cloneDeep(currentList) as List

  const updateList = (list: List) => {
    setCurrentList(list)
    setListHasChanged(!_.isEqual(list, selectedList))
  }

  const handleAddListItem = (text: string): void => {
    // Shouldn't happen, but avoid adding null/undefined/empty text
    if (text) {
      const copyOfCurrentList = getCopyOfCurrentList()
      copyOfCurrentList?.listItems?.push({
        description: text,
        ticked: true,
      })
      updateList(copyOfCurrentList)
    }
  }

  const handleListItemDelete = (index: number) => {
    const copyOfCurrentList = getCopyOfCurrentList()
    copyOfCurrentList.listItems?.splice(index, 1)
    updateList(copyOfCurrentList)
  }

  const handleSaveList = () => {
    if (currentList) {
      setListHasChanged(false)
      dispatch(saveList(currentList))
    }
  }

  const handleUnsavedChangesNo = () => {
    setListHasChanged(false)
  }

  const handleListItemChecked = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const copyOfCurrentList = getCopyOfCurrentList()
    const listItem = copyOfCurrentList.listItems?.[index]
    if (listItem) {
      listItem.ticked = event.target.checked
      updateList(copyOfCurrentList)
    }
  }

  let index = 0
  const listItems = currentList?.listItems?.map((listItem) => (
    <ListItem
      key={index}
      index={index++}
      description={listItem.description}
      ticked={listItem.ticked}
      handleDelete={handleListItemDelete}
      handleChecked={handleListItemChecked}
    />
  ))

  return !currentList ? (
    <div>Select a list</div>
  ) : (
    <>
      <Modal show={hasUnsavedChanges}>
        <Modal.Header closeButton onHide={handleUnsavedChangesNo}>
          <Modal.Title>Unsaved changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>List "{currentList?.name}" has unsaved changes. Save now?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUnsavedChangesNo}>
            No
          </Button>
          <Button variant="primary" onClick={handleSaveList}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row>
          <Col>
            <h1>{currentList?.name}</h1>
            <p>{currentList?.description}</p>
          </Col>
          <Col md="auto" className="listcontainer-save-container container">
            <Button
              variant="outline-dark"
              disabled={!listHasChanged}
              onClick={handleSaveList}
              data-toggle="tooltip"
              data-placement="top"
              title="Save"
            >
              <Save />
            </Button>
          </Col>
        </Row>
      </Container>
      <ListItemInput handleAdd={handleAddListItem} />
      {listItems}
    </>
  )
}

export default ListContainer
