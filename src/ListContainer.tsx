import React from 'react';
import { useList } from './ListsService';

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
    return <div>{JSON.stringify(response.list)}</div>;
  }

  // Shouldn't happen, but this is the backstop.
  return <div>List not found</div>;
};

export default ListContainer;
