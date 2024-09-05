
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Meal from './Meal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<Meal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
