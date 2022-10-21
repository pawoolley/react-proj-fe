import React, { useEffect, useState } from 'react';
import { List, updateList as updateListBE, useList } from './ListsService';
import ListItemInput from './ListItemInput';
import ListItem from './ListItem';
import * as _ from 'lodash';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import './ListContainer.css';

export interface IListContainerProps {
  listId?: string;
  onListSave: () => void;
}

const ListContainer = ({ listId, onListSave }: IListContainerProps) => {
  const { list, setList, loading, error } = useList(listId);
  const [currentListId, setCurrentListId] = useState<string>();
  const [isFirstUpdate, setFirstUpdate] = useState(true);
  const [listBeforeUpdate, setListBeforeUpdate] = useState<List | undefined>();
  const [listHasChanged, setListHasChanged] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // const handleChangeOfList = () => {
  //   if (listHasChanged) {
  //     setHasUnsavedChanges(true);
  //   }
  //   // Reset these states.
  //   setFirstUpdate(true);
  //   setListBeforeUpdate(undefined);
  //   setListHasChanged(false);
  // };

  // Keep tabs on the list that the component has been asked to show.
  useEffect(() => {
    // Detect if this component update is changing the list that is displayed.
    if (listId && currentListId && currentListId !== listId) {
      if (listHasChanged) {
        setHasUnsavedChanges(true);
      }
      // Reset these states.
      setFirstUpdate(true);
      setListBeforeUpdate(undefined);
      setListHasChanged(false);
    }
    setCurrentListId(listId);
  }, [currentListId, listHasChanged, listId]);

  if (!listId) {
    return <div>Select a list.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const getCopyOfCurrentList = (): List => _.cloneDeep(list) as List;

  const updateList = (updatedList: List) => {
    if (isFirstUpdate) {
      setFirstUpdate(false);
      setListBeforeUpdate(getCopyOfCurrentList());
    }
    updatedList.listItemsCount = updatedList.listItems ? updatedList.listItems?.length : 0;
    setList(updatedList);
    setListHasChanged(!_.isEqual(updatedList, listBeforeUpdate));
  };

  const handleAddListItem = (text: string): void => {
    // Shouldn't happen, but avoid adding null/undefined/empty text
    if (text) {
      const updatedList = getCopyOfCurrentList();
      updatedList?.listItems?.push({
        description: text,
        ticked: true,
      });
      updateList(updatedList);
    }
  };

  const handleDeleteListItem = (index: number) => {
    const updatedList = getCopyOfCurrentList();
    updatedList.listItems?.splice(index, 1);
    updateList(updatedList);
  };

  const handleSaveList = () => {
    if (list) {
      updateListBE(list);
      setListHasChanged(false);
      setHasUnsavedChanges(false);
      onListSave();
    }
  };

  const handleUnsavedChangesNo = () => {
    setHasUnsavedChanges(false);
  };

  let index = 0;
  const listItems = list?.listItems?.map((listItem) => (
    <ListItem
      key={index}
      index={index++}
      description={listItem.description}
      ticked={listItem.ticked}
      handleDelete={handleDeleteListItem}
    />
  ));

  return (
    <>
      <Modal show={hasUnsavedChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Unsaved changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>List "{list?.name}" has unsaved changes. Save now?</Modal.Body>
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
            <h1>{list?.name}</h1>
            <p>{list?.description}</p>
          </Col>
          <Col md="auto" className="listcontainer-save-container container">
            <Button disabled={!listHasChanged} onClick={handleSaveList}>
              Save
            </Button>
          </Col>
        </Row>
      </Container>
      <ListItemInput handleAdd={handleAddListItem} />
      {listItems}
    </>
  );
};

export default ListContainer;
