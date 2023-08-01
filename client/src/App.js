import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Ingredient from './components/Ingredient';
import Recipe from './components/Recipe';
import Filter from './components/Filter';
import './App.css';
import Preference from './components/Preference';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [firstName, setFirstName] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation firstName={firstName} />
        <Routes>
          <Route path="/login" element={<Login setFirstName={setFirstName} />} />
          <Route path="/" element={
            <main className="container">
              <Ingredient />
              <div className="container-center">
                <Preference />
                <Recipe />
              </div>
              <Filter />
            </main> 
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
