import Ratings from "./Ratings.js";
import styles from "@/styles/ClassInfo.module.css";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Link from "next/link";

const CourseName = styled.h3`
  font-weight: bold;
`;

const OverallRating = styled.p`
  font-weight: bold;
  font-size: 2rem;
`;

const CourseInfo = styled.div`
  max-width: 600px;
`;

export default function ClassInfoContainer(props) {
  return (
    <div className={styles.container}>
      <div>
        <OverallRating>{props.overallRating}/5</OverallRating>
      </div>

      <div>
        <p>{props.courseCode}</p>
        <CourseName>{props.title}</CourseName>
      </div>

      <Ratings
        difficulty={props.difficulty}
        interest={props.interest}
        averageGrade={props.averageGrade}
        units={props.units}
      ></Ratings>

      <CourseInfo>
        <p>
          <span style={{ fontWeight: "bold" }}>{"Prerequisites: "}</span>
          {props.prerequisites}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>{"Lecture Mandatory: "}</span>
          {props.mandatoryLecture}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>{"Textbook Mandatory: "}</span>
          {props.mandatoryTextbook}
        </p>
      </CourseInfo>

      <Link
        href={`/CreateReview?courseCode=${props.courseCode}&title=${props.title}`}
      >
        <Button className="btn btn-dark btn-lg">Add Review</Button>
      </Link>
    </div>
  );
}
