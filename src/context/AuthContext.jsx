import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

function readUsers() {
  try {
    const raw = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function readCurrentUser() {
  try {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCurrentUser(user) {
  if (user) localStorage.setItem('currentUser', JSON.stringify(user));
  else localStorage.removeItem('currentUser');
}

function readProfiles() {
  try {
    const raw = localStorage.getItem('profiles');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeProfiles(profiles) {
  localStorage.setItem('profiles', JSON.stringify(profiles));
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(readCurrentUser());
  const [users, setUsers] = useState(readUsers());
  const [profiles, setProfiles] = useState(readProfiles());

  useEffect(() => {
    writeUsers(users);
  }, [users]);

  useEffect(() => {
    writeCurrentUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    writeProfiles(profiles);
  }, [profiles]);

  const register = ({ name, email, password, role }) => {
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('Email already registered');
    const user = { id: Date.now(), name, email, password, role };
    const usersNext = [...users, user];
    setUsers(usersNext);
    writeUsers(usersNext);
    if (role === 'student') {
      const p = createDefaultProfile(user);
      const profilesNext = { ...profiles, [user.id]: p };
      setProfiles(profilesNext);
      writeProfiles(profilesNext);
    }
    return user;
  };

  const login = ({ email, password, role }) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    if (role && user.role !== role) {
      throw new Error(`Selected role does not match your account (${user.role}).`);
    }
    if (user.role === 'student') {
      const existing = profiles[user.id];
      if (!existing) {
        const p = createDefaultProfile(user);
        setProfiles(prev => ({ ...prev, [user.id]: p }));
      }
    }
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const getStudentProfile = (userId) => {
    const existing = profiles[userId];
    if (existing) return existing;
    const user = users.find(u => u.id === userId);
    if (user && user.role === 'student') {
      const p = createDefaultProfile(user);
      setProfiles(prev => ({ ...prev, [userId]: p }));
      return p;
    }
    return null;
  };

  const updateStudentProfile = (userId, profile) => {
    setProfiles(prev => ({ ...prev, [userId]: profile }));
  };

  function createDefaultProfile(user) {
    const seed = Array.from(user.email).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    function r(min, max, s) {
      const x = Math.sin(s) * 10000;
      return Math.floor(min + (x - Math.floor(x)) * (max - min + 1));
    }
    const teacherPool = users.filter(u => u.role === 'teacher').map(u => u.name || 'Teacher');
    const pickTeacher = (i) => {
      if (teacherPool.length === 0) {
        const fallback = ['Dr. Johnson', 'Prof. Smith', 'Ms. Davis', 'Dr. Wilson'];
        return fallback[i % fallback.length];
      }
      return teacherPool[i % teacherPool.length];
    };
    const subjects = ['Mathematics', 'Science', 'English', 'Computer Science'].map((name, i) => {
      const progress = r(60, 95, seed + i);
      const grade = progress >= 90 ? 'A' : progress >= 80 ? 'A-' : progress >= 70 ? 'B+' : 'B-';
      return { name, progress, grade };
    });
    const overallProgress = Math.floor(subjects.reduce((a, s) => a + s.progress, 0) / subjects.length);
    const completedAssessments = r(10, 30, seed + 42);
    const pendingAssessments = r(0, 5, seed + 43);
    const recentFeedback = [
      { id: 1, subject: 'Mathematics', teacher: pickTeacher(0), message: 'Keep practicing problem sets.', date: '2023-10-12' },
      { id: 2, subject: 'Science', teacher: pickTeacher(1), message: 'Good understanding shown in lab work.', date: '2023-10-08' }
    ];
    const upcomingAssessments = [
      { id: 1, title: 'Final Exam', subject: 'Mathematics', dueDate: '2023-11-15', importance: 'high' },
      { id: 2, title: 'Lab Report', subject: 'Science', dueDate: '2023-10-25', importance: 'medium' }
    ];
    return { overallProgress, completedAssessments, pendingAssessments, subjects, recentFeedback, upcomingAssessments };
  }

  const value = { currentUser, users, register, login, logout, getStudentProfile, updateStudentProfile };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
