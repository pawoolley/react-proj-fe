import { MouseEvent } from 'react';
import { Button } from 'react-bootstrap';
import { useLists } from './ListsService';

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
    <Button block onClick={handleOnClick} id={list.id} key={list.id}>
      {list.name} ({list.listItemsCount})
    </Button>
  ));

  return <div>{listItems}</div>;
};

export default ListsListContainer;
