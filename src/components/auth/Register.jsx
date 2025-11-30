import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/auth.css';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const { name, email, password, confirmPassword, role } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      register({ name, email, password, role: role === 'teacher' ? 'teacher' : 'student' });
      navigate('/login');
    } catch (e) {
      setError(e.message || 'Registration failed');
    }
  };

  return (
    <Container fluid className="auth-container">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Card className="shadow-lg auth-card">
            <Card.Body>
              <h2 className="text-center mb-4">Student Learning Platform</h2>
              <h4 className="text-center mb-4">Register</h4>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
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
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Register As</Form.Label>
                  <Form.Select 
                    name="role" 
                    value={role} 
                    onChange={onChange}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Register
                </Button>
                <div className="text-center mt-3">
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
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

export default Register;
