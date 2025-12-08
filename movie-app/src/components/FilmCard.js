import { Card } from "react-bootstrap";

const FilmCard = ({ Img, rating, title, genres, year }) => {
  return (
    <Card>
      <Card.Img variant="top" src={Img}></Card.Img>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div>
          <span>{year}</span>
          <span> • </span>
          <span>{genres.join(", ")}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FilmCard;
