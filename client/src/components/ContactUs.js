import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    console.log(formData);
  };

  const headOfficeAddress = "Braj Rides Head Office, 123 Main Street, Mathura, Uttar Pradesh, India";

  return (
    <Container className="contact-us-section section" >
      <h2 className="section-heading text-center my-4 pt-4
      ">Contact Us</h2>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button className='ride-now-btn mt-2' variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <div className="contact-info">
            <h4>Head Office Address</h4>
            <p>{headOfficeAddress}</p>
            <p>Phone: <a href="tel:+1234567890">+1 234 567 890</a></p>
            <p>Email: <a href="mailto:info@brajrides.com">info@brajrides.com</a></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
