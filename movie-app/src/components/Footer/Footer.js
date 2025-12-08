import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <div className="footer-brand">CineMax</div>
            <p className="footer-description">
              Your ultimate destination for movies and entertainment
            </p>
          </Col>

          <Col md={2} className="mb-4">
            <h6 className="footer-heading">Movies</h6>
            <Link to="/action" className="footer-link">
              Action
            </Link>
            <Link to="/drama" className="footer-link">
              Drama
            </Link>
            <Link to="/comedy" className="footer-link">
              Comedy
            </Link>
            <Link to="/sci-fi" className="footer-link">
              Sci-Fi
            </Link>
          </Col>

          <Col md={3} className="mb-4">
            <h6 className="footer-heading">Support</h6>
            <Link to="/help" className="footer-link">
              Help Center
            </Link>
            <Link to="/contact" className="footer-link">
              Contact Us
            </Link>
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer-link">
              Terms of Service
            </Link>
          </Col>

          <Col md={3} className="mb-4">
            <h6 className="footer-heading">Follow Us</h6>
            <div className="social-icons">
              <i className="bi bi-facebook social-icon"></i>
              <i className="bi bi-twitter social-icon"></i>
              <i className="bi bi-instagram social-icon"></i>
              <i className="bi bi-youtube social-icon"></i>
            </div>
          </Col>
        </Row>

        <div className="footer-copyright">
          © 2024 CineMax. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
