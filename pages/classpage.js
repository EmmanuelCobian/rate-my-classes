import ClassInfoContainer from "@/components/ClassInfoContainer";
import CoverNav from "@/components/Coverpage";
import StudentReview from "@/components/StudentReview";
import DescriptionAndDistribution from "@/components/DescriptionAndDistribution";
import styled from "styled-components";
import styles from "@/styles/ClassPage.module.css";

const InfoContainer = styled.div`
  display: flex;
  padding: 3rem;
  justify-content: space-evenly;
  width: 1420px;
  margin: auto;
`;

const Container = styled.div`
  padding: 50px;
`;

export default function ClassPage() {
  return (
    <div>
      <CoverNav />
      <InfoContainer>
        <ClassInfoContainer
          overallRating="6.9"
          courseNumber="CS61B"
          courseName="Data Structures & Algorithms"
          difficulty="5.0"
          interest="5.0"
          averageGrade="A++"
          units="4"
          lectureAttendance="Yes"
          timeConflict="No"
          demand="High"
        ></ClassInfoContainer>
        <DescriptionAndDistribution description=" Fundamental dynamic data structures, including linear lists, queues, trees, and other linked structures; arrays strings, and hash tables. Storage management. Elementary principles of software engineering. Abstract data types. Algorithms for sorting and searching. Introduction to the Java programming language"></DescriptionAndDistribution>
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
}
