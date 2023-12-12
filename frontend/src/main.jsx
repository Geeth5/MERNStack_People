import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './views/home.jsx';
import People from './views/peopleview.jsx';
import Settings from './views/settingsview.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
