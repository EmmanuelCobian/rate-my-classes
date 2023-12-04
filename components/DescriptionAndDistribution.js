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
  height: 260px;
  background: lightgray;
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
        <Distribution rating="5"></Distribution>
        <Distribution rating="4"></Distribution>
        <Distribution rating="3"></Distribution>
        <Distribution rating="2"></Distribution>
        <Distribution rating="1"></Distribution>
      </DistributionContainer>
    </div>
  );
}
