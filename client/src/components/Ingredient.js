import React, { useEffect, useState } from "react";

const Ingredient = (props) => {
  const { filteredIngredients, getSelectedIngredients } = props

  // database ingredients
  const [ingredients, setIngredients] = useState([]);


  // fetch ingredients from database
  const getIngredients = async () => {
    try {
      const response = await fetch('http://localhost:3001/ingredients')
      const jsonData = await response.json()
      setIngredients(jsonData);
    } catch (error) {
      console.error(error.message)
    }
  };

  // select ingredients for Filter component
  const handleIngredientClick = (ingredientName) => {
    // check if ingredient has already been selected
    if (!filteredIngredients.includes(ingredientName)) {
    // callback to send data up to parent App component
    getSelectedIngredients([...filteredIngredients, ingredientName])
  }};


   useEffect(() => {
    getIngredients();
  }, []);


  return ( 
      <section className="ingredients">
        <form>
          <input type="text" placeholder="Search ingredients"></input>
          <button>Search</button>
        </form>
        <div>
          <h4>Vegetables & Greens</h4>
            {ingredients.map(ingredient => {
                if (ingredient.category_id === 1) {
                  return <button key={ingredient.id} onClick={() => handleIngredientClick(ingredient.name)}>{ingredient.name}</button>;
                }
              })}            
          <h4>Fruits</h4>
              {ingredients.map(ingredient => {
                if (ingredient.category_id === 2) {
                  return <button key={ingredient.id} onClick={() => handleIngredientClick(ingredient.name)} >{ingredient.name}</button>;
                }
              })}

          <h4>Dairy & Eggs</h4>
              {ingredients.map(ingredient => {
                if (ingredient.category_id === 3) {
                  return <button key={ingredient.id} onClick={() => handleIngredientClick(ingredient.name)} >{ingredient.name}</button>;
                }
              })}

          <h4>Dairy-Free & Meat Substitutes</h4>
                {ingredients.map(ingredient => {
                  if (ingredient.category_id === 4) {
                    return <button key={ingredient.id} onClick={() => handleIngredientClick(ingredient.name)} >{ingredient.name}</button>;
                  }
                })}
     
          <h4>Meats & Poultry</h4>
              {ingredients.map(ingredient => {
                if (ingredient.category_id === 5) {
                  return <button key={ingredient.id} onClick={() => handleIngredientClick(ingredient.name)} >{ingredient.name}</button>;
                }
              })}

          <h4>Fish & Seafood ID6</h4>
              {ingredients.map(ingredient => {
                if (ingredient.category_id === 6) {
                  return <button key={ingredient.id} onClick={() => handleIngredientClick(ingredient.name)} >{ingredient.name}</button>;
                }
              })}
        </div>
        
      </section>
  );
}

export default Ingredient;
