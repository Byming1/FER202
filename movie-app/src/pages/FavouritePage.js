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
  const [totalFavourites, setTotalFavourites] = useState(0);
  const [totalRuntime, setTotalRuntime] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = Math.ceil(favouriteMovies.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = favouriteMovies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
              <option>▼ Filter</option>
              <option value="1">Drama</option>
              <option value="2">Horror</option>
              <option value="3">Comedy</option>
              <option value="4">Thriller</option>
              <option value="5">Sci-Fi</option>
            </Form.Select>

            <Form.Select
              variant="outline-light"
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
              <option>⇅ Sort By</option>
              <option value="1">Name (a-z)</option>
              <option value="2">Name (z-a)</option>
              <option value="3">Rate (low to high)</option>
              <option value="4">Rate (high to low)</option>
            </Form.Select>
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
          ) : (
            <>
              <Row xs={2} md={5} className="g-3">
                {currentMovies.map((movie) => (
                  <Col key={movie.id}>
                    <FilmCard
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
                <div className="d-flex justify-content-end align-items-center mt-4 gap-3">
                  <Button
                    variant="outline-light"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      backgroundColor: "#1C1C1E",
                      borderColor: "#2C2C2E",
                      color: "#FFFFFF",
                      borderRadius: "8px",
                      padding: "8px 20px",
                      fontSize: "0.9rem",
                    }}
                  >
                    Previous
                  </Button>

                  <span
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    {currentPage} / {totalPages}
                  </span>

                  <Button
                    variant="outline-light"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      backgroundColor: "#1C1C1E",
                      borderColor: "#2C2C2E",
                      color: "#FFFFFF",
                      borderRadius: "8px",
                      padding: "8px 20px",
                      fontSize: "0.9rem",
                    }}
                  >
                    Next
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
