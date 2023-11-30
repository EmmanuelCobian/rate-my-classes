import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import CoverNav from "@/components/Coverpage";
import ClassPage from "./classpage";

import Ratings from "@/components/Ratings.js";
import ClassInfoContainer from "@/components/ClassInfoContainer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <CoverNav />
      <Image src="/classroom.jpg" alt="classroom" width={1000} height={1000} />
      <Container className="d-flex justify-content-center">
        <h1 className="fs-3">FIND MY CLASS</h1>
      </Container>
      <img />
    </div>
  );
}
