import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Login from "@/pages/login";
import React, { useState } from "react";

export default function CoverNav() {
  const [navbarVariant, setNavbarVariant] = useState("dark");

  const handleClick = () => {
    const newNavbarVariant = navbarVariant === "dark" ? "light" : "dark";
    setNavbarVariant(newNavbarVariant);
  };

  return (
  <div>
    <Navbar id="Navbar" expand="lg" className={`bg-dark-body-tertiary`}>
      <Container>
        <Navbar.Brand href="#home" />
        <a
          href="https://www.instagram.com/justinwooooooo/"
          className="text-black"
        >
          <i className="bi bi-facebook"></i>
        </a>
        <a
          href="https://www.instagram.com/justinwooooooo/"
          className="text-black mx-3"
        >
          <i className="bi bi-twitter"></i>
        </a>
        <a
          href="https://www.instagram.com/justinwooooooo/"
          className="text-black me-4"
        >
          <i className="bi bi-instagram"></i>
        </a>
        <span className="fs-3 fw-semibold">RateMyClasses</span>
        = <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">
              <Button
                id="BrightnessButton"
                variant={navbarVariant}
                className="me-3"
                onClick={handleClick}
              >
                <i className="bi bi-cloud-sun"></i>
              </Button>
              <Button variant="light">Home</Button>
            </Nav.Link>
            <Nav.Link href="#link">
              <Login />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  <section>

  </section>
</div>
  );
}
