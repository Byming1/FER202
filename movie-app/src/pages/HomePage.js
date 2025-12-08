import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Container } from "react-bootstrap";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <h1>Welcome to CineMax</h1>
        <p>Your favorite movies in one place</p>
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
