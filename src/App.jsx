import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Founder from './pages/Founder';

import ScrollToHash from './components/ScrollToHash';

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/founder" element={<Founder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
