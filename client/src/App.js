import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Ingredient from './components/Ingredient';
import Recipe from './components/Recipe';
import Filter from './components/Filter';
import './App.css';
import Preference from './components/Preference';
import Login from './components/Login';
import ScrollButton from './components/ScrollButton';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';


function App() {
  // Pass selectedIngredients props between sibling components, Ingrdient & Filter
 // Load selectedIngredients from local storage on initial render
  const initialSelectedIngredients = JSON.parse(localStorage.getItem('selectedIngredients')) || [];
  const [selectedIngredients, setSelectedIngredients] = useState(initialSelectedIngredients);
  
  // Load logged in user first name from local storage, use "" as initial render if user not logged in
  const loggedinFirstName = localStorage.getItem('firstName') || "";
  const [firstName, setFirstName] = useState(loggedinFirstName);

  // callback to get the selectedIngredients list form the Ingredients component
  const getSelectedIngredients = (selectedIngredients) => {
    // set ingredients to pass to the Filter prop
    setSelectedIngredients(selectedIngredients)
  }

  // callback to remove ingredients from the Filter component
  const removeSelectedIngredient = (selectedIngredient) => {
    // update ingredient to remove from the Ingredients component
     setSelectedIngredients(selectedIngredient)

  }

  useEffect(() => {
    // Save selectedIngredients to local storage whenever it changes
    localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
  }, [selectedIngredients]);

  useEffect(() => {
    // Save firstName to local storage whenever it changes
    localStorage.setItem('firstName', firstName);
  }, [firstName]);


  return (
    <div className="App">
      <BrowserRouter>
        <Navigation firstName={firstName} setFirstName={setFirstName} />
        <Routes>
          <Route path="/login" element={<Login setFirstName={setFirstName} />} />
          <Route path="/profile" element={<Profile firstName={firstName} />} />
          <Route path="/" element={
            <main className="container-lg">
              <Ingredient 
          filteredIngredients={selectedIngredients}
          getSelectedIngredients={getSelectedIngredients}
        />
              <div className="container-center">
                <Preference />
                <Recipe firstName={firstName} />
              </div>
              <Filter 
          filteredIngredients={selectedIngredients}
          removeSelectedIngredient={removeSelectedIngredient} 
        />
            </main> 
          } />
        </Routes>
      </BrowserRouter>
      <ScrollButton />
    </div>
  );
}

export default App;
