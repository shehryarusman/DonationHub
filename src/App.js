import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './component/Home';
import "./App.css";
import DonatePage from './component/DonatePage';
import Nav from './component/Nav';
import News from './component/News';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/donatepage" element={<DonatePage/>} />
        <Route path="/news" element={<News/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;