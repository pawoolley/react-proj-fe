import React, { MouseEvent, useState } from 'react';
import './App.css';
import ListsListContainer from './ListsListContainer';
import ListContainer from './ListContainer';
import { Col, Container, Row } from 'react-bootstrap';

const App = () => {
  const getNow = () => new Date().toISOString();

  const [selectedListId, setSelectedListId] = useState<string>();
  const [updatedAt, setUpdatedAt] = useState<string>(getNow());

  const handleOnClick = (event: MouseEvent) => {
    setSelectedListId(event.currentTarget.id);
  };

  const handleOnSave = () => {
    setUpdatedAt(getNow());
  };

  return (
    <Container fluid className="app-container">
      <Row>
        <Col className="lists-list-container" xs={4}>
          <ListsListContainer updatedAt={updatedAt} handleOnClick={handleOnClick} />
        </Col>
        <Col className="list-container" xs={8}>
          <ListContainer listId={selectedListId} handleOnSave={handleOnSave} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
