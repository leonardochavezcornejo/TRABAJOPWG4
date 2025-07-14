import ReactDOM from 'react-dom/client';
import MainRouter from './MainRouter';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/TRABAJOPWG4'>
      <MainRouter />
    </BrowserRouter>
  </StrictMode>
);
