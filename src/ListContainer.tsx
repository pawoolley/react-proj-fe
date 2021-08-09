import React from 'react';
import { useList } from './ListsService';
import ListItemInput from './ListItemInput';
import ListItems from './ListItems';

export interface IListContainerProps {
  listId?: string;
}

const ListContainer = ({ listId }: IListContainerProps) => {
  const { list, setList, loading, error } = useList(listId);

  if (!listId) {
    return <div>Select a list.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleAddListItem = (text: string): void => {
    // Shouldn't happen, but avoid adding null/undefined/empty text
    if (text) {
      console.log(`got text: ${text}`);
      const updatedList = Object.assign({}, list);
      updatedList?.listItems?.push({
        description: text,
        ticked: true,
      });
      setList(updatedList);
    }
  };

  return (
    <div>
      <h1>{list?.name}</h1>
      <p>{list?.description}</p>
      <ListItemInput handleAdd={handleAddListItem} />
      <ListItems list={list} />
    </div>
  );
};

export default ListContainer;
