import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';

const AppNavbar = ({ userRole }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to={(userRole ?? currentUser?.role) === 'teacher' ? '/admin/dashboard' : '/student/dashboard'}>
          <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
          Student Learning Platform
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {(userRole ?? currentUser?.role) === 'teacher' ? (
              <>
                <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/admin/students">Students</Nav.Link>
                <Nav.Link as={Link} to="/admin/assessments">Assessments</Nav.Link>
                <Nav.Link as={Link} to="/admin/reports">Reports</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/student/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/student/assessments">My Assessments</Nav.Link>
                <Nav.Link as={Link} to="/student/progress">My Progress</Nav.Link>
                <Nav.Link as={Link} to="/student/feedback">Feedback</Nav.Link>
              </>
            )}
            <Button 
              variant="outline-light" 
              className="ms-2" 
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Logout{currentUser ? ` (${currentUser.name})` : ''}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
