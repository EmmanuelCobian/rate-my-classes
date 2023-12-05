import styled from "styled-components";
import Distribution from "./Distribution";

const Title = styled.p`
  font-weight: bold;
`;

const Description = styled.p`
  width: 50ch;
`;

const DistributionContainer = styled.div`
  padding: 1rem;
  width: 50ch;
  height: auto;
  background: lightgray;
  box-shadow: "0px 4px 4px rgba(0, 0, 0, 0.25)";
  border-radius: 10px;
`;

export default function DescriptionAndDistribution(props) {
  return (
    <div>
      <div>
        <Title>Course Description:</Title>
        <Description>{props.description}</Description>
      </div>
      <DistributionContainer>
        <Title>Overall Rating Distribution</Title>
        <Distribution ratingCounts={props.ratingCounts} maxWidth={'40ch'}></Distribution>
      </DistributionContainer>
    </div>
  );
}
