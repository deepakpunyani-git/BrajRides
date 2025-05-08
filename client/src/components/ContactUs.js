import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ContactUs.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ContactUs = () => {
  const headOfficeAddress = "Braj Rides Head Office, 123 Main Street, Mathura, Uttar Pradesh, India";
  const googleMapLink = "https://www.google.com/maps?q=123+Main+Street,Mathura,Uttar+Pradesh,India";

  return (
    <Container className="contact-us-section section">
      <h2 className="section-heading text-center my-4 pt-4">Contact Us</h2>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="contact-info text-center">
            <h4><i className="bi bi-geo-alt-fill me-2"></i>Head Office Address</h4>
            <p>
              <a href={googleMapLink} target="_blank" rel="noopener noreferrer">
                <i className="bi bi-geo-alt me-1"></i>{headOfficeAddress}
              </a>
            </p>

            <p>
              <i className="bi bi-telephone-fill me-2"></i>
              <a href="tel:1234567890">+91 1234 567 890</a>
            </p>

            <p>
              <i className="bi bi-envelope-fill me-2"></i>
              <a href="mailto:info@brajrides.com">info@brajrides.com</a>
            </p>

            <div className="social-links mt-4">
              <a href="https://facebook.com/brajrides" target="_blank" rel="noopener noreferrer" className="me-3">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://instagram.com/brajrides" target="_blank" rel="noopener noreferrer" className="me-3">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://twitter.com/brajrides" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter-x fs-4"></i>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
