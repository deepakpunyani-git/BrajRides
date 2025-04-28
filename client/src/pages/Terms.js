import React from 'react';
import { Container } from 'react-bootstrap';

const Terms = () => (
  <Container className="my-5 section">
    <h2 className="section-heading text-center mb-4">Terms & Conditions</h2>

    <p>
      By using Braj Rides, you agree to the following terms. Please read them carefully.
    </p>

    <h4 className="mt-4">Eligibility</h4>
    <ul>
      <li>Renter must be 18 years or older.</li>
      <li>A valid driving license is required to rent any vehicle.</li>
    </ul>

    <h4 className="mt-4">Rental Policy</h4>
    <ul>
      <li>Full rental amount must be paid in advance.</li>
      <li>Bikes must be returned in the same condition as issued.</li>
      <li>Delay in return will incur additional charges.</li>
    </ul>

    <h4 className="mt-4">Damage and Liability</h4>
    <ul>
      <li>Customer is liable for any damages incurred during the ride.</li>
      <li>Loss of helmet or key will be charged.</li>
      <li>In case of accident, proper documentation must be submitted.</li>
    </ul>

    <p className="mt-4">
      These terms are subject to change without prior notice. Continued usage of our services implies acceptance of the updated terms.
    </p>
  </Container>
);

export default Terms;
