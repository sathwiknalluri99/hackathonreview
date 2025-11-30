import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/auth.css';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' // Default role
  });
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const { email, password, role } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
    setCaptcha(out);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    if (!captchaInput || captchaInput.toUpperCase() !== captcha) {
      setError('Invalid CAPTCHA. Please try again.');
      generateCaptcha();
      return;
    }
    try {
      const user = login({ email, password, role });
      const roleToUse = user.role === 'teacher' ? 'teacher' : 'student';
      navigate(roleToUse === 'teacher' ? '/admin/dashboard' : '/student/dashboard');
    } catch (e) {
      setError(e.message || 'Login failed');
    }
  };

  return (
    <Container fluid className="auth-container">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Card className="shadow-lg auth-card">
            <Card.Body>
              <h2 className="text-center mb-4">Student Learning Platform</h2>
              <h4 className="text-center mb-4">Login</h4>
              <div className="text-center mb-3">Welcome, {email ? email.split('@')[0] : 'Guest'}</div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Login As</Form.Label>
                  <Form.Select 
                    name="role" 
                    value={role} 
                    onChange={onChange}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>CAPTCHA Verification</Form.Label>
                  <div className="captcha-container d-flex align-items-center mb-2">
                    <div className="captcha-box me-2" aria-label="CAPTCHA Code">{captcha}</div>
                    <Button variant="outline-secondary" size="sm" onClick={generateCaptcha}>Refresh</Button>
                  </div>
                  <Form.Control
                    type="text"
                    placeholder="Enter the characters shown above"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Login
                </Button>
                <div className="text-center mt-3">
                  <p>
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
