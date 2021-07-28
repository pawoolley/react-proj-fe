import React from 'react';
import { Button, FormControl } from 'react-bootstrap';

export interface IListContainerProps {
  listId?: string;
}

const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
  // const x = (<HTMLInputElement>event.target).value;
  const target = e.target as HTMLInputElement;
  console.log(target.value.length);
};

const ListItemInput = () => {
  return (
    <div style={{ display: 'flex', marginTop: '0.375rem', marginBottom: '0.375rem' }}>
      <FormControl type="text" placeholder="Add a new list item" onKeyPress={handleOnKeyPress} />
      <Button>\Add</Button>
    </div>
    // <Container>
    //   <Row>
    //     <Col>
    //       <Form.Control type="text" placeholder="Add a new list item" />
    //     </Col>
    //     <Col>
    //       <Button>Save</Button>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default ListItemInput;
