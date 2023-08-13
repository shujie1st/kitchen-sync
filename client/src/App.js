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
import Footer from './components/Footer';
import Signup from './components/Signup';


function App() {
 // Pass filters props between sibling components, Ingrdient/Preference & Filter
 // Load filters from local storage on initial render
  const initialFilter = JSON.parse(localStorage.getItem('selectedFilters')) || [];
  const [filter, setFilter] = useState(initialFilter);
  const [userPrefs, setUserPrefs] = useState([]);

  // Load logged in user first name from local storage, use "" as initial render if user not logged in
  const loggedinFirstName = localStorage.getItem('firstName') || "";
  const [firstName, setFirstName] = useState(loggedinFirstName);

  useEffect(() => {
    // Save firstName to local storage whenever it changes
    localStorage.setItem('firstName', firstName);
  }, [firstName]);


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

  // fetch userPrefs from database
  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user_preferences`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const jsonData = await response.json()
      setUserPrefs(jsonData)
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(() => {
    fetchUserPreferences();
  },[])

    // Function to clear the filteredList
    const clearFilteredList = () => {
      setFilter([]);
    };


  return (
    <div className="App">
      <BrowserRouter>
        <Navigation firstName={firstName} setFirstName={setFirstName} />
        <Routes>
          <Route path="/login" element={<Login setFirstName={setFirstName} />} />
          <Route path="/register" element={<Signup setFirstName={setFirstName} />} />
          <Route path="/profile" element={<Profile firstName={firstName} clearFilteredList={clearFilteredList}/>} />
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
                <Recipe firstName={firstName} filteredList={filter} userPrefs={userPrefs} />

              </div>
              <Filter 
                filteredList={filter}
                removeItemFromFilterList={removeItemFromFilterList} 
                userPrefs={userPrefs}
                fetchUserPreferences={fetchUserPreferences}
                clearFilteredList={clearFilteredList}
              />
              <div className="App">
            </div>
            </main> 
          } />

        </Routes>
      </BrowserRouter>
      <ScrollButton />
      <Footer />
    </div>
  );
}

export default App;
