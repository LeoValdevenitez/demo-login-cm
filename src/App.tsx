import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import RegistrationWizard from './components/Registration/RegistrationWizard';
import { UserAuthProvider } from './contexts/UserAuthContext';

function App() {
  return (
    <UserAuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegistrationWizard />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </UserAuthProvider>
  );
}

export default App;