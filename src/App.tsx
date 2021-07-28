import React, { MouseEvent, useState } from 'react';
import './App.css';
import ListsListContainer from './ListsListContainer';
import ListContainer from './ListContainer';
import { Col, Container, Row } from 'react-bootstrap';

const App = () => {
  const [selectedListId, setSelectedListId] = useState<string>();

  const handleOnClick = (event: MouseEvent) => {
    setSelectedListId(event.currentTarget.id);
  };

  return (
    <Container fluid className="app-container">
      <Row>
        <Col className="lists-list-container" xs={4}>
          <ListsListContainer handleOnClick={handleOnClick} />
        </Col>
        <Col className="list-container" xs={8}>
          <ListContainer listId={selectedListId} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
