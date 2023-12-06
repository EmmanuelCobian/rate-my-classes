import styles from "@/styles/Ratings.module.css";
import styled from "styled-components";

const Rating = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0;
`;

const RatingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding-top: 10px;
  width: 75px;
  height: 75px;
  background-color: lightgrey;
`;

export default function Ratings(props) {
  return (
    <RatingsContainer>
      <RatingWrapper>
        <Rating>{props.difficulty}</Rating>
        <p>Difficulty</p>
      </RatingWrapper>

      <RatingWrapper>
        <Rating>{props.interest}</Rating>
        <p>Interest</p>
      </RatingWrapper>

      <RatingWrapper>
        <Rating>{props.averageGrade}</Rating>
        <p>Avg Grade</p>
      </RatingWrapper>

      <RatingWrapper>
        <Rating>{props.units.split(" ")[0]}</Rating>
        <p>Units</p>
      </RatingWrapper>
    </RatingsContainer>
  );
}
