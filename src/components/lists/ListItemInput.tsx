import React, { useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import './ListItemInput.css';

export interface IListContainerProps {
  /* Callback for when the Add button is clicked and the text in the input at that time. */
  handleAdd(text: string): void;
}

const textBoxId = 'ListItemInput-text';

const ListItemInput = ({ handleAdd }: IListContainerProps) => {
  const [addDisabled, setAddDisabled] = useState(true);

  const handleOnKeyUp = (e: React.KeyboardEvent): void => {
    const target = e.target as HTMLInputElement;
    setAddDisabled(target.value.length == 0);
  };

  const handleOnClick = (): void => {
    const textBox = document.getElementById(textBoxId) as HTMLInputElement;
    handleAdd(textBox.value);
    // Clear the text box and disable the add button
    textBox.value = '';
    setAddDisabled(true);
  };

  return (
    <div className="listiteminput-container container">
      <FormControl id={textBoxId} type="text" placeholder="Add a new list item" onKeyUp={handleOnKeyUp} />
      <Button disabled={addDisabled} onClick={handleOnClick}>
        Add
      </Button>
    </div>
  );
};

export default ListItemInput;
