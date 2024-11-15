/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import InactivityTimer from './InactivityTimer';
import 'leaflet/dist/leaflet.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <InactivityTimer />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
