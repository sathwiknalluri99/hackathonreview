import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCheck, faClock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../common/Navbar';
import '../../assets/css/dashboard.css';

const StudentAssessments = () => {
  // Sample assessment data
  const [assessments, setAssessments] = useState([
    { id: 1, title: 'Midterm Exam', subject: 'Mathematics', dueDate: '2023-10-15', totalMarks: 100, status: 'Pending', score: null },
    { id: 2, title: 'Quiz 3', subject: 'Physics', dueDate: '2023-10-05', totalMarks: 50, status: 'Completed', score: 42 },
    { id: 3, title: 'Term Paper', subject: 'English Literature', dueDate: '2023-10-30', totalMarks: 100, status: 'Pending', score: null },
    { id: 4, title: 'Weekly Test', subject: 'Biology', dueDate: '2023-09-28', totalMarks: 30, status: 'Completed', score: 25 },
    { id: 5, title: 'Programming Assignment', subject: 'Computer Science', dueDate: '2023-10-10', totalMarks: 50, status: 'Overdue', score: null },
  ]);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [answers, setAnswers] = useState('');

  // Handle view assessment
  const handleViewAssessment = (assessment) => {
    setCurrentAssessment(assessment);
    setAnswers('');
    setShowModal(true);
  };

  // Handle submit assessment
  const handleSubmitAssessment = () => {
    setAssessments(assessments.map(assessment => {
      if (assessment.id === currentAssessment.id) {
        // Simulate a random score between 70-95% of total marks
        const randomScore = Math.floor(Math.random() * (assessment.totalMarks * 0.25) + assessment.totalMarks * 0.7);
        return { ...assessment, status: 'Completed', score: randomScore };
      }
      return assessment;
    }));
    setShowModal(false);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge bg="success"><FontAwesomeIcon icon={faCheck} className="me-1" /> {status}</Badge>;
      case 'Pending':
        return <Badge bg="warning"><FontAwesomeIcon icon={faClock} className="me-1" /> {status}</Badge>;
      case 'Overdue':
        return <Badge bg="danger"><FontAwesomeIcon icon={faExclamationTriangle} className="me-1" /> {status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <Navbar />
      <Container fluid className="dashboard-container mt-4">
        <Row className="mb-4">
          <Col>
            <h2 className="page-title">My Assessments</h2>
            <p className="text-muted">View and complete your assigned assessments</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="dashboard-card mb-4">
              <Card.Body>
                <h5 className="card-title">Pending</h5>
                <h2 className="card-value text-warning">
                  {assessments.filter(a => a.status === 'Pending').length}
                </h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card mb-4">
              <Card.Body>
                <h5 className="card-title">Completed</h5>
                <h2 className="card-value text-success">
                  {assessments.filter(a => a.status === 'Completed').length}
                </h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card mb-4">
              <Card.Body>
                <h5 className="card-title">Overdue</h5>
                <h2 className="card-value text-danger">
                  {assessments.filter(a => a.status === 'Overdue').length}
                </h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="mb-4">
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Due Date</th>
                  <th>Total Marks</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map(assessment => (
                  <tr key={assessment.id}>
                    <td>{assessment.title}</td>
                    <td>{assessment.subject}</td>
                    <td>{assessment.dueDate}</td>
                    <td>{assessment.totalMarks}</td>
                    <td>{getStatusBadge(assessment.status)}</td>
                    <td>{assessment.score !== null ? `${assessment.score}/${assessment.totalMarks}` : '-'}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => handleViewAssessment(assessment)}
                        disabled={assessment.status === 'Completed'}
                      >
                        <FontAwesomeIcon icon={faEye} className="me-1" />
                        {assessment.status === 'Completed' ? 'Submitted' : 'Take Assessment'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      {/* Modal for viewing/taking assessment */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentAssessment?.title} - {currentAssessment?.subject}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentAssessment && (
            <>
              <div className="mb-4">
                <h5>Assessment Details</h5>
                <p><strong>Due Date:</strong> {currentAssessment.dueDate}</p>
                <p><strong>Total Marks:</strong> {currentAssessment.totalMarks}</p>
                <p><strong>Status:</strong> {currentAssessment.status}</p>
              </div>
              
              <div className="mb-4">
                <h5>Instructions</h5>
                <p>Please read all questions carefully before answering. You have one attempt to complete this assessment.</p>
                <p>Time limit: 60 minutes from the time you start.</p>
              </div>

              <div className="mb-4">
                <h5>Questions</h5>
                <ol>
                  <li className="mb-3">
                    <p>What are the key concepts covered in the recent lectures? Explain with examples.</p>
                  </li>
                  <li className="mb-3">
                    <p>Solve the following problem and show your work.</p>
                  </li>
                  <li className="mb-3">
                    <p>Compare and contrast the approaches discussed in class.</p>
                  </li>
                </ol>
              </div>

              <Form.Group className="mb-3">
                <Form.Label><strong>Your Answers</strong></Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={6} 
                  placeholder="Type your answers here..."
                  value={answers}
                  onChange={(e) => setAnswers(e.target.value)}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmitAssessment}
            disabled={!answers.trim()}
          >
            Submit Assessment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentAssessments;
