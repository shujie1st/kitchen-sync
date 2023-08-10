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
 // Pass filters props between sibling components, Ingrdient/Preference & Filter
 // Load filters from local storage on initial render
  const initialFilter = JSON.parse(localStorage.getItem('selectedFilters')) || [];
  const [filter, setFilter] = useState(initialFilter);


  const [firstName, setFirstName] = useState("");


  // callback to get the selectedIngredients list from the Ingredients component
  const getSelectedIngredients = (selectedIngredients) => {
    // set ingredients to pass to the Filter prop
    setFilter(selectedIngredients)
  }

   // callback to get selectedPreferences list from the Preferences component
  const getSelectedPreferences = (selectedPref) => {
    // set preferences to pass to Filtet prop
    // setFilter([...filter, selectedItem])
    setFilter(selectedPref)
  }

  // callback to remove ingredients from the Filter component
  const removeItemFromFilterList = (clickedItem) => {
    // update ingredient to remove from the Ingredients component
    setFilter(clickedItem)
  }
  

  useEffect(() => {
    // Save selectedIngredients to local storage whenever it changes
    localStorage.setItem('selectedFilters', JSON.stringify(filter));
  }, [filter]);

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
          <Route path="/profile" element={
            <Profile  firstName={firstName} />} />
          <Route path="/" element={
            <main className="container-lg">
              <Ingredient 
                filteredList={filter}
                getSelectedIngredients={getSelectedIngredients}
              />
              <div className="container-center">

                <Preference 
                  filteredList={filter}
                  getSelectedPreferences={getSelectedPreferences}
                />
                <Recipe firstName={firstName} />

              </div>
              <Filter 
                filteredList={filter}
                removeItemFromFilterList={removeItemFromFilterList} 
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
