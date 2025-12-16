import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Badge, Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { instance } from "../axios/Axios";
import { Link } from "react-router-dom";
import FilmCard from "../components/FilmCard";
import { useUser } from "../context/UserContext";

function HomePage() {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState(null);
  const [watchListMovieIds, setWatchListMovieIds] = useState([]);

  const fetchMovies = async () => {
    await instance.get("/movies").then((res) => {
      setMovies(res.data);
    });
  };

  const fetchWatchList = async () => {
    if (user) {
      try {
        const res = await instance.get(`/watchList?userId=${user.userId}`);
        const wl = res.data[0] || null;
        setWatchList(wl);
        if (wl) {
          const movieIds = wl.movies.map((m) => Number(m.movieId));
          setWatchListMovieIds(movieIds);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    fetchWatchList();
  }, [user]);

  const moviesRated = [...movies];
  const moviesReleased = [...movies];

  const MovieList = moviesRated.sort((a, b) => {
    if (a.rating < b.rating) return 1;
    if (a.rating > b.rating) return -1;
    else return 0;
  });

  const MovieList2 = moviesReleased.sort((a, b) => {
    if (a.year < b.year) return 1;
    if (a.year > b.year) return -1;
    else return 0;
  });

  const handleAddToFavourites = async (movieId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const id = Number(movieId);
    const isInWatchList = watchListMovieIds.includes(id);

    try {
      if (!isInWatchList) {
        if (!watchList) {
          const allWatchLists = (await instance.get("/watchList")).data;
          const maxId = allWatchLists.reduce(
            (max, w) => (w.watchListId > max ? w.watchListId : max),
            0
          );
          const newWatchList = {
            watchListId: maxId + 1,
            userId: user.userId,
            movies: [{ movieId: id }],
            id: Math.random().toString(16).slice(2, 6),
          };
          await instance.post("/watchList", newWatchList);
          setWatchList(newWatchList);
          setWatchListMovieIds([id]);
        } else {
          const updatedMovies = [...watchList.movies, { movieId: id }];
          await instance.put(`/watchList/${watchList.id}`, {
            ...watchList,
            movies: updatedMovies,
          });
          setWatchList({ ...watchList, movies: updatedMovies });
          setWatchListMovieIds([...watchListMovieIds, id]);
        }
        alert("Movie added to favorites");
      } else {
        const updatedMovies = watchList.movies.filter(
          (m) => Number(m.movieId) !== id
        );
        await instance.put(`/watchList/${watchList.id}`, {
          ...watchList,
          movies: updatedMovies,
        });
        setWatchList({ ...watchList, movies: updatedMovies });
        setWatchListMovieIds(watchListMovieIds.filter((mid) => mid !== id));
        alert("Removed from favourites");
      }
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

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

                  <Carousel.Caption className="text-start d-flex">
                    <div style={{ marginRight: "3rem" }}>
                      <img
                        style={{
                          width: "200px",
                          height: "300px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.7)",
                        }}
                        src={movie.image}
                      ></img>
                    </div>
                    <div>
                      <h1
                        style={{
                          fontSize: "2rem",
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
                          ⭐{movie.rating}
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
                      <div className="d-flex mb-3" style={{ gap: "1rem" }}>
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
                          onClick={() => handleAddToFavourites(movie.id)}
                          style={{
                            backgroundColor: watchListMovieIds.includes(
                              Number(movie.id)
                            )
                              ? "#E50914"
                              : "#3a3a3a",
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
                          <i
                            className={
                              watchListMovieIds.includes(Number(movie.id))
                                ? "bi bi-heart-fill"
                                : "bi bi-heart"
                            }
                          ></i>
                          {watchListMovieIds.includes(Number(movie.id))
                            ? "In My List"
                            : "Add to List"}
                        </Button>
                      </div>
                    </div>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
      <div>
        <Container className="my-5">
          <div className="d-flex justify-content-between text-white">
            <h2 className="mb-4">Trending Now</h2>
            <a
              href="/movies"
              className="mt-3"
              style={{
                color: "#E50914",
                textDecoration: "none",
              }}
            >
              View more
            </a>
          </div>
          <Row>
            {movies.slice(0, 5).map((movie) => (
              <Col key={movie.id} className="mb-4">
                <FilmCard
                  movie={movie}
                  id={movie.id}
                  Img={movie.image}
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
      <div>
        <Container className="my-5">
          <div className="d-flex justify-content-between text-white">
            <h2 className="mb-4">Top rated</h2>
            <a
              href="/movies"
              className="mt-3"
              style={{
                color: "#E50914",
                textDecoration: "none",
              }}
            >
              View more
            </a>
          </div>
          <Row>
            {MovieList.slice(0, 5).map((movie) => (
              <Col key={movie.id} className="mb-4">
                <FilmCard
                  movie={movie}
                  id={movie.id}
                  Img={movie.image}
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
      <div>
        <Container className="my-5">
          <div className="d-flex justify-content-between text-white">
            <h2 className="mb-4">New Releases</h2>
            <a
              href="/movies"
              className="mt-3"
              style={{
                color: "#E50914",
                textDecoration: "none",
              }}
            >
              View more
            </a>
          </div>
          <Row>
            {MovieList2.slice(0, 5).map((movie) => (
              <Col key={movie.id} className="mb-4">
                <FilmCard
                  movie={movie}
                  id={movie.id}
                  Img={movie.image}
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
