import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from '../common/Navbar';
import '../../assets/css/dashboard.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const Reports = () => {
  // Sample data for charts
  const subjectPerformanceData = {
    labels: ['Mathematics', 'Science', 'English', 'History', 'Computer Science'],
    datasets: [
      {
        label: 'Average Score (%)',
        data: [78, 82, 75, 68, 90],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const monthlyProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Score',
        data: [65, 70, 73, 75, 82, 85],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const assessmentDistributionData = {
    labels: ['Quizzes', 'Assignments', 'Projects', 'Exams'],
    datasets: [
      {
        label: 'Assessment Distribution',
        data: [25, 35, 20, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const gradeDistributionData = {
    labels: ['A', 'B', 'C', 'D', 'F'],
    datasets: [
      {
        label: 'Number of Students',
        data: [30, 45, 25, 15, 5],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
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
            <h2 className="page-title">Analytics & Reports</h2>
            <p className="text-muted">View performance metrics and student progress</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="card-title">Subject Performance</h5>
                <div className="chart-container">
                  <Bar data={subjectPerformanceData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="card-title">Monthly Progress</h5>
                <div className="chart-container">
                  <Line data={monthlyProgressData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="card-title">Assessment Distribution</h5>
                <div className="chart-container">
                  <Pie data={assessmentDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="card-title">Grade Distribution</h5>
                <div className="chart-container">
                  <Bar data={gradeDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="card-title">Key Insights</h5>
                <ul className="insights-list">
                  <li>Computer Science has the highest average score at 90%</li>
                  <li>Student performance has shown consistent improvement over the last 6 months</li>
                  <li>Assignments make up the largest portion of assessments at 35%</li>
                  <li>75% of students are achieving grades B or higher</li>
                  <li>History has the lowest average score and may require additional support</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Reports;
