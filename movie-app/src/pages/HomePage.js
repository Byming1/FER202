import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Badge, Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { instance } from "../axios/Axios";
import { Link } from "react-router-dom";
import FilmCard from "../components/FilmCard";

function HomePage() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    await instance.get("/movies").then((res) => {
      setMovies(res.data);
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
      }}
    >
      <Navbar />
      <div className="">
        <Carousel>
          {movies
            .filter((movie) => movie.featured)
            .map((movie) => (
              <Carousel.Item key={movie.id}>
                <div
                  style={{
                    height: "600px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    className="d-block w-100 "
                    src={movie.backgroundImage}
                    alt={movie.title}
                    style={{
                      height: "600px",
                      filter: "brightness(0.6)",
                    }}
                  />

                  <Carousel.Caption className="text-start">
                    <h1
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      {movie.title}
                    </h1>
                    <p
                      style={{
                        fontSize: "1.1rem",
                        marginBottom: "1.5rem",
                        maxWidth: "800px",
                        lineHeight: "1.6",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                      }}
                    >
                      {movie.description}
                    </p>
                    <div
                      className="d-flex align-items-center mb-3"
                      style={{ gap: "1rem" }}
                    >
                      <Badge
                        bg=""
                        style={{
                          fontSize: "1rem",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "8px",
                          backgroundColor: "#E50914 !important",
                          color: "#ffffff",
                        }}
                      >
                        {movie.rating}
                      </Badge>
                      <span style={{ fontSize: "1rem", color: "#ffffff" }}>
                        {movie.year}
                      </span>
                      <span style={{ fontSize: "1rem", color: "#ffffff" }}>
                        •
                      </span>
                      <span style={{ fontSize: "1rem", color: "#ffffff" }}>
                        {movie.genres?.join(", ")}
                      </span>
                      <span style={{ fontSize: "1rem", color: "#ffffff" }}>
                        •
                      </span>
                      <span style={{ fontSize: "1rem", color: "#ffffff" }}>
                        {movie.duration} mins
                      </span>
                    </div>
                    <div className="d-flex" style={{ gap: "1rem" }}>
                      <Button
                        as={Link}
                        to={`/movie/${movie.id}`}
                        style={{
                          backgroundColor: "#E50914",
                          border: "none",
                          padding: "0.75rem 2rem",
                          fontSize: "1rem",
                          fontWeight: "600",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <i className="bi bi-play-fill"></i>
                        View Details
                      </Button>
                      <Button
                        variant="secondary"
                        style={{
                          backgroundColor: "#3a3a3a",
                          border: "none",
                          padding: "0.75rem 2rem",
                          fontSize: "1rem",
                          fontWeight: "600",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <i className="bi bi-heart"></i>
                        Add to List
                      </Button>
                    </div>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
      <div>
        <Container className="my-5">
          <div className="d-flex space-between text-white">
            <h2 className="mb-4">Trending Now</h2>
          </div>
          <Row>
            {movies.slice(0, 4).map((movie) => (
              <Col key={movie.id} xs={6} md={3} className="mb-4">
                <FilmCard
                  Img={movie.poster}
                  rating={movie.rating}
                  title={movie.title}
                  genres={movie.genres}
                  year={movie.year}
                ></FilmCard>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
