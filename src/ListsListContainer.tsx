import { MouseEvent } from 'react';
import { Button } from 'react-bootstrap';
import { useLists } from './ListsService';

export interface IListsListContainerProps {
  updatedAt: string;
  onListClick: (event: MouseEvent) => void;
}

const ListsListContainer = ({ updatedAt, onListClick }: IListsListContainerProps) => {
  const response = useLists(updatedAt);

  if (response.loading) {
    return <div>Loading...</div>;
  }

  if (!response.lists || response.lists.length == 0) {
    return <div>No lists.</div>;
  }

  const listItems = response.lists.map((list) => (
    <Button block onClick={onListClick} id={list.id} key={list.id}>
      {list.name} ({list.listItemsCount})
    </Button>
  ));

  return <>{listItems}</>;
};

export default ListsListContainer;
