import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCheckCircle, faExclamationTriangle, faChartLine } from '@fortawesome/free-solid-svg-icons';
import AppNavbar from '../common/Navbar';
import { useAuth } from '../../context/AuthContext';
import '../../assets/css/dashboard.css';

function gradeVariant(n){
  return n >= 80 ? 'success' : n >= 70 ? 'info' : n >= 60 ? 'warning' : 'danger';
}

const StudentDashboard = () => {
  const { currentUser, getStudentProfile } = useAuth();
  const profile = currentUser ? getStudentProfile(currentUser.id) : null;
  return (
    <>
      <AppNavbar />
      <Container className="dashboard-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Student Dashboard</h2>
          <div>
            <h5>Welcome, {currentUser?.name || 'Student'}</h5>
          </div>
        </div>
        
        {/* Progress Overview */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle text-muted">Overall Progress</h6>
                    <h2 className="mt-2 mb-0">{profile?.overallProgress ?? 0}%</h2>
                  </div>
                  <div className="icon-container bg-primary">
                    <FontAwesomeIcon icon={faChartLine} className="fa-lg text-white" />
                  </div>
                </div>
                <ProgressBar 
                  now={profile?.overallProgress ?? 0} 
                  variant={(profile?.overallProgress ?? 0) >= 80 ? 'success' : (profile?.overallProgress ?? 0) >= 60 ? 'info' : 'warning'} 
                  className="mt-3" 
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle text-muted">Completed Assessments</h6>
                    <h2 className="mt-2 mb-0">{profile?.completedAssessments ?? 0}</h2>
                  </div>
                  <div className="icon-container bg-success">
                    <FontAwesomeIcon icon={faCheckCircle} className="fa-lg text-white" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle text-muted">Pending Assessments</h6>
                    <h2 className="mt-2 mb-0">{profile?.pendingAssessments ?? 0}</h2>
                  </div>
                  <div className="icon-container bg-warning">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="fa-lg text-white" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-subtitle text-muted">Total Subjects</h6>
                    <h2 className="mt-2 mb-0">{profile?.subjects?.length ?? 0}</h2>
                  </div>
                  <div className="icon-container bg-info">
                    <FontAwesomeIcon icon={faBook} className="fa-lg text-white" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Subject Progress */}
        <Row className="mb-4">
          <Col md={8}>
            <Card>
              <Card.Header className="bg-white">
                <h5 className="mb-0">Subject Progress</h5>
              </Card.Header>
              <Card.Body>
                {(profile?.subjects ?? []).map((subject, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6>{subject.name}</h6>
                      <div>
                        <Badge bg={gradeVariant(subject.progress)} className="me-2">
                          {subject.grade}
                        </Badge>
                        <span>{subject.progress}%</span>
                      </div>
                    </div>
                    <ProgressBar 
                      now={subject.progress} 
                      variant={gradeVariant(subject.progress)} 
                    />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100">
              <Card.Header className="bg-white">
                <h5 className="mb-0">Recent Feedback</h5>
              </Card.Header>
              <Card.Body>
                {(profile?.recentFeedback ?? []).map(feedback => (
                  <div key={feedback.id} className="feedback-item mb-3 pb-3 border-bottom">
                    <h6>{feedback.subject}</h6>
                    <p className="mb-1">{feedback.message}</p>
                    <small className="text-muted">{feedback.date}</small>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Upcoming Assessments */}
        <Card>
          <Card.Header className="bg-white">
            <h5 className="mb-0">Upcoming Assessments</h5>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {(profile?.upcomingAssessments ?? []).map(assessment => (
                    <tr key={assessment.id}>
                      <td>{assessment.title}</td>
                      <td>{assessment.subject}</td>
                      <td>{assessment.dueDate}</td>
                      <td>
                        <Badge bg={assessment.importance === 'high' ? 'danger' : assessment.importance === 'medium' ? 'warning' : 'success'}>
                          {assessment.importance.charAt(0).toUpperCase() + assessment.importance.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default StudentDashboard;
