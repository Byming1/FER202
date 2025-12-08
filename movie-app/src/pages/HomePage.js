import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Carousel, Container } from "react-bootstrap";
import { instance } from "../axios/Axios";

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
    <div>
      <Navbar />
      <Container className="mt-5">
        <Carousel>
          {movies.map((movie) => (
            <Carousel.Item key={movie.id}>
              <img
                className="d-block w-100"
                src={movie.img}
                alt={movie.title}
              />

              <Carousel.Caption className="text-start">
                <h3>{movie.title}</h3>
                <p>{movie.desc}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
