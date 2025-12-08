import React from "react";
import { useParams, Link } from "react-router-dom";
import moviesData from "../data/database.json";
import FilmCard from "../components/FilmCard";
import { Col, Row } from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MovieDetail = () => {
  const { id } = useParams();
  const movie = moviesData.movies.find((m) => m.id === parseInt(id));

  if (!movie) return <div className="text-white p-5">Movie not found.</div>;

  const similar = moviesData.movies.filter(
    (m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g))
  );

  return (
    <div className="w-100 min-vh-100 bg-black text-white position-relative">

      <div style={{ position: "relative", zIndex: 100 }}>
        <Navbar />
      </div>

      {/* BACKGROUND IMAGE  */}
      <div
        className="position-absolute top-0 start-0 w-100"
        style={{
          height: "60vh",
          backgroundImage: `url(${movie.backgroundImage || movie.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) blur(2px)",
          zIndex: 0,
        }}
      ></div>


      <div className="container py-5 position-relative" style={{ zIndex: 5 }}>
        <div className="row">

          {/* POSTER */}
          <div className="col-md-4">
            <img
              src={movie.image}
              alt={movie.title}
              className="img-fluid rounded shadow"
            />
          </div>

          {/* DETAILS */}
          <div className="col-md-8">
            <h1 className="fw-bold mb-3">{movie.title}</h1>

            <div className="d-flex gap-4 text-secondary mb-3">
              <span>{movie.year}</span>
              <span>{movie.duration} min</span>
              <span className="text-warning fw-semibold">⭐ {movie.rating}</span>
            </div>

            {/* GENRES */}
            <div className="mb-3">
              {movie.genres.map((g) => (
                <span
                  key={g}
                  className="badge me-2 px-3 py-2"
                  style={{ backgroundColor: "#E50914" }}
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-light">{movie.description}</p>

            {/* BUTTONS */}
            <div className="d-flex gap-3 mt-4">
              <button
                className="badge btn px-4"
                style={{ backgroundColor: "#E50914" }}
              >
                ❤️ Add to Favorites
              </button>

              <Link to="/" className="btn btn-outline-light px-4">
                ← Back to Movies
              </Link>
            </div>
          </div>
        </div>

        {/* SIMILAR MOVIES */}
        <h3 className="fw-bold mb-4 mt-5">Similar Movies</h3>

        <Row>
          {similar.slice(0, 5).map((m) => (
            <Col key={m.id} className="mb-4">
              <FilmCard
                Img={m.image}
                rating={m.rating}
                title={m.title}
                genres={m.genres}
                year={m.year}
              />
            </Col>
          ))}
        </Row>
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetail;
