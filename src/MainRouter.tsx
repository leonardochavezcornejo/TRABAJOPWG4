import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginForm from './components/autenticacion/login';
import CreateAccount from './components/autenticacion/CreateAccount';
import ResetPassword from './components/autenticacion/ResetPassword';
import VerifyIdentity from './components/autenticacion/VerifyIdentity';
import EditProfile from './components/autenticacion/EditProfile';

import AdminPanel from './components/admin/AdminPanel';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/crear-cuenta" element={<CreateAccount />} /> 
        <Route path="/edit-profile" element={<EditProfile />} /> 
        <Route path="/recuperar" element={<ResetPassword />} />
        <Route path="/verificar" element={<VerifyIdentity />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;