import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../common/Navbar';
import '../../assets/css/dashboard.css';

const Assessments = () => {
  // Sample assessment data
  const [assessments, setAssessments] = useState([
    { id: 1, title: 'Midterm Exam', subject: 'Mathematics', dueDate: '2023-10-15', totalMarks: 100, status: 'Published' },
    { id: 2, title: 'Final Project', subject: 'Computer Science', dueDate: '2023-11-20', totalMarks: 150, status: 'Draft' },
    { id: 3, title: 'Quiz 3', subject: 'Physics', dueDate: '2023-10-05', totalMarks: 50, status: 'Published' },
    { id: 4, title: 'Term Paper', subject: 'English Literature', dueDate: '2023-10-30', totalMarks: 100, status: 'Published' },
    { id: 5, title: 'Lab Assessment', subject: 'Chemistry', dueDate: '2023-11-10', totalMarks: 75, status: 'Draft' },
  ]);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState({
    id: null,
    title: '',
    subject: '',
    dueDate: '',
    totalMarks: '',
    status: 'Draft'
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle modal open for new assessment
  const handleAddNew = () => {
    setCurrentAssessment({
      id: null,
      title: '',
      subject: '',
      dueDate: '',
      totalMarks: '',
      status: 'Draft'
    });
    setIsEditing(false);
    setShowModal(true);
  };

  // Handle modal open for editing
  const handleEdit = (assessment) => {
    setCurrentAssessment({ ...assessment });
    setIsEditing(true);
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAssessment({
      ...currentAssessment,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (isEditing) {
      // Update existing assessment
      setAssessments(assessments.map(assessment => 
        assessment.id === currentAssessment.id ? currentAssessment : assessment
      ));
    } else {
      // Add new assessment
      const newAssessment = {
        ...currentAssessment,
        id: assessments.length + 1
      };
      setAssessments([...assessments, newAssessment]);
    }
    setShowModal(false);
  };

  // Handle assessment deletion
  const handleDelete = (id) => {
    setAssessments(assessments.filter(assessment => assessment.id !== id));
  };

  // Handle status toggle
  const handleStatusToggle = (id) => {
    setAssessments(assessments.map(assessment => {
      if (assessment.id === id) {
        const newStatus = assessment.status === 'Published' ? 'Draft' : 'Published';
        return { ...assessment, status: newStatus };
      }
      return assessment;
    }));
  };

  return (
    <>
      <Navbar />
      <Container fluid className="dashboard-container mt-4">
        <Row className="mb-4">
          <Col>
            <h2 className="page-title">Assessment Management</h2>
            <p className="text-muted">Create, edit, and manage student assessments</p>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={handleAddNew}>
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Create New Assessment
            </Button>
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
                    <td>
                      <span className={`badge ${assessment.status === 'Published' ? 'bg-success' : 'bg-warning'}`}>
                        {assessment.status}
                      </span>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(assessment)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button variant="outline-danger" size="sm" className="me-2" onClick={() => handleDelete(assessment.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      <Button 
                        variant={assessment.status === 'Published' ? 'outline-warning' : 'outline-success'} 
                        size="sm"
                        onClick={() => handleStatusToggle(assessment.id)}
                      >
                        <FontAwesomeIcon icon={assessment.status === 'Published' ? faTimes : faCheck} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      {/* Modal for adding/editing assessments */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Assessment' : 'Create New Assessment'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title"
                value={currentAssessment.title} 
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control 
                type="text" 
                name="subject"
                value={currentAssessment.subject} 
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control 
                type="date" 
                name="dueDate"
                value={currentAssessment.dueDate} 
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Marks</Form.Label>
              <Form.Control 
                type="number" 
                name="totalMarks"
                value={currentAssessment.totalMarks} 
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select 
                name="status"
                value={currentAssessment.status} 
                onChange={handleInputChange}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Assessments;
