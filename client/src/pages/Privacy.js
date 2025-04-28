import React from 'react';
import { Container } from 'react-bootstrap';

const Privacy = () => (
  <Container className="my-5 section">
    <h2 className="section-heading text-center mb-4">Privacy Policy</h2>

    <p>
      We value your trust. This Privacy Policy outlines how Braj Rides collects, uses, and protects your personal information.
    </p>

    <h4 className="mt-4">What We Collect</h4>
    <ul>
      <li>Name, email address, and contact information.</li>
      <li>Location data for nearby rentals.</li>
      <li>Riding history and payment details (secured).</li>
      <li>Feedback and support requests.</li>
    </ul>

    <h4 className="mt-4">How We Use Your Data</h4>
    <ul>
      <li>To process bookings and payments.</li>
      <li>To personalize your rental experience.</li>
      <li>To improve services and offer relevant promotions.</li>
    </ul>

    <h4 className="mt-4">Your Rights</h4>
    <ul>
      <li>You may access, edit, or delete your account info at any time.</li>
      <li>Your data will never be sold or shared without consent.</li>
      <li>You may opt-out of marketing communication anytime.</li>
    </ul>

    <p className="mt-4">
      For any privacy-related concerns, contact us at <strong>privacy@brajrides.com</strong>.
    </p>
  </Container>
);

export default Privacy;
