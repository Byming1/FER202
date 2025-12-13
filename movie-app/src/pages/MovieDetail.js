import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { instance as axios } from "../axios/Axios";
import FilmCard from "../components/FilmCard";
import { Col, Row, Modal, Button } from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Comment from "../components/Comment/Comment";
import { useUser } from "../context/UserContext";

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useUser();

  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const movieRes = await axios.get(`/movies/${id}`);
      const movieData = movieRes.data;
      setMovie(movieData);

      const allRes = await axios.get("/movies");
      const similarMovies = allRes.data.filter(
        (m) =>
          m.id !== movieData.id &&
          m.genres.some((g) => movieData.genres.includes(g))
      );
      setSimilar(similarMovies);
    };

    fetchData();
  }, [id]);

  const handleAddToFavorites = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const userId = Number(user.userId);
      const movieId = Number(movie.id);

      const res = await axios.get(`/watchList?userId=${userId}`);
      let watchList = res.data[0];

      if (!watchList) {
        const allWatchLists = (await axios.get("/watchList")).data;
        const maxId = allWatchLists.reduce(
          (max, w) => (w.watchListId > max ? w.watchListId : max),
          0
        );

        const newWatchList = {
          watchListId: maxId + 1,
          userId,
          movies: [{ movieId }],
          id: Math.random().toString(16).slice(2, 6)
        };

        await axios.post("/watchList", newWatchList);
        alert("Movie added to favorites");
        return;
      }

      const existed = watchList.movies.some((m) => m.movieId === movieId);
      if (existed) {
        alert("Movie already in favourites");
        return;
      }

      await axios.put(`/watchList/${watchList.id}`, {
        ...watchList,
        movies: [...watchList.movies, { movieId }]
      });

      alert("Added to favourites");
    } catch (err) {
      console.error(err);
      alert("Add failed");
    }
  };

  if (!movie) return <div className="text-white p-5">Movie not found.</div>;

  return (
    <div className="w-100 min-vh-100 bg-black text-white position-relative">
      <div style={{ position: "relative", zIndex: 100 }}>
        <Navbar />
      </div>

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
      />

      <div className="container py-5 position-relative" style={{ zIndex: 5 }}>
        <div className="row">
          {/* Poster */}
          <div className="col-md-4">
            <img
              src={movie.image}
              alt={movie.title}
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Movie Info */}
          <div className="col-md-8">
            <h1 className="fw-bold mb-3">{movie.title}</h1>

            <div className="d-flex gap-4 text-secondary mb-3">
              <span>{movie.year}</span>
              <span>{movie.duration} min</span>
              <span className="text-warning fw-semibold">⭐ {movie.rating}</span>
            </div>

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

            <div className="d-flex gap-3 mt-4">
              <button
                className="badge btn d-flex align-items-center justify-content-center"
                style={{ backgroundColor: "#E50914", gap: "0.5rem", minWidth: "150px" }}
                onClick={handleAddToFavorites}
              >
                <i className="bi bi-heart"></i>
                Add to List
              </button>

              <button
                className="btn btn-outline-light"
                onClick={() => setShowTrailer(true)}
              >
                Watch Trailer
              </button>

              <Link
                to="/"
                className="btn btn-outline-light d-flex align-items-center"
                style={{ minWidth: "150px" }}
              >
                ← Back to Movies
              </Link>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        <h3 className="fw-bold mb-4 mt-5">Similar Movies</h3>

        <Row>
          {similar.slice(0, 5).map((m) => (
            <Col key={m.id} className="mb-4">
              <FilmCard
                movie={m}
                id={m.id}
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

      {/* Trailer Modal */}
      <Modal show={showTrailer} onHide={() => setShowTrailer(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/5AwtptT8X8k"
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
<Comment movieId={movie.id} />

      <Footer />
    </div>
  );
};

export default MovieDetail;
