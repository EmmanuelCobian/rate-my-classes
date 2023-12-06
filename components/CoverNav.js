import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Login from "@/pages/login";
import React, { useState } from "react";
import SearchBar from "./SearchBar";

export default function CoverNav() {
  const [navbarVariant, setNavbarVariant] = useState("dark");

  return (
    <div>
      <Navbar
        id="Navbar"
        expand="lg"
        className={`bg-dark-body-tertiary`}
        style={{ borderBottom: "5px solid black" }}
      >
        <Container>
          <Navbar.Brand href="/">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter mx-3"></i>
            <i className="bi bi-instagram me-4"></i>
            <span className="fs-3 fw-semibold">RateMyClasses</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBar />
            <Nav className="ms-auto">
              <Nav.Link href="/">
                <Button variant="light">Home</Button>
              </Nav.Link>
              <Nav.Link>
                <Login />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section></section>
    </div>
  );
}
