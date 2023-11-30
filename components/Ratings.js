import styles from "@/styles/Ratings.module.css";
import styled from "styled-components";

const Rating = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
`;

export default function Ratings(props) {
  return (
    <div className={styles.container}>
      <div className={styles.ratingContainer}>
        <Rating>{props.difficulty}</Rating>
        <p>Difficulty</p>
      </div>

      <div className={styles.ratingContainer}>
        <Rating>{props.interest}</Rating>
        <p>Interest</p>
      </div>

      <div className={styles.ratingContainer}>
        <Rating>{props.averageGrade}</Rating>
        <p>Average Grade</p>
      </div>

      <div className={styles.ratingContainer}>
        <Rating>{props.units}</Rating>
        <p>Units</p>
      </div>
    </div>
  );
}
