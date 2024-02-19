import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './main/router/router.tsx';
import './presentation/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
