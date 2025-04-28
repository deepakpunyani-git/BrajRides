import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../redux/actions/locationActions";
import { Container, Row, Col } from "react-bootstrap";

const Locations = () => {
  const dispatch = useDispatch();
  const { locations = [] } = useSelector((state) => state.locations || {});

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <section className="locations-section section">
      <Container>
        <h2 className="section-heading text-center mb-4">Our Locations</h2>

        <Row>
          {locations.map((loc) => (
            <Col md={6} key={loc.id || loc._id} className="location-card mb-4">
              <h4>{loc.name}</h4>
              <p>{loc.address}</p>
              <p><strong>Phone:</strong> {loc.phone}</p>
              <p><strong>Email:</strong> <a href={`mailto:${loc.email}`}>{loc.email}</a></p>
              <iframe
                src={loc.mapLink}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title={loc.name}
              ></iframe>
            </Col>
          ))}
        </Row>

        <div className="contact-info text-center mt-5">
          <h4>Contact Us</h4>
          <p>Phone: <a href="tel:+1234567890">+1 234 567 890</a></p>
          <p>Email: <a href="mailto:info@brajrides.com">info@brajrides.com</a></p>
        </div>
      </Container>
    </section>
  );
};

export default Locations;
