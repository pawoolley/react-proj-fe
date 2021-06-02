import React, { MouseEvent } from 'react';
import { Button } from 'react-bootstrap';
import { useLists, ListsResponse } from './ListsService';

export interface IListsListContainerProps {
  handleOnClick: (event: MouseEvent) => void;
}

const ListsListContainer = ({ handleOnClick }: IListsListContainerProps) => {
  const response = useLists();

  if (response.loading) {
    return <div>Loading...</div>;
  }

  if (!response.lists || response.lists.length == 0) {
    return <div>No lists.</div>;
  }

  const listItems = response.lists.map((list) => (
    <Button variant="link" block onClick={handleOnClick} id={list.id} key={list.id}>
      {list.description} ({list.listItemsCount})
    </Button>
  ));

  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
};

export default ListsListContainer;
