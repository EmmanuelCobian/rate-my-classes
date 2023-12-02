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

const CenterTextContainer = styled.div`
  width: 600px;
  height: 1000px;
  padding: 20px;
  border-radius: 10px;
  background-color: black;
  border: 1px solid black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  display: flex;
  justify-content: center;
`;

const CenterTextContainerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const search = styled.input``;

export default function Home() {
  return (
    <div>
      <CoverNav />
      <Image
        className="coverPhoto"
        src="/classroom.jpg"
        alt="classroom"
        width={1000}
        height={1000}
      />
      <CenterTextContainerContainer>
        <CenterTextContainer>
          <h1 className="CenterText">FIND MY CLASS</h1>
          <input
            type="text"
            class="search-input"
            placeholder="Search by name, professor, class id..."
          ></input>
        </CenterTextContainer>
      </CenterTextContainerContainer>
      <img />
    </div>
  );
}
