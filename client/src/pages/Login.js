import React, { useState , useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Toast, ToastContainer ,  InputGroup  } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from '../redux/actions/authActions';
import loginImage from '../assets/login-image.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [phone, setPhone] = useState();
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false); 
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
    useEffect(() => {
        if (isAuthenticated) {
          const redirectPath = localStorage.getItem('redirectAfterLogin');
          if (redirectPath) {
            localStorage.removeItem('redirectAfterLogin');
            navigate(redirectPath);
          } else {
            navigate('/');
          }
        }
      }, [isAuthenticated, navigate]);

    const isValidPhone = (number) => /^[6-9]\d{9}$/.test(number);



    const handlePhoneSubmit = (e) => {
        e.preventDefault();
          toast.dismiss();

        if (!isValidPhone(phone)) {
            toast.error('Please enter a valid 10-digit phone number starting with 6-9');
            return;
        }

        dispatch(sendOtp(phone)).then((success) => {
            if (success) {
                setIsOtpSent(true);
                    toast.success('OTP sent successfully!');
                
            } else {
                toast.error('Failed to send OTP');
            }
        });
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyOtp(phone, otp));
    };

    return (
        <Container className="login-container d-flex justify-content-center align-items-center my-5">
            <Row className="login-row shadow-lg">
                <Col md={6} className="p-0">
                    <img src={loginImage} alt="Login" className="login-image w-100 h-100" />
                </Col>
                <Col md={6} className="p-5 d-flex flex-column justify-content-center">
                    <Card className="border-0">
                        <Card.Body>
                            <h2 className="text-center mb-4">Login with OTP</h2>
                            {!isOtpSent ? (
                                <Form onSubmit={handlePhoneSubmit}>
                                    <Form.Group controlId="formPhone">
                                        <Form.Label>Phone Number</Form.Label>
                                                                                <InputGroup>

                                                                                    <InputGroup.Text>+91</InputGroup.Text>

                                        <Form.Control
                                            type="tel"
                                            placeholder="Enter your phone number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                                maxLength="10"
                                            
                                        />
                                                                                </InputGroup>

                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading}>
                                        {loading ? 'Sending OTP...' : 'Send OTP'}
                                    </Button>
                                </Form>
                            ) : (
                                <Form onSubmit={handleOtpSubmit}>
                                    <Form.Group controlId="formOtp">
                                        <Form.Label>Enter OTP</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="XXXXXX"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <a
    variant="outline-secondary"
    className="w-100 mt-3 bk-2-ph"
    onClick={() => setIsOtpSent(false)}
>
    ← Back to Phone Number
</a>
                                    <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading}>
                                        {loading ? 'Verifying...' : 'Verify OTP'}
                                    </Button>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </Container>
    );
};

export default Login;
