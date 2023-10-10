import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { createRoot } from "react-dom/client";

const root = document.getElementById('root');

const reactRoot = createRoot(root); // Create a root for rendering

reactRoot.render(
  <Router>
    <App />
  </Router>
);
