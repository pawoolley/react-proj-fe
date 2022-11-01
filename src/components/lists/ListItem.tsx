import './ListItem.css'
import { Button } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'

export interface IListItemProps {
  index: number
  description: string
  ticked: boolean
  handleDelete: (index: number) => void
}

const ListItem = ({ index, description, ticked, handleDelete }: IListItemProps) => {
  return (
    <div className="listitem-container container">
      <div className="listitem-text">
        {description} ({ticked ? 'ticked' : 'unticked'})
      </div>
      <Button
        variant="outline-dark"
        onClick={() => handleDelete(index)}
        className="listitem-delete"
        data-toggle="tooltip"
        data-placement="top"
        title="Delete"
      >
        <Trash />
      </Button>
    </div>
  )
}

export default ListItem
