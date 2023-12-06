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

  const renderRow = (label) => {
    let currWidth = percents[label]
    console.log(currWidth)
  
    if (currWidth == '0%') {
      return (
        <Row className='pb-3'>
          <Col xs='auto'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '30px', fontWeight: 'bolder' }}>{label}</div>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row className='pb-3'>
          <Col xs='auto'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '10px', height: '30px', fontWeight: 'bolder' }}>{label}</div>
          </Col>
          <Col xs={6} style={{ width: percents[label], height: '30px', maxWidth: props.maxWidth, backgroundColor: "black" }}></Col>
        </Row>
      );
    }
  }

  return (
    <Container>
      {renderRow(5)}
      {renderRow(4)}
      {renderRow(3)}
      {renderRow(2)}
      {renderRow(1)}
    </Container>
  );
}
