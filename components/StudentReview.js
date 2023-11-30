import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "@/styles/StudentReview.module.css";

const StudentReview = (props) => {
  return (
    <Card style={{ width: "40rem", backgroundColor: "rgb(217,217,217)" }}>
      <Container>
        <Row>
          <Col md="3">
            <p>DIFFICULTY</p>
            <Card
              bg="dark"
              text="white"
              style={{ width: "4rem", textAlign: "center" }}
            >
              <Card.Body>
                <Card.Title>{props.diffRating}</Card.Title>
              </Card.Body>
            </Card>
            <p>INTEREST</p>
            <Card
              bg="dark"
              text="white"
              style={{ width: "4rem", textAlign: "center" }}
            >
              <Card.Body>
                <Card.Title>{props.intRating}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md="9">
            <Card.Body>
              <Card.Subtitle>
                Professor: {props.profe} Term: {props.term}
              </Card.Subtitle>
              <Card.Subtitle>
                Attendance: {props.attendanceNeeded} Textbook:{" "}
                {props.textbookNeeded}
              </Card.Subtitle>
              <Card.Text>{props.classRev}</Card.Text>
              <Card.Text>
                Helpful 👍 {props.helpfulCount} 👎 {props.notHelpfulCount}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default StudentReview;
