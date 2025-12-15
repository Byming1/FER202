import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar as BSNavbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import "./Navbar.css";
import { useUser } from "../../context/UserContext";
import { instance } from "../../axios/Axios";

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);

  const fetchMovies = async () => {
    await instance.get("/movies").then((res) => {
      setMovies(res.data);
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search?.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <BSNavbar
      expand="lg"
      variant="dark"
      style={{
        backgroundColor: "#000000",
        borderBottom: "1px solid #1a1a1a",
      }}
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
              to="/"
              className="me-1"
              style={{ color: "#808080" }}
            >
              Contact
            </Nav.Link>
          </Nav>

          <Form className="d-flex align-items-center" style={{ gap: "15px" }}>
            <div style={{ position: "relative" }}>
              <FormControl
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShow(true);
                }}
                onBlur={() => setTimeout(() => setShow(false), 200)}
                placeholder="Search movies..."
                className="rounded-pill"
                style={{
                  width: "300px",
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  color: "#ffffff",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
                aria-label="Search"
              />
              {show && search && (
                <Dropdown.Menu
                  show
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "320px",
                    maxHeight: "400px",
                    overflowY: "auto",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "10px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    marginTop: "8px",
                    zIndex: 1000,
                    padding: "6px 0",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  className="dropdown-no-scrollbar"
                >
                  {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                      <Dropdown.Item
                        key={movie.id}
                        style={{
                          padding: "0",
                          borderBottom: "1px solid #2a2a2a",
                          transition: "all 0.2s ease",
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#2a2a2a";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <Link
                          to={`/movie/${movie.id}`}
                          onClick={() => setShow(false)}
                          style={{
                            textDecoration: "none",
                            color: "#ffffff",
                            display: "flex",
                            padding: "8px 12px",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={movie.image}
                            alt={movie.title}
                            style={{
                              width: "45px",
                              height: "65px",
                              objectFit: "cover",
                              borderRadius: "5px",
                              flexShrink: 0,
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                              flex: 1,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: "600",
                                fontSize: "13px",
                                color: "#ffffff",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {movie.title}
                            </div>
                            <div
                              style={{
                                fontSize: "11px",
                                color: "#999",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <span style={{ color: "#FFD700" }}>
                                ⭐ {movie.rating}
                              </span>
                              <span>•</span>
                              <span>{movie.year}</span>
                            </div>
                            <div
                              style={{
                                fontSize: "10px",
                                color: "#666",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {(() => {
                                const genresText =
                                  movie.genres?.join(", ") || "";
                                return genresText.length > 20
                                  ? genresText.slice(0, 20) + "..."
                                  : genresText;
                              })()}
                            </div>
                          </div>
                        </Link>
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item
                      style={{
                        padding: "15px 12px",
                        color: "#666",
                        textAlign: "center",
                        fontSize: "13px",
                      }}
                    >
                      No movies found
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              )}
            </div>
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
