import React from 'react';
import { useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';

export interface IListContainerProps {
  /* Callback for when the Add button is clicked and the text in the input at that time. */
  handleAdd(text: string): void;
}

const textBoxId = 'ListItemInput-text';

const ListItemInput = (props: IListContainerProps) => {
  const [addDisabled, setAddDisabled] = useState(true);

  const handleOnKeyUp = (e: React.KeyboardEvent): void => {
    const target = e.target as HTMLInputElement;
    setAddDisabled(target.value.length == 0);
  };

  const handleOnClick = (e: React.MouseEvent): void => {
    const textBox = document.getElementById(textBoxId) as HTMLInputElement;
    props.handleAdd(textBox.value);
  };

  return (
    <div style={{ display: 'flex', marginTop: '0.375rem', marginBottom: '0.375rem' }}>
      <FormControl id={textBoxId} type="text" placeholder="Add a new list item" onKeyUp={handleOnKeyUp} />
      <Button disabled={addDisabled} onClick={handleOnClick}>
        Add
      </Button>
    </div>
  );
};

export default ListItemInput;
