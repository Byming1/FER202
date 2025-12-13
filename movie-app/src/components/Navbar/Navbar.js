import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar as BSNavbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import "./Navbar.css";
import { useUser } from "../../context/UserContext";

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <BSNavbar
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "#0d0d0d", borderBottom: "1px solid #1a1a1a" }}
    >
      <Container>
        <BSNavbar.Brand
          as={Link}
          to="/"
          style={{ color: "#E50914", fontWeight: "bold", fontSize: "1.5rem" }}
        >
          <i className="bi bi-film me-2"></i>
          CineMax
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="navbar-nav" />

        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto ms-4">
            <Nav.Link
              as={Link}
              to="/"
              className="me-1"
              style={{ color: "#808080" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/movies"
              className="me-1"
              style={{ color: "#808080" }}
            >
              Movies
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favourites"
              className="me-1"
              style={{ color: "#808080" }}
            >
              My List
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className="me-1"
              style={{ color: "#808080" }}
            >
              Contact
            </Nav.Link>
          </Nav>

          <Form className="d-flex align-items-center">
            <FormControl
              type="search"
              placeholder="Search movies..."
              className="rounded-start-pill border-end-0"
              style={{ width: "300px", backgroundColor: "#f5f5f5" }}
              aria-label="Search"
            />
            <Button
              variant="light"
              className="rounded-end-pill border-start-0"
              style={{ backgroundColor: "#f5f5f5", color: "#808080" }}
            >
              <i className="bi bi-search"></i>
            </Button>
            {user ? (
              <NavDropdown
                style={{ marginLeft: "10px" }}
                className="fw-bold"
                title={`Hello, ${user.username}`}
              >
                {user.role === "admin" && (
                  <NavDropdown.Item href="/admin/movies">
                    <i
                      style={{ marginRight: "10px" }}
                      class="bi bi-speedometer2"
                    ></i>{" "}
                    Admin Dashboard
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={() => handleLogout()}>
                  <i
                    style={{ marginRight: "10px" }}
                    class="bi bi-box-arrow-right"
                  ></i>{" "}
                  Logout
                </NavDropdown.Item>
                {user.role === "admin" && <NavDropdown.Item href="/Admin" />}
              </NavDropdown>
            ) : (
              <Button
                as={Link}
                to="/login"
                className="rounded-pill ms-1 px-4"
                style={{
                  backgroundColor: "#E50914",
                  border: "none",
                  color: "#ffffff",
                }}
              >
                Login
              </Button>
            )}
          </Form>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
