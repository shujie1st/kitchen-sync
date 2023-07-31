import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Ingredient from './components/Ingredient';
import Recipe from './components/Recipe';
import Filter from './components/Filter';
import './App.css';
import Preference from './components/Preference';


function App() {
  // Pass selectedIngredients props between sibling components, Ingrdient & Filter
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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
    console.log("👉👉👉selectedIngredients: ", selectedIngredients)
  }, [selectedIngredients]);


  return (
    <div className="App">
      <Navigation />
      <main className="container">
        <Ingredient 
          filteredIngredients={selectedIngredients}
          getSelectedIngredients={getSelectedIngredients}
        />
        <div className="container-center">
          <Preference />
          <Recipe />
        </div>
        <Filter 
          filteredIngredients={selectedIngredients}
          removeSelectedIngredient={removeSelectedIngredient} 
        />
      </main> 
    </div>
  );
}

export default App;
