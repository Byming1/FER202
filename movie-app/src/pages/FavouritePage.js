import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import {
  Badge,
  Button,
  Col,
  Container,
  Row,
  Pagination,
  Form,
} from "react-bootstrap";
import { instance } from "../axios/Axios";
import FilmCard from "../components/FilmCard";

function FavouritePage() {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [totalFavourites, setTotalFavourites] = useState(0);
  const [totalRuntime, setTotalRuntime] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchFavouriteMovies = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser || !currentUser.userId) {
          console.log("No user logged in");
          return;
        }

        const watchListResponse = await instance.get(
          `/watchList?userId=${currentUser.userId}`
        );
        const watchListData = watchListResponse.data;

        if (watchListData.length === 0) {
          setFavouriteMovies([]);
          setTotalFavourites(0);
          setTotalRuntime(0);
          setAvgRating(0);
          return;
        }

        const movieIds = watchListData[0].movies.map((m) => m.movieId);

        const moviePromises = movieIds.map((id) =>
          instance.get(`/movies/${id}`)
        );
        const movieResponses = await Promise.all(moviePromises);
        const movies = movieResponses.map((res) => res.data);

        setFavouriteMovies(movies);
        setFilteredMovies(movies);

        setTotalFavourites(movies.length);

        const totalDuration = movies.reduce(
          (sum, movie) => sum + (movie.duration || 0),
          0
        );
        setTotalRuntime(Math.round(totalDuration / 60));

        const totalRating = movies.reduce(
          (sum, movie) => sum + (movie.rating || 0),
          0
        );
        setAvgRating((totalRating / movies.length).toFixed(1));
      } catch (error) {
        console.error("Error fetching favourite movies:", error);
      }
    };

    fetchFavouriteMovies();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let filtered = [...favouriteMovies];

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter((movie) =>
        movie.genres.includes(selectedGenre)
      );
    }

    // Sort
    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "rating-low") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "rating-high") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredMovies(filtered);
    setCurrentPage(1); // Reset to page 1 when filter/sort changes
  }, [selectedGenre, sortBy, searchTerm, favouriteMovies]);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <Container
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 0px" }}>
          <div style={{ marginBottom: "10px" }}>
            <h1
              style={{
                color: "#E50914",
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "0px",
              }}
            >
              My Favorites
            </h1>
            <p
              style={{
                color: "#8E8E93",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              Your personal collection of amazing movies
            </p>
          </div>

          <Row className="g-3 mb-4">
            <Col xs={6} md={4}>
              <div
                style={{
                  backgroundColor: "#1C1C1E",
                  borderRadius: "12px",
                  padding: "20px",
                  height: "100%",
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div
                    style={{
                      color: "#FF2D55",
                      fontSize: "1.5rem",
                      marginBottom: "8px",
                    }}
                  >
                    <i className="bi bi-heart-fill"></i>
                  </div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "2rem",
                      fontWeight: "700",
                      marginBottom: "5px",
                    }}
                  >
                    {totalFavourites}
                  </div>
                </div>

                <div
                  style={{
                    color: "#8E8E93",
                    fontSize: "0.9rem",
                  }}
                >
                  Total Favorites
                </div>
              </div>
            </Col>

            <Col xs={6} md={4}>
              <div
                style={{
                  backgroundColor: "#1C1C1E",
                  borderRadius: "12px",
                  padding: "20px",
                  height: "100%",
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div
                    style={{
                      color: "#30D158",
                      fontSize: "1.5rem",
                      marginBottom: "8px",
                    }}
                  >
                    <i className="bi bi-alarm-fill"></i>
                  </div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "2rem",
                      fontWeight: "700",
                      marginBottom: "5px",
                    }}
                  >
                    {totalRuntime}h
                  </div>
                </div>

                <div
                  style={{
                    color: "#8E8E93",
                    fontSize: "0.9rem",
                  }}
                >
                  Total Runtime
                </div>
              </div>
            </Col>

            <Col xs={6} md={4}>
              <div
                style={{
                  backgroundColor: "#1C1C1E",
                  borderRadius: "12px",
                  padding: "20px",
                  height: "100%",
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div
                    style={{
                      color: "#FFD60A",
                      fontSize: "1.5rem",
                      marginBottom: "8px",
                    }}
                  >
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "2rem",
                      fontWeight: "700",
                      marginBottom: "5px",
                    }}
                  >
                    {avgRating}
                  </div>
                </div>

                <div
                  style={{
                    color: "#8E8E93",
                    fontSize: "0.9rem",
                  }}
                >
                  Avg Rating
                </div>
              </div>
            </Col>
          </Row>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginBottom: "30px",
            }}
          >
            <Form.Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              style={{
                backgroundColor: "#1C1C1E",
                borderColor: "#2C2C2E",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "8px 20px",
                fontSize: "0.9rem",
                width: "150px",
              }}
            >
              <option value="all">▼ All Genres</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Comedy">Comedy</option>
              <option value="Thriller">Thriller</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Action">Action</option>
              <option value="Crime">Crime</option>
              <option value="Mystery">Mystery</option>
              <option value="Fantasy">Fantasy</option>
            </Form.Select>

            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              variant="outline-light"
              style={{
                backgroundColor: "#1C1C1E",
                borderColor: "#2C2C2E",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "8px 20px",
                fontSize: "0.9rem",
                width: "180px",
              }}
            >
              <option value="default">⇅ Sort By</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="rating-low">Rating (Low to High)</option>
              <option value="rating-high">Rating (High to Low)</option>
            </Form.Select>

            <Form.Control
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: "#1C1C1E",
                borderColor: "#2C2C2E",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "8px 20px",
                fontSize: "0.9rem",
                width: "300px",
              }}
            />
          </div>

          {favouriteMovies.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#8E8E93",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>
                <i className="bi bi-heart-fill"></i>
              </div>
              <h3 style={{ color: "#FFFFFF", marginBottom: "10px" }}>
                No Favorites Yet
              </h3>
              <p>Start adding movies to your favorites collection!</p>
            </div>
          ) : filteredMovies.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#8E8E93",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>
                <i className="bi bi-funnel"></i>
              </div>
              <h3 style={{ color: "#FFFFFF", marginBottom: "10px" }}>
                No Movies Match Your Filter
              </h3>
              <p>Try selecting a different genre or sort option</p>
            </div>
          ) : (
            <>
              <Row xs={2} md={5} className="g-3">
                {currentMovies.map((movie) => (
                  <Col key={movie.id}>
                    <FilmCard
                      movie={movie}
                      id={movie.id}
                      Img={movie.image}
                      rating={movie.rating}
                      title={movie.title}
                      genres={movie.genres}
                      year={movie.year}
                    />
                  </Col>
                ))}
              </Row>

              {totalPages > 1 && (
                <div
                  className="d-flex justify-content-center"
                  style={{ marginTop: "50px" }}
                >
                  <Button
                    variant="dark"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    style={{
                      backgroundColor: "#1C1C1E",
                      borderColor: "#2C2C2E",
                      color: "#FFFFFF",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      margin: "0 5px",
                    }}
                  >
                    {"<"}
                  </Button>

                  {currentPage > 2 && (
                    <>
                      <Button
                        variant="dark"
                        onClick={() => setCurrentPage(1)}
                        style={{
                          backgroundColor: "#1C1C1E",
                          borderColor: "#2C2C2E",
                          color: "#FFFFFF",
                          borderRadius: "8px",
                          padding: "8px 16px",
                          margin: "0 5px",
                        }}
                      >
                        1
                      </Button>
                      {currentPage > 3 && (
                        <Button
                          variant="dark"
                          disabled
                          style={{
                            cursor: "default",
                            backgroundColor: "#1C1C1E",
                            borderColor: "#2C2C2E",
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            margin: "0 5px",
                          }}
                        >
                          ...
                        </Button>
                      )}
                    </>
                  )}

                  {currentPage > 1 && (
                    <Button
                      variant="dark"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      style={{
                        backgroundColor: "#1C1C1E",
                        borderColor: "#2C2C2E",
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        margin: "0 5px",
                      }}
                    >
                      {currentPage - 1}
                    </Button>
                  )}

                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#E50914",
                      borderColor: "#E50914",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      margin: "0 5px",
                    }}
                  >
                    {currentPage}
                  </Button>

                  {currentPage < totalPages && (
                    <Button
                      variant="dark"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      style={{
                        backgroundColor: "#1C1C1E",
                        borderColor: "#2C2C2E",
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        margin: "0 5px",
                      }}
                    >
                      {currentPage + 1}
                    </Button>
                  )}

                  {currentPage < totalPages - 1 && (
                    <Button
                      variant="dark"
                      onClick={() => setCurrentPage(currentPage + 2)}
                      style={{
                        backgroundColor: "#1C1C1E",
                        borderColor: "#2C2C2E",
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        margin: "0 5px",
                      }}
                    >
                      {currentPage + 2}
                    </Button>
                  )}

                  {currentPage < totalPages - 2 && (
                    <>
                      {currentPage < totalPages - 3 && (
                        <Button
                          variant="dark"
                          disabled
                          style={{
                            cursor: "default",
                            backgroundColor: "#1C1C1E",
                            borderColor: "#2C2C2E",
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            margin: "0 5px",
                          }}
                        >
                          ...
                        </Button>
                      )}
                      <Button
                        variant="dark"
                        onClick={() => setCurrentPage(totalPages)}
                        style={{
                          backgroundColor: "#1C1C1E",
                          borderColor: "#2C2C2E",
                          color: "#FFFFFF",
                          borderRadius: "8px",
                          padding: "8px 16px",
                          margin: "0 5px",
                        }}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}

                  <Button
                    variant="dark"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    style={{
                      backgroundColor: "#1C1C1E",
                      borderColor: "#2C2C2E",
                      color: "#FFFFFF",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      margin: "0 5px",
                    }}
                  >
                    {">"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default FavouritePage;
