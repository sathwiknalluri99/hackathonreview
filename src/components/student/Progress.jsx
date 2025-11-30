import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from '../common/Navbar';
import '../../assets/css/dashboard.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const Progress = () => {
  // Sample data for charts
  const subjectPerformanceData = {
    labels: ['Mathematics', 'Science', 'English', 'History', 'Computer Science'],
    datasets: [
      {
        label: 'Your Score (%)',
        data: [85, 78, 82, 65, 92],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Class Average (%)',
        data: [78, 82, 75, 68, 90],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const monthlyProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Your Progress',
        data: [70, 75, 78, 80, 85, 88],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const completionRateData = {
    labels: ['Completed', 'Pending', 'Overdue'],
    datasets: [
      {
        label: 'Assessment Status',
        data: [75, 20, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <Container fluid className="dashboard-container mt-4">
        <Row className="mb-4">
          <Col>
            <h2 className="page-title">My Progress</h2>
            <p className="text-muted">Track your academic performance and growth</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="dashboard-card mb-4">
              <Card.Body>
                <h5 className="card-title">Overall Grade</h5>
                <h2 className="card-value text-success">A-</h2>
                <p className="text-muted">85% Average</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card mb-4">
              <Card.Body>
                <h5 className="card-title">Assessments Completed</h5>
                <h2 className="card-value">75%</h2>
                <p className="text-muted">15 of 20 total</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card mb-4">
              <Card.Body>
                <h5 className="card-title">Improvement</h5>
                <h2 className="card-value text-primary">+8%</h2>
                <p className="text-muted">Since last semester</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="card-title">Subject Performance</h5>
                <div className="chart-container">
                  <Bar data={subjectPerformanceData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="card-title">Assessment Completion</h5>
                <div className="chart-container">
                  <Doughnut data={completionRateData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="card-title">Progress Over Time</h5>
                <div className="chart-container">
                  <Line data={monthlyProgressData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="card-title">Areas for Improvement</h5>
                <ul className="insights-list">
                  <li><strong>History:</strong> Your score (65%) is slightly below class average (68%)</li>
                  <li><strong>Science:</strong> Your score (78%) is below class average (82%)</li>
                  <li><strong>Assessment Completion:</strong> 5% of assessments are overdue</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Progress;
