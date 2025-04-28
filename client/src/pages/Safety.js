import React from 'react';
import { Container } from 'react-bootstrap';

const Safety = () => (
  <Container className="my-5 section">
    <h2 className="section-heading text-center mb-4">Safety Guidelines</h2>

    <p>
      Your safety is our topmost priority at Braj Rides. We take extensive measures to ensure every ride is secure and worry-free.
    </p>

    <h4 className="mt-4">What We Do</h4>
    <ul>
      <li><strong>Sanitization:</strong> Every vehicle is cleaned and sanitized after each ride.</li>
      <li><strong>Helmet Provided:</strong> A quality helmet is provided with every rental.</li>
      <li><strong>Routine Maintenance:</strong> Bikes undergo regular servicing and health checks.</li>
      <li><strong>Emergency Assistance:</strong> On-road support available 24/7 in case of breakdown.</li>
    </ul>

    <h4 className="mt-4">What You Can Do</h4>
    <ul>
      <li>Wear helmets at all times while riding.</li>
      <li>Follow all traffic laws and speed limits.</li>
      <li>Avoid using phones or headphones while driving.</li>
      <li>Report any unusual sounds or issues with the bike.</li>
    </ul>

    <p className="mt-4">
      Ride responsibly and enjoy your experience with peace of mind. Your safety is our mission.
    </p>
  </Container>
);

export default Safety;
