import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styles from "@/styles/StudentReview.module.css";
import { Condiment } from "next/font/google";

const StudentReview = (props) => {
  return (
    <Card style={{ width: "40rem", backgroundColor: "rgb(217,217,217)" }}>
      <Container>
        <Row>
          <Col sm md="3" className="text-center">
            <Card.Body className="pb-0 mt-4">
              <Card.Subtitle className="mb-1"><strong>DIFFICULTY</strong></Card.Subtitle>
              <div className="d-flex justify-content-center align-items-center">
                <Card bg="dark" text="white" style={{ width: "4rem", textAlign: "center" }}>
                    <Card.Body>
                      <Card.Title>{props.diffRating}</Card.Title>
                    </Card.Body>
                </Card>
              </div>
            </Card.Body>
            <Card.Body className="mb-4">
              <Card.Subtitle className="mb-1"><strong>INTEREST</strong></Card.Subtitle>
              <div className="d-flex justify-content-center align-items-center">
                <Card bg="dark" text="white" style={{ width: "4rem", textAlign: "center" }}>
                  <Card.Body>
                    <Card.Title>{props.intRating}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Card.Body>
          </Col>
          <Col sm md="9" style={{padding: "0"}}>
            <Card.Body style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop:"28px", paddingBottom:"28px", paddingLeft:"0"}}>
              <Container style={{padding: "0"}}>
                <Card.Text className="mb-0">
                  Professor: <strong>{props.profe}</strong> Term: <strong>{props.term}</strong>
                </Card.Text>
                <Card.Text className="mb-0">
                  Attendance: <strong>{props.attendanceNeeded}</strong> Textbook: <strong>{props.textbookNeeded}</strong>
                </Card.Text>
                <Card.Text className="mt-3">{props.classRev}</Card.Text>
              </Container>
              <Card.Text>
                <strong>Helpful 👍 {props.helpfulCount} 👎 {props.notHelpfulCount}</strong>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default StudentReview;
