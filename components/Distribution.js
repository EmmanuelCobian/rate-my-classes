import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function countsToPercents(counts) {
  let percents = {};
  let total = 0;
  for (let number in counts) {
    total += counts[number];
  }
  for (let number in counts) {
    percents[number] = (counts[number] / total * 100) + '%';
  }

  return percents;
}

export default function Distribution(props) {
  const percents = countsToPercents(props.ratingCounts);

  return (
    <Container>
      <Row className='pb-3'>
        <Col xs='auto'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '30px', fontWeight: 'bolder' }}>5</div>
        </Col>
        <Col xs={6} style={{ width: percents[5], backgroundColor: "black" }}></Col>
      </Row>

      <Row className='pb-3'>
        <Col xs='auto'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '30px', fontWeight: 'bolder' }}>4</div>
        </Col>
        <Col xs={6} style={{ width: percents[4], backgroundColor: "black" }}></Col>
      </Row>

      <Row className='pb-3'>
        <Col xs='auto'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '30px', fontWeight: 'bolder' }}>3</div>
        </Col>
        <Col xs={6} style={{ width: percents[3], backgroundColor: "black" }}></Col>
      </Row>

      <Row className='pb-3'>
        <Col xs='auto'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '30px', fontWeight: 'bolder' }}>2</div>
        </Col>
        <Col xs={6} style={{ width: percents[2], backgroundColor: "black" }}></Col>
      </Row>

      <Row>
        <Col xs='auto'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '30px', fontWeight: 'bolder' }}>1</div>
        </Col>
        <Col xs={6} style={{ width: percents[1], backgroundColor: "black" }}></Col>
      </Row>

      
    </Container>
  );
}
