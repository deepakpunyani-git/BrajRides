import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'; 
import { logout as logoutUser } from '../redux/actions/authActions';
import './Header.css';

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 50;
    setScrolling(isScrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Navbar
      bg={scrolling ? 'light' : 'white'}
      expand="lg"
      className={`py-3 header-navbar ${scrolling ? 'scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center mx-auto">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="BrajRides Logo"
          />
          <div className="ms-2">BrajRides</div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/" className={isActive('/') ? 'active' : ''}>
              <Button variant="link">HOME</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/about-us" className={isActive('/about-us') ? 'active' : ''}>
              <Button variant="link">ABOUT US</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/pricing" className={isActive('/pricing') ? 'active' : ''}>
              <Button variant="link">PRICING</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/locations" className={isActive('/locations') ? 'active' : ''}>
              <Button variant="link">LOCATIONS</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/contactUs" className={isActive('/contactUs') ? 'active' : ''}>
              <Button variant="link">CONTACT US</Button>
            </Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/account" className={isActive('/account') ? 'active' : ''}>
                  <Button variant="outline-primary">ACCOUNT</Button>
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <Button variant="danger">LOGOUT</Button>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className={isActive('/login') ? 'active' : ''}>
                <Button variant="primary" className="ride-now-btn">LOGIN/SIGNUP</Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
