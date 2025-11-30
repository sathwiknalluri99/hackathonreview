import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';

const ReviewFeedback = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock feedback data
  const initialFeedback = [
    {
      id: 1,
      studentName: 'John Smith',
      assessmentName: 'Math Quiz 1',
      date: '2023-05-10',
      content: 'The questions were too difficult and not related to what we learned in class.',
      status: 'pending',
      response: ''
    },
    {
      id: 2,
      studentName: 'Emma Johnson',
      assessmentName: 'Science Test',
      date: '2023-05-12',
      content: 'I think there was an error in question 5. The formula provided doesn\'t match what we learned.',
      status: 'responded',
      response: 'Thank you for pointing this out. You\'re right, there was a typo in the formula. We\'ll adjust the grading accordingly.'
    },
    {
      id: 3,
      studentName: 'Michael Brown',
      assessmentName: 'History Essay',
      date: '2023-05-15',
      content: 'I would appreciate more detailed feedback on my essay structure.',
      status: 'pending',
      response: ''
    },
    {
      id: 4,
      studentName: 'Sophia Garcia',
      assessmentName: 'English Literature Quiz',
      date: '2023-05-18',
      content: 'The time allocated for the quiz was insufficient to answer all questions thoroughly.',
      status: 'pending',
      response: ''
    }
  ];

  const [feedbackItems, setFeedbackItems] = useState(initialFeedback);

  const handleViewResponse = (feedback) => {
    setSelectedFeedback(feedback);
    setResponse(feedback.response || '');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFeedback(null);
    setResponse('');
    setShowSuccessMessage(false);
  };

  const handleSubmitResponse = () => {
    if (selectedFeedback) {
      // Update the feedback item with the response
      const updatedFeedbackItems = feedbackItems.map(item => {
        if (item.id === selectedFeedback.id) {
          return {
            ...item,
            status: 'responded',
            response: response
          };
        }
        return item;
      });

      setFeedbackItems(updatedFeedbackItems);
      setShowSuccessMessage(true);

      // Close modal after a delay
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-4 mb-5">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2>Review Student Feedback</h2>
                <p className="text-muted">Manage and respond to student feedback on assessments</p>
              </div>
              <Button variant="outline-primary" as={Link} to="/admin/dashboard">
                Back to Dashboard
              </Button>
            </div>
          </Col>
        </Row>

        <Card className="shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-3">Feedback Items</h5>
            <Table responsive hover>
              <thead className="bg-light">
                <tr>
                  <th>Student</th>
                  <th>Assessment</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbackItems.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.studentName}</td>
                    <td>{feedback.assessmentName}</td>
                    <td>{feedback.date}</td>
                    <td>
                      {feedback.status === 'pending' ? (
                        <Badge bg="warning" text="dark">Pending</Badge>
                      ) : (
                        <Badge bg="success">Responded</Badge>
                      )}
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => handleViewResponse(feedback)}
                      >
                        {feedback.status === 'pending' ? 'Respond' : 'View Response'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Row>
          <Col md={6}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h5>Pending Feedback</h5>
                <p className="text-muted">
                  {feedbackItems.filter(item => item.status === 'pending').length} items require your attention
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h5>Responded Feedback</h5>
                <p className="text-muted">
                  {feedbackItems.filter(item => item.status === 'responded').length} items have been addressed
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Response Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedFeedback?.status === 'pending' ? 'Respond to Feedback' : 'View Response'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showSuccessMessage && (
            <div className="alert alert-success">
              Response submitted successfully!
            </div>
          )}
          
          <h6>Student Feedback:</h6>
          <p className="border p-3 bg-light rounded">
            {selectedFeedback?.content}
          </p>
          
          <Form.Group className="mb-3">
            <Form.Label>Your Response:</Form.Label>
            <Form.Control as="textarea" rows={4} value={response} onChange={(e) => setResponse(e.target.value)} disabled={selectedFeedback?.status === 'responded' && !showSuccessMessage} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          {selectedFeedback?.status === 'pending' && !showSuccessMessage && (
            <Button variant="primary" onClick={handleSubmitResponse} disabled={!response.trim()}>Submit Response</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReviewFeedback;
