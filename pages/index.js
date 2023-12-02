import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import CoverNav from "@/components/Coverpage";
import ClassPage from "./classpage";
import stylings from "@/styles/ClassPage.module.css";
import Ratings from "@/components/Ratings.js";
import ClassInfoContainer from "@/components/ClassInfoContainer";
import { Button } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

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
  height: 500px;
  padding: 20px;
  margin: 20px;
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

const SearchInput = styled.input`
  padding: 15px;
  width: 80%;
  padding: 10px;
  max-width: 800px;
  border: none;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  text-align: center;
  backdrop-filter: blur(8px);
  margin: 0 auto;
  margin-top: auto;
  margin-bottom: 180px;
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

const search = styled.input``;

export default function Home() {
  return (
    <div>
      <CoverNav />
      <BackgroundContainer>
        <BackgroundImage />
        <CenterTextContainer>
          <Title className="CenterText">FIND MY CLASS</Title>
          <SearchInput
            type="text"
            className="search-input"
            placeholder="Search by name, professor, class id..."
          />
        </CenterTextContainer>
      </BackgroundContainer>
    </div>
  );
}
