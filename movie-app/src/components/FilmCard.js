import { Card } from "react-bootstrap";

const FilmCard = ({ Img, rating, title, genres, year }) => {
  const full = genres.join(", ");
  const maxLength = 15;
  const displayText =
    full.length > maxLength ? full.slice(0, maxLength) + "..." : full;
  return (
    <Card
      style={{
        border: "none",
      }}
    >
      <Card.Img
        style={{
          height: "340px",
        }}
        variant="top"
        src={Img}
      ></Card.Img>
      <span
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "#E50914",
          padding: "0.25rem 0.5rem",
          borderRadius: "10px",
          color: "#ffffff",
          fontSize: "0.9rem",
          fontWeight: "600",
        }}
      >
        {rating}
      </span>
      <Card.Body
        className="text-white"
        style={{
          backgroundColor: "#0A0A0A",
          textAlign: "left",
          padding: "0.5rem",
        }}
      >
        <Card.Title style={{ marginBottom: "0.25rem", fontSize: "1rem" }}>
          {title}
        </Card.Title>
        <div style={{ fontSize: "0.85rem" }}>
          <span>{year}</span>
          <span> • </span>
          <span>{displayText}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FilmCard;
