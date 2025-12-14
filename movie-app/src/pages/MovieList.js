import { Button, CardGroup, Col, Container, Form, Row } from "react-bootstrap";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { use, useEffect, useState } from "react";
import { instance } from "../axios/Axios";
import FilmCard from "../components/FilmCard";
import style from "./MovieList.module.css";


export default function MovieList() {
    // lấy tất cả các thể loại/năm có trong các phim
    const [allMovies, setAllMovies] = useState([]);
    const [allYears, setAllYears] = useState([]);
    const [allGenres, setAllGenres] = useState([]);

    // data được nhập vào - năm, thể loại và tên
    const [searchTerm, setSearchTerm] = useState("");
    const [genres, setGenres] = useState("All genres");
    const [year, setYear] = useState("All years");
    const [rating, setRating] = useState(0);

    // các phim sau khi lọc, page hiện tại và page tối đa có thể đạt tới.
    const [movies, setMovies] = useState([]);
    const [presentPage, setPresentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(NaN);

    const reset = () => {
        setGenres("All genres");
        setYear("All years");
        setSearchTerm("");
        setRating(0);
    }

    // nạp data từ axios, lấy data ban đầu và lấy maxPage
    const fetchMovies = async () => {
        await instance.get("/movies").then((res) => {
            const moviesData = res.data;
            setAllMovies(res.data);
            setMovies(res.data);
            setMaxPage(Math.ceil(res.data.length / 10));

            // lọc lấy các thể loại của movie 
            const allGenresNested = moviesData.map(movie => movie.genres);
            const uniqueGenres = [...new Set(allGenresNested.flat())];
            setAllGenres(uniqueGenres);

            const allYearsRaw = moviesData.map(movie => movie.year);
            const uniqueYears = [...new Set(allYearsRaw)].sort((a, b) => b - a);
            setAllYears(uniqueYears);

        });
    };

    // lọc lấy phim từ search, year và genres, mỗi khi chọn mới thì nó cho về trang 1 luôn.
    const filterMovies = () => {
        let filtered = allMovies;
        if (searchTerm) {
            filtered = filtered.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (genres !== "All genres") {
            filtered = filtered.filter(movie =>
                movie.genres.includes(genres)
            );
        }

        if (year !== "All years") {
            filtered = filtered.filter(movie =>
                movie.year === parseInt(year)
            );
        }
        if (rating > 0) {
            filtered = filtered.filter(movie =>
                movie.rating >= rating
            );
        }
        setMovies(filtered);
        setMaxPage(Math.ceil(filtered.length / 10));
        setPresentPage(1);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        if (allMovies.length > 0) {
            filterMovies();
        }
    }, [searchTerm, genres, year, rating]);

    return (
        <div style={{ backgroundColor: "#0A0A0A" }}>
            <Navbar></Navbar>
            <div >
                <Container style={{ marginTop: "40px", marginBottom: "20px" }}>
                    <h1 className="text-white">All Movies</h1>
                    <p className="text-white">discorver thousands o movies across all genres</p>
                </Container>
                <Container className="bg-dark" style={{ padding: "20px", marginBottom: "60px", borderRadius: "15px" }}>
                    <Row>
                        <Col xs={6}>
                            <Form.Control placeholder="Search movies..." onChange={(event) => setSearchTerm(event.target.value)}
                                className={style.search_placeholder}
                                style={{
                                    border: "1px solid black",
                                    color: "white"
                                    , backgroundColor: "#0A0A0A", borderRadius: "10px"
                                }}
                            ></Form.Control>
                        </Col>
                        <Col xs={3}>
                            <Form.Select
                                value={genres}
                                onChange={(event) => {
                                    setGenres(event.target.value);
                                }}
                                style={{ border: "1px solid black", borderRadius: "10px", backgroundColor: "#0A0A0A" }} className="text-white">
                                <option value="All genres">All genres</option>
                                {allGenres.map((gen) => {
                                    return (
                                        <option key={gen} value={gen}>
                                            {gen}
                                        </option>
                                    );
                                })}

                            </Form.Select>
                        </Col>
                        <Col xs={3}>
                            <Form.Select
                                value={year}
                                onChange={(event) => {
                                    setYear(event.target.value);
                                }}
                                style={{ border: "1px solid black", borderRadius: "10px", backgroundColor: "#0A0A0A" }}
                                className="text-white"
                            >
                                <option value="All years">All years</option>
                                {allYears.map((y) => {
                                    const yearString = String(y);
                                    return (
                                        <option
                                            key={yearString}
                                            value={yearString}
                                        >
                                            {y}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Col>
                    </Row>
                    <div style={{ marginTop: "25px", marginBottom: "px" }} className="d-flex justify-content-between">
                        <div>
                            <span className="text-white">Rating: </span>
                            <Button style={{ margin: "0px 5px", backgroundColor: "#0A0A0A", border: "1px solid black" }} onClick={() => setRating(0)}>Any</Button>
                            <Button style={{ margin: "0px 5px", backgroundColor: "#0A0A0A", border: "1px solid black" }} onClick={() => setRating(7)} active={rating === 7}>7+</Button>
                            <Button style={{ margin: "0px 5px", backgroundColor: "#0A0A0A", border: "1px solid black" }} onClick={() => setRating(8)} active={rating === 8}>8+</Button>
                            <Button style={{ margin: "0px 5px", backgroundColor: "#0A0A0A", border: "1px solid black" }} onClick={() => setRating(9)} active={rating === 9}>9+</Button>
                        </div>
                        <div>
                             <Button style={{ margin: "0px 5px", backgroundColor: "#0A0A0A", border: "1px solid black" }} onClick={() => reset()}>Reset All Field</Button>
                        </div>
                    </div>
                </Container>

                <Container>
                    <Row className="g-3">
                        {
                            movies
                                .slice((presentPage - 1) * 10, presentPage * 10)
                                .map(movie => {
                                    return (
                                        <div className="col" style={{ flex: '0 0 20%', maxWidth: '20%' }} key={movie.id}>
                                            <FilmCard
                                                Img={movie.image}
                                                rating={movie.rating}
                                                title={movie.title}
                                                genres={movie.genres}
                                                year={movie.year}
                                            />
                                        </div>
                                    )
                                })
                        }
                    </Row>
                </Container>

                <Container>
                    <div className="d-flex justify-content-center" style={{ marginTop: "50px" }}>
                        <Button className={style.button_changePage}
                            variant="dark"
                            onClick={() => setPresentPage(Math.max(1, presentPage - 1))}
                            disabled={presentPage === 1}
                        >
                            {"<"}
                        </Button>

                        {presentPage > 2 && (
                            <>
                                <Button variant="dark" onClick={() => setPresentPage(1)} className={style.button_changePage}>
                                    1
                                </Button>
                                {presentPage > 3 && (
                                    <Button variant="dark" disabled style={{ cursor: "default" }} className={style.button_changePage}>
                                        ...
                                    </Button>
                                )}
                            </>
                        )}

                        {presentPage > 1 && (
                            <Button variant="dark" onClick={() => setPresentPage(presentPage - 1)} className={style.button_changePage}>
                                {presentPage - 1}
                            </Button>
                        )}

                        <Button variant="danger" className={style.button_changePage}>{presentPage}</Button>

                        {presentPage < maxPage && (
                            <Button variant="dark" onClick={() => setPresentPage(presentPage + 1)} className={style.button_changePage}>
                                {presentPage + 1}
                            </Button>
                        )}

                        {presentPage < maxPage - 1 && (
                            <Button variant="dark" onClick={() => setPresentPage(presentPage + 2)} className={style.button_changePage}>
                                {presentPage + 2}
                            </Button>
                        )}

                        {presentPage < maxPage - 2 && (
                            <>
                                {presentPage < maxPage - 3 && (
                                    <Button variant="dark" disabled style={{ cursor: "default" }} className={style.button_changePage}>
                                        ...
                                    </Button>
                                )}
                                <Button variant="dark" onClick={() => setPresentPage(maxPage)} className={style.button_changePage} >
                                    {maxPage}
                                </Button>
                            </>
                        )}

                        <Button
                            variant="dark"
                            onClick={() => setPresentPage(Math.min(maxPage, presentPage + 1))}
                            disabled={presentPage === maxPage}
                            className={style.button_changePage}
                        >
                            {">"}
                        </Button>
                    </div>
                </Container>
            </div>
            <Footer></Footer>
        </div>
    )
}