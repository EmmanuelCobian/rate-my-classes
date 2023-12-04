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
  justify-content: space-evenly;
  width: 1420px;
  margin: auto;
`;

const ReviewsContainer = styled.div`
  display: flex;
  padding: 3rem;
  flex-direction: column;
  align-items: flex-start;
  width: 1420px;
  margin: auto;
`;

export default function ClassPage() {
  const { query } = useRouter();
  const [classData, setClassData] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    if (!query) return;

    // Grabbing course info
    fetch(`http://localhost:2000/COMPSCI?code=${query.courseCode}`)
      .then((response) => response.json())
      .then((data) => setClassData(data[0]));

    // Grabbing reviews
    fetch(`http://localhost:2000/get-class-reviews?code=${query.courseCode}`)
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, [query]);

  const renderReviews = () => {};

  const renderClassInfoAndReviews = () => {
    console.log("Class data: " + JSON.stringify(classData));
    console.log("Reviews: " + JSON.stringify(reviews));
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
          <StudentReview
            profe="Nick Weaver"
            term="Spring 2022"
            grade="A+"
            attendanceNeeded="Not Mandatory"
            textbookNeeded="Not Mandatory"
            classRev="I love Nick Weaver..."
            helpfulCount="10"
            notHelpfulCount="10"
            diffRating="4.0"
            intRating="3.0"
          />
        </ReviewsContainer>
      </div>
    );
  };

  return <>{classData ? renderClassInfoAndReviews() : <div>Loading...</div>}</>;
}
