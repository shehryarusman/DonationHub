import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import "./App.css";
import DonatePage from './component/DonatePage';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donatepage" element={<DonatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
