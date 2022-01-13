import React, { useState } from 'react';

import {
  Card as BCard,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Modal,
  ModalFooter,
  ModalBody,
} from 'reactstrap';
import { Text, Flex } from 'rebass';

import styled from 'styled-components';

const Card = styled(BCard)`
  height: 280px;
  margin: 5px 0px;
`;

const Balls = ({ balls, profile }) => {
  const [list, setList] = useState(balls);
  const [modal, setModal] = useState(false);
  const [currentBall, setBall] = useState(null);

  const toggle = () => setModal(!modal);

  const validateBall = (ball) => {
    setBall(ball)
    setModal(true)
  }

  const filterByMe = () => {
    return balls.filter((ball) => ball.owner === profile.id);
  };

  const filterNotMe = () => {
    return balls.filter((ball) => ball.owner !== profile.id);
  };

  const filter = (value) => {
    const cases = {
      me: () => setList(filterByMe()),
      all: () => setList(balls),
      notme: () => setList(filterNotMe()),
    };
    return cases[value]();
  };

  const updateList = (id) => {
    const newList = balls.map((ball) => {
      if(ball.id === id) return {
        ...ball,
        owner: profile.id
      }
      return ball
    })
    const newProfile = profile.balls.push(id)

    setList(newList)
    setModal(false)
  }

  return (
    <>
      <Flex my='10px;' justifyContent='space-between'>
        <Text fontSize='50px'>Esferas</Text>
        <FormGroup>
          <Label for='filter'>Filtrar</Label>
          <Input
            type='select'
            name='select'
            id='filter'
            data-testid="filter"
            onChange={({ target: { value } }) => filter(value)}
          >
            <option value='all'>Todas as esferas</option>
            <option value='me'>Minhas esferas</option>
            <option value='notme'>Não tenho</option>
          </Input>
        </FormGroup>
      </Flex>
      <Row>
        {list.length > 0 ? (
          list.map((ball, i) => (
            <Col sm='3' key={ball.id}>
              <Card>
                <CardImg top width='100%' src={ball.image} alt={ball.name} />
                <CardBody>
                  <CardTitle>{ball.name}</CardTitle>
                  {ball.owner !== profile.id ? (
                    <>
                      <Badge color='danger'>Não encontrada</Badge>
                      <Button size='sm' color='warning' onClick={() => validateBall(ball)}>
                        encontrei
                      </Button>
                    </>
                  ) : (
                    <Badge color='success'>Encontrada</Badge>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <p>Houve algum problema na busca das esferas</p>
        )}
      </Row>
      {/* Validate ball */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <FormGroup>
            <Label for='code'>Insira o código da esfera de {currentBall?.name}:</Label>
            <Input
              type='number'
              name='ballcode'
              id='code'
              placeholder='Ex: 23412'
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
        <Button color='success' onClick={() => updateList(currentBall?.id)}>
            Validar
          </Button>
          <Button color='secondary' onClick={toggle}>
            Voltar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Balls;
