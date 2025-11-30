import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Admin Components
import AdminDashboard from './components/admin/Dashboard';
import AdminAssessments from './components/admin/Assessments';
import AdminStudents from './components/admin/Students';
import AdminReports from './components/admin/Reports';
import AddStudent from './components/admin/AddStudent';
import CreateAssessment from './components/admin/CreateAssessment';
import GenerateReports from './components/admin/GenerateReports';
import ReviewFeedback from './components/admin/ReviewFeedback';

// Student Components
import StudentDashboard from './components/student/Dashboard';
import StudentAssessments from './components/student/Assessments';
import StudentProgress from './components/student/Progress';
import StudentFeedback from './components/student/Feedback';

// Common Components
import NotFound from './components/common/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/assessments" element={<AdminAssessments />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/create-assessment" element={<CreateAssessment />} />
        <Route path="/admin/generate-reports" element={<GenerateReports />} />
        <Route path="/admin/review-feedback" element={<ReviewFeedback />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/assessments" element={<StudentAssessments />} />
        <Route path="/student/progress" element={<StudentProgress />} />
        <Route path="/student/feedback" element={<StudentFeedback />} />
        
        {/* Default Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* 404 Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
