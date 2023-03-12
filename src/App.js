import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import "./App.css";
import "./Map.css"
import DonatePage from './component/DonatePage';
import Nav from './component/Nav';
import News from './component/News';
import Map from './component/Map';
<<<<<<< Updated upstream
import Center from './component/Center';
=======
import { DonationProvider } from './component/DonationContext';
>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
<<<<<<< Updated upstream
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/donatepage" element={<DonatePage/>} />
<<<<<<< HEAD
        <Route path="/map" element={<Map donationValue={0}/>} />
        <Route path="/center" element={<Center />}/>
=======
        <Route path="/map" element={<Map />} />
        
>>>>>>> 3856c07d07657111dcef488cce37a875aeecb156
      </Routes>
=======
      <DonationProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/donatepage" element={<DonatePage />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </DonationProvider>
>>>>>>> Stashed changes
    </BrowserRouter>
  );
}

export default App;
