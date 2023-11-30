import Ratings from "./Ratings.js";
import styles from "@/styles/ClassInfo.module.css";
import styled from "styled-components";

const CourseName = styled.h3`
  font-weight: bold;
`;

const OverallRating = styled.p`
  font-weight: bold;
  font-size: 2rem;
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
      ></Ratings>

      <div>
        <p>Lecture Mandatory: {props.lectureAttendance}</p>
        <p>Time Conflict Allowed: {props.timeConflict}</p>
        <p>Demand: {props.demand}</p>
      </div>

      <div>
        <button>Add Review</button>
      </div>
    </div>
  );
}
