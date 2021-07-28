import React, { useState } from 'react';
import { useList } from './ListsService';
import { Button } from 'react-bootstrap';
import ListItemInput from './ListItemInput';

export interface IListContainerProps {
  listId?: string;
}

const ListContainer = ({ listId }: IListContainerProps) => {
  const response = useList(listId);

  if (!listId) {
    return <div>Select a list.</div>;
  }

  if (response.loading) {
    return <div>Loading...</div>;
  }

  if (response.error) {
    return <div>{response.error.message}</div>;
  }

  if (response.list) {
    const list = response.list;
    const handleAddListItem = (text: string): void => {
      // Shouldn't happen, but avoid adding null/undefined/empty text
      if (text) {
        console.log(`got text: ${text}`);
      }
    };

    let key = 0;
    const listItems = list.listItems?.map((listItem) => (
      <Button block key={key++}>
        {listItem.description} ({listItem.ticked ? 'ticked' : 'unticked'})
      </Button>
    ));
    return (
      <div>
        <h1>{list.name}</h1>
        <p>{list.description}</p>
        <ListItemInput handleAdd={handleAddListItem} />
        {listItems}
      </div>
    );
  }

  // Shouldn't happen, but this is the backstop.
  return <div>List not found</div>;
};

export default ListContainer;
