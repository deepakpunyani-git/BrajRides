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
            <p>Phone: <a href="tel:1234567890">+91 1234 567 890</a></p>
            <p>Email: <a href="mailto:info@brajrides.com">info@brajrides.com</a></p>
            <p>Address: Braj Rides Head Office, 123 Main Street, Mathura, Uttar Pradesh, India</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
          <p className="footer-copyright">
  © {new Date().getFullYear()} brajRides. All rights reserved.
</p>          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
