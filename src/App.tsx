import React, { MouseEvent, useState } from 'react';
import './App.css';
import ListsListContainer from './ListsListContainer';
import ListContainer from './ListContainer';
import { Col, Container, Row } from 'react-bootstrap';

const App = () => {
  const getNow = () => new Date().toISOString();

  const [selectedListId, setSelectedListId] = useState<string>();
  const [updatedAt, setUpdatedAt] = useState<string>(getNow());

  const handleOnListClick = (event: MouseEvent) => {
    setSelectedListId(event.currentTarget.id);
  };

  const handleOnListSave = () => {
    setUpdatedAt(getNow());
  };

  return (
    <Container fluid className="app-container">
      <Row>
        <Col className="lists-list-container" xs={4}>
          <ListsListContainer updatedAt={updatedAt} onListClick={handleOnListClick} />
        </Col>
        <Col className="list-container" xs={8}>
          <ListContainer listId={selectedListId} onListSave={handleOnListSave} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
