import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import "./App.css";
import "./Map.css"
import DonatePage from './component/DonatePage';
import Nav from './component/Nav';
import News from './component/News';
import Map from './component/Map';
import Center from './component/Center';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/donatepage" element={<DonatePage/>} />
        <Route path="/map" element={<Map donationValue={0}/>} />
        <Route path="/center" element={<Center />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
