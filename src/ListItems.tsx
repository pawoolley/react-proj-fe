import { List } from './ListsService';
import { Button } from 'react-bootstrap';

export interface IListItemsProps {
  list?: List;
}

const ListItems = ({ list }: IListItemsProps) => {
  let key = 0;
  const listItems = list?.listItems?.map((listItem) => (
    <Button block key={key++}>
      {listItem.description} ({listItem.ticked ? 'ticked' : 'unticked'})
    </Button>
  ));

  return <>{listItems}</>;
};

export default ListItems;
