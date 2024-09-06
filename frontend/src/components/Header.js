import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Header.css"; // Assurez-vous d'avoir un fichier CSS séparé pour personnaliser le style

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="brand">
          Mon Patrimoine
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              as={NavLink}
              to="/possession"
              activeClassName="active"
              className="nav-link-custom"
            >
              Menu Possessions
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/patrimoine"
              activeClassName="active"
              className="nav-link-custom"
            >
              Menu Patrimoine
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
