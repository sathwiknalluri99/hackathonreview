import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faReply, faStar } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../common/Navbar';
import '../../assets/css/dashboard.css';
import { useAuth } from '../../context/AuthContext';

const Feedback = () => {
  const { users } = useAuth();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
  const teacherNames = useMemo(() => {
    const ts = users.filter(u => u.role === 'teacher').map(u => u.name || 'Teacher');
    if (ts.length > 0) return ts;
    return ['Dr. Johnson', 'Prof. Smith', 'Ms. Davis', 'Dr. Wilson'];
  }, [users]);

  const seedPick = (index) => teacherNames[index % teacherNames.length];

  const [feedbacks, setFeedbacks] = useState([
    { id: 1, assessment: 'Midterm Exam', subject: 'Mathematics', date: `${currentYear}-${currentMonth}-18`, teacher: seedPick(0), comment: 'Good work on the calculus problems. Need improvement in trigonometry.', rating: 4 },
    { id: 2, assessment: 'Quiz 3', subject: 'Physics', date: `${currentYear}-${currentMonth}-08`, teacher: seedPick(1), comment: 'Excellent understanding of mechanics concepts. Keep it up!', rating: 5 },
    { id: 3, assessment: 'Term Paper', subject: 'English Literature', date: `${currentYear}-${currentMonth}-02`, teacher: seedPick(2), comment: 'Well-structured essay. Work on citation format for next time.', rating: 4 },
    { id: 4, assessment: 'Weekly Test', subject: 'Biology', date: `${currentYear}-${currentMonth}-30`, teacher: seedPick(3), comment: 'Good grasp of cellular biology. Review genetics chapter.', rating: 3 },
  ]);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [reply, setReply] = useState('');

  // Handle reply to feedback
  const handleReply = (feedback) => {
    setCurrentFeedback(feedback);
    setReply('');
    setShowModal(true);
  };

  // Handle submit reply
  const handleSubmitReply = () => {
    alert(`Reply submitted: "${reply}"`);
    if (currentFeedback) {
      setFeedbacks(prev => prev.map(f => f.id === currentFeedback.id ? { ...f, replied: true } : f));
    }
    setShowModal(false);
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={i} 
          icon={faStar} 
          className={i < rating ? 'text-warning' : 'text-muted'} 
        />
      );
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <Container fluid className="dashboard-container mt-4">
        <Row className="mb-4">
          <Col>
            <h2 className="page-title">Feedback & Comments</h2>
            <p className="text-muted">View feedback from your teachers on your assessments</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="dashboard-card mb-4">
              <Card.Body>
                <h5 className="card-title">Total Feedback</h5>
                <h2 className="card-value">{feedbacks.length}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card mb-4">
              <Card.Body>
                <h5 className="card-title">Average Rating</h5>
                <h2 className="card-value text-warning">
                  {(feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1)}
                  <small className="ms-2">/5</small>
                </h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card mb-4">
              <Card.Body>
                <h5 className="card-title">Recent Feedback</h5>
                <h2 className="card-value text-primary">
                  {new Date(Math.max(...feedbacks.map(f => new Date(f.date)))).toLocaleDateString()}
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
                  <th>Assessment</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Teacher</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map(feedback => (
                  <tr key={feedback.id}>
                    <td>{feedback.assessment}</td>
                    <td>{feedback.subject}</td>
                    <td>{feedback.date}</td>
                    <td>{feedback.teacher}</td>
                    <td>
                      <div className="rating">
                        {renderStars(feedback.rating)}
                      </div>
                    </td>
                    <td>{feedback.comment}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => handleReply(feedback)}
                      >
                        <FontAwesomeIcon icon={faReply} className="me-1" />
                        Reply
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Row className="mb-4">
          <Col>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="card-title">Request Feedback</h5>
                <p>If you need additional feedback on any assessment, you can request it from your teacher.</p>
                <Form>
                  <Row>
                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label>Select Assessment</Form.Label>
                        <Form.Select>
                          <option>Midterm Exam - Mathematics</option>
                          <option>Quiz 3 - Physics</option>
                          <option>Term Paper - English Literature</option>
                          <option>Weekly Test - Biology</option>
                          <option>Programming Assignment - Computer Science</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label>Message (Optional)</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Specific areas you need feedback on..."
                        />
                      </Form.Group>
                    </Col>
                    <Col md={2} className="d-flex align-items-end">
                      <Button variant="primary" className="mb-3 w-100">
                        <FontAwesomeIcon icon={faComment} className="me-2" />
                        Request
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for replying to feedback */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentFeedback && (
            <>
              <div className="mb-4">
                <h6>Original Feedback:</h6>
                <p className="feedback-text p-3 bg-light rounded">
                  <em>"{currentFeedback.comment}"</em>
                </p>
                <p className="text-muted">
                  From: {currentFeedback.teacher} | {currentFeedback.assessment} - {currentFeedback.subject}
                </p>
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Your Reply:</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your response here..."
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
            onClick={handleSubmitReply}
            disabled={!reply.trim()}
          >
            Send Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Feedback;
