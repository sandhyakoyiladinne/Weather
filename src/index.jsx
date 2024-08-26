// src/index.js
import ReactDOM from 'react-dom/client'; // Updated for React 18+
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'; // Ensure this file exists and contains general styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
