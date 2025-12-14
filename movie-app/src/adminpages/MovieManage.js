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
import Pagination from "./Pagination";
import DeleteMovie from "./DeleteMovie";
import EditMovie from "./EditMovie";
import AddMovie from "./AddMovie";
import "./UM.css";

const MovieManage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [genreFilter, setGenreFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("default");

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

  const handleDeleteClick = (movie) => {
    setMovieToDelete(movie);
    setShowDeleteModal(true);
  };

  const handleEditClick = (movie) => {
    setMovieToEdit(movie);
    setShowEditModal(true);
  };

  const handleDeleteSuccess = (movieId) => {
    const deletedMovie = movies.find(m => m.id === movieId);
    alert(`Delete movie with title: ${deletedMovie?.title} successfully`);
    setMovies(movies.filter(m => m.id !== movieId));
  };

  const handleEditSuccess = (movieId, updatedData) => {
    setMovies(movies.map(m => {
      if (m.id === movieId) {
        return { ...m, ...updatedData };
      }
      return m;
    }));
    alert('Movie updated successfully');
  };

  const handleAddSuccess = () => {
    fetchMovie();
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres?.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGenre = genreFilter === "all" || movie.genres?.includes(genreFilter);
    const matchesYear = yearFilter === "" || String(movie.year) === yearFilter;
    return matchesSearch && matchesGenre && matchesYear;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "rating-asc":
        return a.rating - b.rating;
      case "rating-desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });



  const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, genreFilter, yearFilter, sortBy]);

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
              <Button 
                onClick={() => setShowAddModal(true)}
                style={{ backgroundColor: "#E50914", color: "white", border: "none" }}
              >
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
                    <span style={{ color: "#888" }}>{sortedMovies.length} movies</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Form.Select
                      size="sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      style={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #444",
                        color: "white",
                        width: "180px",
                      }}
                    >
                      <option value="default"> Sort By</option>
                      <option value="name-asc"> Name (a-z)</option>
                      <option value="name-desc"> Name (z-a)</option>
                      <option value="rating-asc"> Rate (low to high)</option>
                      <option value="rating-desc"> Rate (high to low)</option>
                    </Form.Select>
                    <Form.Control
                      size="sm"
                      type="number"
                      placeholder="Filter by year"
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      style={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #444",
                        color: "white",
                        width: "150px",
                      }}
                    />
                    <Form.Select
                      size="sm"
                      value={genreFilter}
                      onChange={(e) => setGenreFilter(e.target.value)}
                      style={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #444",
                        color: "white",
                        width: "150px",
                      }}
                    >
                      <option value="all">All Genres</option>
                      <option value="Action">Action</option>
                      <option value="Drama">Drama</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Horror">Horror</option>
                      <option value="Romance">Romance</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                    </Form.Select>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setGenreFilter("all");
                        setYearFilter("");
                      }}
                      style={{ backgroundColor: "#E50914", border: "none" }}
                    >
                      Clear Filters
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
                    {currentMovies.map((movie) => (
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
                        <td style={{ color: "#888" }}>
                          {Array.isArray(movie.genres) ? movie.genres.join(" - ") : movie.genres}
                        </td>
                        <td>
                          <i
                            className="bi bi-pencil-square"
                            onClick={() => handleEditClick(movie)}
                            style={{
                              color: "white",
                              cursor: "pointer",
                              marginRight: "15px",
                              fontSize: "18px",
                            }}
                          ></i>
                          <i
                            className="bi bi-trash"
                            onClick={() => handleDeleteClick(movie)}
                            style={{
                              color: "#E50914",
                              cursor: "pointer",
                              fontSize: "18px",
                            }}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  indexOfFirstItem={indexOfFirstMovie}
                  indexOfLastItem={indexOfLastMovie}
                  totalItems={sortedMovies.length}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <DeleteMovie
        show={showDeleteModal}
        movie={movieToDelete}
        onHide={() => setShowDeleteModal(false)}
        onDeleteSuccess={handleDeleteSuccess}
      />

      <EditMovie
        show={showEditModal}
        movie={movieToEdit}
        onHide={() => setShowEditModal(false)}
        onEditSuccess={handleEditSuccess}
      />

      <AddMovie
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAddSuccess={handleAddSuccess}
      />
    </div>
  );
};

export default MovieManage;
