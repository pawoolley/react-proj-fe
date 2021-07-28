import React from 'react';
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
    let key = 0;
    const listItems = response.list.listItems?.map((listItem) => (
      <Button block key={key++}>
        {listItem.description} ({listItem.ticked ? 'ticked' : 'unticked'})
      </Button>
    ));
    return (
      <div>
        <h1>{response.list.name}</h1>
        <p>{response.list.description}</p>
        <ListItemInput />
        {listItems}
      </div>
    );
  }

  // Shouldn't happen, but this is the backstop.
  return <div>List not found</div>;
};

export default ListContainer;
