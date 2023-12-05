import ClassInfoContainer from "@/components/ClassInfoContainer";
import CoverNav from "@/components/CoverNav";
import StudentReview from "@/components/StudentReview";
import DescriptionAndDistribution from "@/components/DescriptionAndDistribution";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingModal from "@/components/LoadingModal";
import { Row, Col, Container } from "react-bootstrap";

const ReviewTitle = styled.h3`
  font-weight: bold;
`;

export default function ClassPage() {
  const router = useRouter();
  const [classData, setClassData] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [aggregatedData, setAggregatedData] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const department = router.query.class[0];
    const courseCode = router.query.class.join(" ");
    // Grabbing course info
    fetch(`http://localhost:2000/${department}?code=${courseCode}`)
      .then((response) => response.json())
      .then((data) => setClassData(data[0]));

    // Grabbing reviews
    fetch(`http://localhost:2000/get-class-reviews?code=${courseCode}`)
      .then((response) => {
        if (!response.ok && response.status == 400) {
          return [];
        } else if (!response.ok && response.status == 500) {
          throw new Error("Network response was not ok");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [router.isReady]);

  useEffect(() => {
    if (!reviews) return;

    let numLectureYes = 0;
    let numTextBookYes = 0;

    let data = {
      OverallRating: 0,
      Difficulty: 0,
      Interest: 0,
      MandatoryLecture: "",
      MandatoryTextbook: "",
      RatingDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    };

    reviews.forEach((review) => {
      data.OverallRating += review.OverallRating;
      data.Difficulty += review.Difficulty;
      data.Interest += review.Interest;
      data.RatingDistribution[review.OverallRating] += 1;

      numLectureYes =
        review.Attendance.toUpperCase() === "YES"
          ? numLectureYes + 1
          : numLectureYes - 1;
      numTextBookYes =
        review.Textbook.toUpperCase() === "YES"
          ? numTextBookYes + 1
          : numTextBookYes - 1;
    });

    data.OverallRating /= reviews.length;
    data.Difficulty /= reviews.length;
    data.Interest /= reviews.length;
    data.MandatoryLecture = numLectureYes > 0 ? "Yes" : "No";
    data.MandatoryTextbook = numTextBookYes > 0 ? "Yes" : "No";
    setAggregatedData(data);
  }, [reviews]);

  const renderLoadingModal = () => {
    return <LoadingModal text="Loading class data..." />;
  };

  const renderClassInfoAndReviews = () => {
    return (
      <>
        <CoverNav />
        <Container>
          <Row>
            <Col className="mt-3">
              <Container>
                <ClassInfoContainer
                  courseCode={classData.CourseCode}
                  title={classData.Title}
                  averageGrade={classData.AverageGrade}
                  units={classData.Units}
                  prerequisites={classData.Prerequisites}
                  overallRating={aggregatedData.OverallRating ?? "N/A"}
                  difficulty={aggregatedData.Difficulty ?? "N/A"}
                  interest={aggregatedData.Interest ?? "N/A"}
                  mandatoryLecture={aggregatedData.MandatoryLecture ?? "N/A"}
                  mandatoryTextbook={aggregatedData.MandatoryTextbook ?? "N/A"}
                ></ClassInfoContainer>
              </Container>
            </Col>
            <Col className="mt-3">
              <Container>
                <DescriptionAndDistribution
                  description={classData.Description}
                  distribution={aggregatedData.RatingDistribution ?? "N/A"}
                ></DescriptionAndDistribution>
              </Container>
            </Col>
          </Row>

          <Container className="my-5">
            <ReviewTitle>Reviews</ReviewTitle>
            {reviews.map((review, index) => {
              return (
                <StudentReview
                  key={index}
                  author={review.Author}
                  profe={review.Professor}
                  term={review.Term}
                  grade={review.Grade}
                  attendanceNeeded={review.Attendance}
                  textbookNeeded={review.Textbook}
                  classRev={review.Review}
                  helpfulCount={review.ThumbsUp}
                  notHelpfulCount={review.ThumbsDown}
                  diffRating={review.Difficulty}
                  intRating={review.Interest}
                  courseCode={classData.CourseCode}
                />
              );
            })}
          </Container>
        </Container>
      </>
    );
  };

  return <>{classData ? renderClassInfoAndReviews() : renderLoadingModal()}</>;
}
