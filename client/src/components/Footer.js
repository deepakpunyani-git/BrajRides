import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="footer-section py-4">
      <Container>
        <Row>
          <Col md={4} className="footer-col">
            <h5>About brajRides</h5>
            <p>brajRides provides long-term and short-term rentals for individuals and businesses across multiple cities.</p>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/" onClick={handleScrollToTop}>Home</Link></li>
              <li><Link to="/safety" onClick={handleScrollToTop}>Safety</Link></li>
              <li><Link to="/partner" onClick={handleScrollToTop}>Partner</Link></li>
              <li><Link to="/privacy" onClick={handleScrollToTop}>Privacy</Link></li>
              <li><Link to="/terms" onClick={handleScrollToTop}>Terms and Conditions</Link></li>
            </ul>
          </Col>
          <Col md={4} className="footer-col">
            <h5>Contact Us</h5>
            <p>Phone: +91843780780</p>
            <p>Email: support@brajrides.com</p>
            <p>Address: 123 Street Name, City, Country</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="footer-copyright">© 2024 brajRides. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
