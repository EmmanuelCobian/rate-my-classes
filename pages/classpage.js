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

export default function ClassPage() {
  const { query } = useRouter();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:2000/COMPSCI?code=${query.courseCode}`)
      .then((response) => response.json())
      .then((data) => setClassData(data));
  }, [query]);

  const renderClassInfoAndReviews = () => {
    console.log("Class data: " + JSON.stringify(classData));
    return (
      <div>
        <CoverNav />
        <InfoContainer>
          <ClassInfoContainer
            courseCode={classData.courseCode}
            title={classData.title}
            averageGrade={classData.averageGrade}
            units={classData.units}
            prerequisites={classData.prerequisites}
            overallRating={classData.overallRating ?? "N/A"}
            difficulty={classData.diffculty ?? "N/A"}
            interest={classData.interest ?? "N/A"}
            lectureAttendance={classData.lectureAttendance ?? "N/A"}
            timeConflict={classData.timeConflict ?? "N/A"}
            demand={classData.demand ?? "N/A"}
          ></ClassInfoContainer>
          <DescriptionAndDistribution
            description={classData.description}
          ></DescriptionAndDistribution>
        </InfoContainer>

        <StudentReview
          profe="Nick Weaver"
          term="Spring 2022"
          attendanceNeeded="Not Mandatory"
          textbookNeeded="Not Mandatory"
          classRev="I love Nick Weaver..."
          helpfulCount="10"
          notHelpfulCount="10"
          diffRating="4.0"
          intRating="3.0"
        ></StudentReview>
      </div>
    );
  };

  return <>{classData ? renderClassInfoAndReviews() : <div>Loading...</div>}</>;
}
