import ClassInfoContainer from "@/components/ClassInfoContainer";
import CoverNav from "@/components/CoverNav";
import StudentReview from "@/components/StudentReview";
import DescriptionAndDistribution from "@/components/DescriptionAndDistribution";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const InfoContainer = styled.div`
  display: flex;
  padding: 3rem;
  justify-content: space-between;
  width: 1300px;
  margin: auto;
`;

const ReviewTitle = styled.h3`
  font-weight: bold;
`;

const ReviewsContainer = styled.div`
  display: flex;
  padding: 3rem;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
  width: 1300px;
  margin: auto;
`;

export default function ClassPage() {
  const { query } = useRouter();
  const [classData, setClassData] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!query) return;

    const department = query.class[0]
    const courseCode = query.class.join(' ')
    // Grabbing course info
    fetch(`http://localhost:2000/${department}?code=${courseCode}`)
      .then((response) => response.json())
      .then((data) => setClassData(data[0]));

    // Grabbing reviews
    fetch(`http://localhost:2000/get-class-reviews?code=${courseCode}`)
      .then((response) => {
        if (!response.ok && response.status == 400) {
          return []
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
  }, [query]);

  const renderClassInfoAndReviews = () => {
    return (
      <div>
        <CoverNav />
        <InfoContainer>
          <ClassInfoContainer
            courseCode={classData.CourseCode}
            title={classData.Title}
            averageGrade={classData.AverageGrade}
            units={classData.Units}
            prerequisites={classData.Prerequisites}
            overallRating={classData.OverallRating ?? "N/A"}
            difficulty={classData.Diffculty ?? "N/A"}
            interest={classData.Interest ?? "N/A"}
            mandatoryLecture={classData.mandatoryLecture ?? "N/A"}
            mandatoryTextbook={classData.mandatoryTextbook ?? "N/A"}
            demand={classData.Demand ?? "N/A"}
          ></ClassInfoContainer>
          <DescriptionAndDistribution
            description={classData.Description}
          ></DescriptionAndDistribution>
        </InfoContainer>

        <ReviewsContainer>
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
        </ReviewsContainer>
      </div>
    );
  };

  return <>{classData ? renderClassInfoAndReviews() : <div>Loading...</div>}</>;
}
