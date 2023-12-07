import styled from "styled-components";
import CoverNav from "@/components/CoverNav";
import SearchBar from "@/components/SearchBar";

// #region Styling
const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("/classroom.jpg") center/cover no-repeat;
  filter: blur(6px);
  z-index: -1;
`;

const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const CenterTextContainer = styled.div`
  width: 2000px;
  height: 200px;
  padding: 20px;
  margin: 20px;
  margin-bottom: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  z-index: 2;

  @media (max-width: 1200px) {
    width: 66.66%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-family: "Arial", sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 10px;
  color: black;
  font-size: 48px;
  text-align: center;
`;
// #endreigon

export default function Home() {
  return (
    <div>
      <CoverNav />
      <BackgroundContainer>
        <BackgroundImage />
        <CenterTextContainer>
          <Title className="CenterText">FIND MY CLASS</Title>
          <SearchBar />
        </CenterTextContainer>
      </BackgroundContainer>
    </div>
  );
}
