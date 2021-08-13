import React, { useEffect, useState } from 'react';
import { List, updateList as updateListBE, useList } from './ListsService';
import ListItemInput from './ListItemInput';
import ListItem from './ListItem';
import * as _ from 'lodash';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './ListContainer.css';

export interface IListContainerProps {
  listId?: string;
  handleOnSave: () => void;
}

const ListContainer = ({ listId, handleOnSave }: IListContainerProps) => {
  const { list, setList, loading, error } = useList(listId);
  const [currentListId, setCurrentListId] = useState<string>();
  const [isFirstUpdate, setFirstUpdate] = useState(true);
  const [listBeforeUpdate, setListBeforeUpdate] = useState<List | undefined>();
  const [listHasChanged, setListHashChanged] = useState<boolean>(false);

  const handleChangeOfList = () => {
    if (listHasChanged) {
      console.warn(`Unsaved changes!!!`);
    }
    // Reset these states.
    setFirstUpdate(true);
    setListBeforeUpdate(undefined);
    setListHashChanged(false);
  };

  // Keep tabs on the list that the component has been asked to show.
  useEffect(() => {
    // Detect if this component update is changing the list that is displayed.
    if (listId && currentListId && currentListId !== listId) {
      handleChangeOfList();
    }
    setCurrentListId(listId);
  }, [listId]);

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
    const listHasChanged = !_.isEqual(updatedList, listBeforeUpdate);
    setListHashChanged(listHasChanged);
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
      setListHashChanged(false);
      handleOnSave();
    }
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
