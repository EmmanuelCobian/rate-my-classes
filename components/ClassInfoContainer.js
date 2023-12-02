import Ratings from "./Ratings.js";
import styles from "@/styles/ClassInfo.module.css";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const CourseName = styled.h3`
  font-weight: bold;
`;

const OverallRating = styled.p`
  font-weight: bold;
  font-size: 2rem;
`;

const AddReviewButton = styled(Button)`
  background-color: black;
`;

export default function ClassInfoContainer(props) {
  return (
    <div className={styles.container}>
      <div>
        <OverallRating>{props.overallRating}/5</OverallRating>
      </div>

      <div>
        <p>{props.courseNumber}</p>
        <CourseName>{props.courseName}</CourseName>
      </div>

      <Ratings
        difficulty={props.difficulty}
        interest={props.interest}
        averageGrade={props.averageGrade}
        units={props.units}
      ></Ratings>

      <div>
        <p>Lecture Mandatory: {props.lectureAttendance}</p>
        <p>Time Conflict Allowed: {props.timeConflict}</p>
        <p>Demand: {props.demand}</p>
      </div>

      <div>
        <a href="./createReviewPage">
          <AddReviewButton>Add Review</AddReviewButton>
        </a>
      </div>
    </div>
  );
}
