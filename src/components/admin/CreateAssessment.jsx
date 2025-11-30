import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import AppNavbar from '../common/Navbar';

const CreateAssessment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    dueDate: '',
    description: '',
    totalPoints: 100,
    questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0, points: 10 }]
  });
  
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const questions = [...formData.questions];
    questions[index] = { ...questions[index], [name]: value };
    setFormData({ ...formData, questions });
  };
  
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const questions = [...formData.questions];
    questions[questionIndex].options[optionIndex] = value;
    setFormData({ ...formData, questions });
  };
  
  const handleCorrectAnswerChange = (questionIndex, value) => {
    const questions = [...formData.questions];
    questions[questionIndex].correctAnswer = parseInt(value);
    setFormData({ ...formData, questions });
  };
  
  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: '', options: ['', '', '', ''], correctAnswer: 0, points: 10 }]
    });
  };
  
  const removeQuestion = (index) => {
    if (formData.questions.length > 1) {
      const questions = [...formData.questions];
      questions.splice(index, 1);
      setFormData({ ...formData, questions });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Here you would typically send the data to your backend API
    console.log('Assessment data submitted:', formData);
    
    // Show success message
    setShowSuccess(true);
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/admin/assessments');
    }, 2000);
  };
  
  return (
    <>
      <AppNavbar userRole="admin" />
      <Container className="py-4">
        <Card>
          <Card.Header className="bg-success text-white">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faClipboardList} className="me-2" />
              <h5 className="mb-0">Create New Assessment</h5>
            </div>
          </Card.Header>
          <Card.Body>
            {showSuccess && (
              <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                Assessment created successfully! Redirecting to assessments list...
              </Alert>
            )}
            
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">Please provide a title.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Select name="subject" value={formData.subject} onChange={handleChange} required>
                      <option value="">Select Subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Computer Science">Computer Science</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Please select a subject.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Grade</Form.Label>
                    <Form.Select name="grade" value={formData.grade} onChange={handleChange} required>
                      <option value="">Select Grade</option>
                      <option value="6">6th Grade</option>
                      <option value="7">7th Grade</option>
                      <option value="8">8th Grade</option>
                      <option value="9">9th Grade</option>
                      <option value="10">10th Grade</option>
                      <option value="11">11th Grade</option>
                      <option value="12">12th Grade</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Please select a grade.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
                    <Form.Control.Feedback type="invalid">Please provide a due date.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
                <Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Total Points</Form.Label>
                <Form.Control type="number" name="totalPoints" value={formData.totalPoints} onChange={handleChange} required min="1" />
                <Form.Control.Feedback type="invalid">Please provide a valid point value.</Form.Control.Feedback>
              </Form.Group>
              
              <hr />
              
              <h5 className="mb-3">Questions</h5>
              
              {formData.questions.map((question, qIndex) => (
                <Card key={qIndex} className="mb-3">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <span>Question {qIndex + 1}</span>
                    <Button variant="danger" size="sm" onClick={() => removeQuestion(qIndex)} disabled={formData.questions.length === 1}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Question Text</Form.Label>
                      <Form.Control type="text" name="question" value={question.question} onChange={(e) => handleQuestionChange(qIndex, e)} required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Points</Form.Label>
                      <Form.Control type="number" name="points" value={question.points} onChange={(e) => handleQuestionChange(qIndex, e)} required min="1" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Options</Form.Label>
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="d-flex mb-2">
                          <Form.Check type="radio" name={`correctAnswer-${qIndex}`} id={`option-${qIndex}-${oIndex}`} className="me-2" checked={question.correctAnswer === oIndex} onChange={() => handleCorrectAnswerChange(qIndex, oIndex)} />
                          <Form.Control type="text" value={option} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)} placeholder={`Option ${oIndex + 1}`} required />
                        </div>
                      ))}
                      <Form.Text className="text-muted">Select the radio button next to the correct answer.</Form.Text>
                    </Form.Group>
                  </Card.Body>
                </Card>
              ))}
              
              <div className="d-flex justify-content-center mb-4">
                <Button variant="outline-primary" onClick={addQuestion}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Add Question
                </Button>
              </div>
              
              <div className="d-flex justify-content-between">
                <Button variant="outline-secondary" as={Link} to="/admin/assessments">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Back to Assessments
                </Button>
                <Button variant="success" type="submit">Create Assessment</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CreateAssessment;
