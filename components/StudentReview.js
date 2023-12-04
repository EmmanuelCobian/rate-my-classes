import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StudentReview = (props) => {
  return (
    <Card
      style={{
        width: "600px",
        minWidth: "570px",
        height: "260px",
        backgroundColor: "rgb(217,217,217)",
      }}
    >
      <Row className="h-100 w-100">
        <Col
          xs={3}
          className="p-0 text-center position-relative d-flex flex-column"
        >
          <Card.Body className="p-0 position-absolute start-50 top-50 translate-middle">
            <div className="pb-2">
              <Card.Subtitle className="mb-1">
                <strong>DIFFICULTY</strong>
              </Card.Subtitle>
              <div className="d-flex justify-content-center align-items-center">
                <Card
                  bg="dark"
                  text="white"
                  style={{ width: "4rem", textAlign: "center" }}
                >
                  <Card.Body>
                    <Card.Title>{props.diffRating}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div>
              <Card.Subtitle className="mb-1">
                <strong>INTEREST</strong>
              </Card.Subtitle>
              <div className="d-flex justify-content-center align-items-center">
                <Card
                  bg="dark"
                  text="white"
                  style={{ width: "4rem", textAlign: "center" }}
                >
                  <Card.Body>
                    <Card.Title>{props.intRating}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Card.Body>
        </Col>
        <Col xs={9} style={{ padding: "0" }}>
          <Card.Body
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingTop: "16px",
              paddingBottom: "8px",
              paddingLeft: "0",
            }}
          >
            <Container style={{ padding: "0" }}>
              <Card.Text className="mb-0">
                Professor: <strong>{props.profe}</strong> Term:{" "}
                <strong>{props.term}</strong> Grade:{" "}
                <strong>{props.grade}</strong>
              </Card.Text>
              <Card.Text className="mb-0">
                Attendance: <strong>{props.attendanceNeeded}</strong> Textbook:{" "}
                <strong>{props.textbookNeeded}</strong>
              </Card.Text>
              <Card.Text className="mt-3">{props.classRev}</Card.Text>
            </Container>
            <Card.Text>
              <strong>
                Helpful 👍 {props.helpfulCount} 👎 {props.notHelpfulCount}
              </strong>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default StudentReview;
