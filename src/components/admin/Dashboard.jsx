import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClipboardList, faChartLine, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AppNavbar from '../common/Navbar';
import { useAuth } from '../../context/AuthContext';
import '../../assets/css/dashboard.css';

// Mock data for dashboard stats (excluding dynamic counts)
const stats = {
  assessmentsCreated: 45,
  averageScore: 78,
  pendingFeedback: 12
};

// Mock data for recent assessments
const recentAssessments = [
  { id: 1, title: 'Midterm Exam', subject: 'Mathematics', date: '2023-10-15', averageScore: 76 },
  { id: 2, title: 'Quiz 3', subject: 'Science', date: '2023-10-10', averageScore: 82 },
  { id: 3, title: 'Project Submission', subject: 'Computer Science', date: '2023-10-05', averageScore: 88 }
];

const AdminDashboard = () => {
  const { currentUser, users } = useAuth();
  const totalStudents = users.filter(u => u.role === 'student').length;
  return (
    <>
      <AppNavbar />
      <Container className="dashboard-container">
        <h2 className="mb-4">Teacher Dashboard</h2>
        <div className="mb-3">
          <h5>Welcome, {currentUser?.name || 'Teacher'}</h5>
        </div>
        
        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle text-muted">Total Students</h6>
                    <h2 className="mt-2 mb-0">{totalStudents}</h2>
                  </div>
                  <div className="icon-container bg-primary">
                    <FontAwesomeIcon icon={faUsers} className="fa-lg text-white" />
                  </div>
                </div>
                <Link to="/admin/students" className="stretched-link"></Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle text-muted">Assessments Created</h6>
                    <h2 className="mt-2 mb-0">{stats.assessmentsCreated}</h2>
                  </div>
                  <div className="icon-container bg-success">
                    <FontAwesomeIcon icon={faClipboardList} className="fa-lg text-white" />
                  </div>
                </div>
                <Link to="/admin/assessments" className="stretched-link"></Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle text-muted">Average Score</h6>
                    <h2 className="mt-2 mb-0">{stats.averageScore}%</h2>
                  </div>
                  <div className="icon-container bg-info">
                    <FontAwesomeIcon icon={faChartLine} className="fa-lg text-white" />
                  </div>
                </div>
                <Link to="/admin/reports" className="stretched-link"></Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle text-muted">Pending Feedback</h6>
                    <h2 className="mt-2 mb-0">{stats.pendingFeedback}</h2>
                  </div>
                  <div className="icon-container bg-warning">
                    <FontAwesomeIcon icon={faFileAlt} className="fa-lg text-white" />
                  </div>
                </div>
                <Link to="/admin/feedback" className="stretched-link"></Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Recent Assessments */}
        <Card className="mb-4">
          <Card.Header className="bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Assessments</h5>
              <Button variant="primary" size="sm" as={Link} to="/admin/create-assessment">
                Create New Assessment
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Average Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAssessments.map(assessment => (
                    <tr key={assessment.id}>
                      <td>{assessment.title}</td>
                      <td>{assessment.subject}</td>
                      <td>{assessment.date}</td>
                      <td>
                        <span className={`badge ${assessment.averageScore >= 80 ? 'bg-success' : assessment.averageScore >= 70 ? 'bg-warning' : 'bg-danger'}`}>
                          {assessment.averageScore}%
                        </span>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-2">
                          View Details
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
        
        {/* Quick Actions */}
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header className="bg-white">
                <h5 className="mb-0">Quick Actions</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex flex-wrap gap-2">
                  <Button variant="primary" as={Link} to="/admin/add-student">
                    Add New Student
                  </Button>
                  <Button variant="success" as={Link} to="/admin/create-assessment">
                    Create Assessment
                  </Button>
                  <Button variant="info" as={Link} to="/admin/generate-reports">
                    Generate Reports
                  </Button>
                  <Button variant="warning" as={Link} to="/admin/review-feedback">
                    Review Feedback
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
