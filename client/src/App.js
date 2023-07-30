import React, { useState } from 'react';
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


  return (
    <div className="App">
      <Navigation />
      <main className="container">
        <Ingredient getSelectedIngredients={getSelectedIngredients}/>
        <div className="container-center">
          <Preference />
          <Recipe />
        </div>
        <Filter selectedIngredients={selectedIngredients}/>
      </main> 
    </div>
  );
}

export default App;
