import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faArrowLeft, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AppNavbar from '../common/Navbar';

const GenerateReports = () => {
  const [reportType, setReportType] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [format, setFormat] = useState('pdf');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Generating report with:', { reportType, timeframe, subject, grade, format });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
    <>
      <AppNavbar userRole="admin" />
      <Container className="py-4">
        <Card>
          <Card.Header className="bg-info text-white">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faChartBar} className="me-2" />
              <h5 className="mb-0">Generate Reports</h5>
            </div>
          </Card.Header>
          <Card.Body>
            {showSuccess && (
              <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                Report generated successfully! Check your downloads folder.
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Report Type</Form.Label>
                    <Form.Select 
                      value={reportType} 
                      onChange={(e) => setReportType(e.target.value)}
                      required
                    >
                      <option value="">Select Report Type</option>
                      <option value="student-performance">Student Performance</option>
                      <option value="class-average">Class Average</option>
                      <option value="assessment-results">Assessment Results</option>
                      <option value="attendance">Attendance</option>
                      <option value="progress-over-time">Progress Over Time</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Timeframe</Form.Label>
                    <Form.Select 
                      value={timeframe} 
                      onChange={(e) => setTimeframe(e.target.value)}
                      required
                    >
                      <option value="">Select Timeframe</option>
                      <option value="current-week">Current Week</option>
                      <option value="current-month">Current Month</option>
                      <option value="current-quarter">Current Quarter</option>
                      <option value="current-semester">Current Semester</option>
                      <option value="current-year">Current Year</option>
                      <option value="custom">Custom Date Range</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              {timeframe === 'custom' && (
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control type="date" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control type="date" required />
                    </Form.Group>
                  </Col>
                </Row>
              )}
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject (Optional)</Form.Label>
                    <Form.Select 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option value="">All Subjects</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Computer Science">Computer Science</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Grade (Optional)</Form.Label>
                    <Form.Select 
                      value={grade} 
                      onChange={(e) => setGrade(e.target.value)}
                    >
                      <option value="">All Grades</option>
                      <option value="6">6th Grade</option>
                      <option value="7">7th Grade</option>
                      <option value="8">8th Grade</option>
                      <option value="9">9th Grade</option>
                      <option value="10">10th Grade</option>
                      <option value="11">11th Grade</option>
                      <option value="12">12th Grade</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-4">
                <Form.Label>Report Format</Form.Label>
                <div>
                  <Form.Check inline type="radio" label="PDF" name="format" id="format-pdf" value="pdf" checked={format === 'pdf'} onChange={() => setFormat('pdf')} />
                  <Form.Check inline type="radio" label="Excel" name="format" id="format-excel" value="excel" checked={format === 'excel'} onChange={() => setFormat('excel')} />
                  <Form.Check inline type="radio" label="CSV" name="format" id="format-csv" value="csv" checked={format === 'csv'} onChange={() => setFormat('csv')} />
                </div>
              </Form.Group>
              
              <div className="d-flex justify-content-between">
                <Button variant="outline-secondary" as={Link} to="/admin/reports">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Back to Reports
                </Button>
                <Button variant="info" type="submit">
                  <FontAwesomeIcon icon={faFileDownload} className="me-2" />
                  Generate Report
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default GenerateReports;
