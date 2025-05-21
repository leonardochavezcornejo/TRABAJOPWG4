import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginForm from './components/autenticacion/login';
import CreateAccount from './components/autenticacion/CreateAccount';
import ResetPassword from './components/autenticacion/ResetPassword';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/crear-cuenta" element={<CreateAccount />} /> 
        <Route path="/recuperar" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;