import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container className="about-us-section my-5 section">
      <h2 className="section-heading text-center mb-4">About Us</h2>

      {/* Mission Section */}
      <Row className="mb-5">
        <Col md={12}>
          <h3>Our Mission</h3>
          <p>
            Our mission is to make your spontaneous trips easy and affordable. We want you to ditch the tour guides and unkept promises to travel whenever you feel like you need a break. At Braj Rides, you will rediscover the joy of travelling as we bring you the best handpicked and carefully curated tours, activities, and attractions in and around your city.
          </p>
        </Col>
      </Row>

      {/* Vision Section */}
      <Row className="mb-5">
        <Col md={12}>
          <h3>Our Vision</h3>
          <p>
            To be the leading bike rental service in India, enabling people to explore their surroundings in a hassle-free and enjoyable way. We aim to promote eco-friendly transportation and encourage a culture of exploration and adventure.
          </p>
        </Col>
      </Row>

      {/* Values Section */}
      <Row className="mb-5">
        <Col md={12}>
          <h3>Our Values</h3>
          <ul>
            <li>Integrity: We believe in honest and transparent dealings with our customers.</li>
            <li>Customer Satisfaction: Our customers are our top priority, and we strive to exceed their expectations.</li>
            <li>Innovation: We constantly seek new ways to improve our services and provide a better experience.</li>
            <li>Sustainability: We promote eco-friendly practices and contribute to environmental conservation.</li>
          </ul>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="mb-5">
        <Col md={12}>
          <h3>Meet Our Team</h3>
          <p>
            Our dedicated team consists of passionate individuals who share a love for travel and adventure. Together, we work hard to ensure that every experience with Braj Rides is memorable.
          </p>
          <Row>
            <Col md={4}>
              <div className="team-member">
                <img src={`${process.env.PUBLIC_URL}/team-member-1.jpg`} alt="Ramandeep" className="img-fluid" />
                <h5>Ramandeep</h5>
                <p>Founder & CEO</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="team-member">
                <img src={`${process.env.PUBLIC_URL}/team-member-2.jpg`} alt="Jane Smith" className="img-fluid" />
                <h5>Jane Smith</h5>
                <p>Operations Manager</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="team-member">
                <img src={`${process.env.PUBLIC_URL}/team-member-3.jpg`} alt="Emily Johnson" className="img-fluid" />
                <h5>Emily Johnson</h5>
                <p>Marketing Head</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Conclusion Section */}
      <Row>
        <Col md={12}>
          <h3>Join Us</h3>
          <p>
            We invite you to join us on this exciting journey. Explore the beauty of your surroundings, create unforgettable memories, and enjoy the freedom that comes with our bike rentals. Let’s ride together!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
