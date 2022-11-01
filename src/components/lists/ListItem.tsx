import './ListItem.css'

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
      <button className="listitem-delete" onClick={() => handleDelete(index)}>
        X
      </button>
    </div>
  )
}

export default ListItem
