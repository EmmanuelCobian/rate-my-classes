import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import styled from "styled-components";
import { useSession } from "next-auth/react";

const ReviewIcons = styled.i`
  &:hover {
    cursor: pointer;
  }
`;

const StudentReview = ({
  author,
  diffRating,
  intRating,
  profe,
  term,
  grade,
  attendanceNeeded,
  textbookNeeded,
  classRev,
  helpfulCount,
  notHelpfulCount,
  courseCode,
  likedBy,
  dislikedBy
}) => {
  const { data: session, status } = useSession();
  const userName = status == "authenticated" ? session.user?.email : "Anonymous";
  const [liked, setLiked] = useState(helpfulCount);
  const [disliked, setDisliked] = useState(notHelpfulCount);
  const [likedIcon, setLikedIcon] = useState(likedBy.includes(userName) ? "-fill" : "");
  const [dislikedIcon, setDislikedIcon] = useState(dislikedBy.includes(userName) ? "-fill" : "");

  const handleDbUpdate = (data) => {
    const queryString = Object.entries(data)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    const apiUrl = "http://localhost:2000/update-review-likes";
    const finalUrl = `${apiUrl}?${queryString}`;
    fetch(finalUrl, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLiked = () => {
    if (likedIcon != "-fill") {
      likedBy.push(userName)
      let updatedInfo = {
        Author: author,
        CourseCode: courseCode,
        ThumbsUp: liked + 1,
        ThumbsDown: disliked,
        LikedBy: likedBy.join(","),
        DislikedBy: dislikedBy.join(",")
      };
      
      if (dislikedIcon == "-fill") {
        dislikedBy.splice(dislikedBy.indexOf(userName), 1)
        updatedInfo.ThumbsDown = Math.max(disliked - 1, 0)
        updatedInfo.DislikedBy = dislikedBy.join(',')
        setDislikedIcon("");
        setDisliked((prev) => Math.max(prev - 1, 0));      
      }
      handleDbUpdate(updatedInfo);
      setLikedIcon("-fill");
      setLiked((prev) => prev + 1);
    } else {
      likedBy.splice(likedBy.indexOf(userName), 1)
      let updatedInfo = {
        Author: author,
        CourseCode: courseCode,
        ThumbsUp: Math.max(liked - 1, 0),
        ThumbsDown: disliked,
        LikedBy: likedBy.join(","),
        DislikedBy: dislikedBy.join(",")
      };
      handleDbUpdate(updatedInfo)
      setLikedIcon("");
      setLiked((prev) => Math.max(prev - 1, 0));
    }
  };
  const handleDisliked = () => {
    if (dislikedIcon != "-fill") {
      dislikedBy.push(userName)
      let updatedInfo = {
        Author: author,
        CourseCode: courseCode,
        ThumbsUp: liked,
        ThumbsDown: disliked + 1,
        LikedBy: likedBy.join(","),
        DislikedBy: dislikedBy.join(",")
      };
      
      if (likedIcon == "-fill") {
        likedBy.splice(likedBy.indexOf(userName), 1)
        updatedInfo.ThumbsUp = Math.max(liked - 1, 0)
        updatedInfo.LikedBy = likedBy.join(",")
        setLikedIcon("");
        setLiked((prev) => Math.max(prev - 1, 0));      
      }
      handleDbUpdate(updatedInfo)
      setDislikedIcon("-fill");
      setDisliked((prev) => prev + 1);
    } else {
      dislikedBy.splice(dislikedBy.indexOf(userName), 1)
      let updatedInfo = {
        Author: author,
        CourseCode: courseCode,
        ThumbsUp: liked,
        ThumbsDown: Math.max(disliked - 1, 0),
        LikedBy: likedBy.join(","),
        DislikedBy: dislikedBy.join(",")
      };
      handleDbUpdate(updatedInfo)
      setDislikedIcon("");
      setDisliked((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <Card
      style={{
        width: "600px",
        minWidth: "570px",
        height: "260px",
        backgroundColor: "rgb(217,217,217)",
        border: "none",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      className="my-4"
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
                    <Card.Title>{diffRating}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div>
              <br></br>
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
                    <Card.Title>{intRating}</Card.Title>
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
                Professor: <strong>{profe}</strong> Term:{" "}
                <strong>{term}</strong> Grade: <strong>{grade}</strong>
              </Card.Text>
              <Card.Text className="mb-0">
                Attendance: <strong>{attendanceNeeded}</strong> Textbook:{" "}
                <strong>{textbookNeeded}</strong>
              </Card.Text>
              <Card.Text className="mt-3">{classRev}</Card.Text>
            </Container>
            <Card.Text>
              <strong>
                Helpful{" "}
                <ReviewIcons
                  onClick={handleLiked}
                  className={"bi bi-hand-thumbs-up" + likedIcon}
                />{" "}
                {liked}{" "}
                <ReviewIcons
                  onClick={handleDisliked}
                  className={"bi bi-hand-thumbs-down" + dislikedIcon}
                />{" "}
                {disliked}
              </strong>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default StudentReview;
