import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Badge,
  InputGroup,
} from "react-bootstrap";
import { instance } from "../axios/Axios";
import AdminSidebar from "./AdminSidebar";
import "./UM.css";

const MovieManage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const response = await instance.get("/movies");
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "40px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", color: "white" }}
    >
      <AdminSidebar activePage="movies" />

      <div style={{ marginLeft: "200px", padding: "30px" }}>
        <Container fluid>
          <Row className="mb-4">
            <Col>
              <h2>Movie Management</h2>
              <p style={{ color: "#888" }}>Manage and monitor all movies</p>
            </Col>
            <Col xs="auto">
              <InputGroup>
                <Form.Control
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    color: "white",
                  }}
                />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Button style={{ backgroundColor: "#E50914", color: "white" ,border:"none"}}>
                + Add New Movie
              </Button>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <div
                style={{
                  backgroundColor: "#1a1a1a",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <strong>All Movies</strong>{" "}
                    <span style={{ color: "#888", marginLeft: "20px" }}>
                      {filteredMovies.length} movies
                    </span>
                  </div>
                  <div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                    >
                      Filter
                    </Button>
                  </div>
                </div>

                <Table hover>
                  <thead>
                    <tr
                      id="table-header"
                      style={{ borderBottom: "1px solid #333" }}
                    >
                      <th>Movie ID</th>
                      <th>Title</th>
                      <th>Year</th>
                      <th>Rating</th>
                      <th>Genres</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMovies.map((movie) => (
                      <tr
                        id="table-content"
                        key={movie.id}
                        style={{ borderBottom: "1px solid #222" }}
                      >
                        <td style={{ color: "#888" }}>{movie.id}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            {movie.title}
                          </div>
                        </td>
                        <td style={{ color: "#888" }}>{movie.year}</td>
                        <td>
                          <span
                            style={{
                              backgroundColor: "#E50914",
                              borderRadius: "5px",
                              color: "white",
                              padding: "3px 6px",
                              display: "inline-block",
                              minWidth: "36px",
                              textAlign: "center",
                            }}
                          >
                            {movie.rating}
                          </span>
                        </td>
                        <td style={{ color: "#888" }}>{movie.genres.join(" - ")}</td>
                        <td>
                          <i
                            className="bi bi-pencil-square"
                            style={{
                              color: "white",
                              cursor: "pointer",
                              marginRight: "15px",
                              fontSize: "18px",
                            }}
                          ></i>
                          <i
                            className="bi bi-trash"
                            style={{
                              color: "#888",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div style={{ color: "#888" }}>
                    Showing 1-{filteredMovies.length} of {movies.length}
                  </div>
                  <div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                    >
                      Previous
                    </Button>
                    <Button
                      style={{ backgroundColor: "#E50914", color: "white" }}
                      size="sm"
                      className="me-2"
                    >
                      1
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                    >
                      2
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                    >
                      3
                    </Button>
                    <span className="me-2">...</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <style jsx>{`
        input::placeholder {
          color: #888 !important;
        }
      `}</style>
    </div>
  );
};

export default MovieManage;
