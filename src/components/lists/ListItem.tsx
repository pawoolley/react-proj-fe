import './ListItem.css'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { Trash } from 'react-bootstrap-icons'
import React from 'react'

export interface IListItemProps {
  index: number
  description: string
  ticked: boolean
  handleDelete: (index: number) => void
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
}

const ListItem = ({ index, description, ticked, handleDelete, handleChecked }: IListItemProps) => {
  return (
    <div className="listitem-container container">
      <Form.Check type="checkbox" checked={ticked} onChange={(event) => handleChecked(event, index)} />
      <div className={`listitem-text ${ticked ? 'ticked' : ''}`}>{description}</div>
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
