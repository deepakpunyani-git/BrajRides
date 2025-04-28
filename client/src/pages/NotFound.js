import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center py-5">
      <h1 className="display-3 text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="mb-4">Sorry, the page you're looking for doesn't exist.</p>
      <Button onClick={() => navigate('/')} variant="primary">Go Home</Button>
    </Container>
  );
};

export default NotFound;
