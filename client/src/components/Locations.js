import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Locations.css';


const Locations = ({ locations }) => {

  return (
    <section className="locations-section">
      <Container>
        <h2 className="section-heading text-center mb-4">Our Locations</h2>
        <Row>
        {locations.map((loc) => (
          <Col md={6}>
              <div key={loc.id} className="location-card">
                <h4>{loc.name}</h4>
                <p>{loc.address}</p>
                <p>Phone: {loc.phone}</p>
                <p>Email: <a href={`mailto:${loc.email}`}>{loc.email}</a></p>
              </div>
              </Col>

            ))}          
        </Row>
      </Container>
    </section>
  );
};

export default Locations;
