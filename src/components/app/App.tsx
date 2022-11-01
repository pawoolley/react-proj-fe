import React, { MouseEvent, useEffect, useState } from 'react';
import './App.css';
import ListSelectorContainer from '../lists/ListSelectorContainer';
import ListContainer from '../lists/ListContainer';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { getLists } from '../../features/lists/listsSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLists());
  }, []);

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
    <Container fluid className='app-container'>
      <Row>
        <Col className='lists-list-container' xs={4}>
          <ListSelectorContainer />
        </Col>
        <Col className='list-container' xs={8}>
          <ListContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
