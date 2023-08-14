import { useState, useEffect } from "react";
import SavedRecipeCard from './SavedRecipeCard';
import configData from "../config.json";

function UserRecipes() {
  const [recipeUris, setRecipeUris] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const apiByUri = configData.EDAMAM_API_BY_URI;
  const apiId = process.env.REACT_APP_API_ID;
  const apiKeys = process.env.REACT_APP_API_KEYS;
  const backendPort = process.env.REACT_APP_BACKEND_PORT;
  
  // function to retrieve the saved recipes' URIs for logged in client
  const getSavedRecipeUris = async () => {
    try {
      const response = await fetch(`http://localhost:${backendPort}/user_recipes`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setRecipeUris(data.map(i => i.recipe_id));
      } else {
        console.log("Failed to get saved recipes URIs for user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadSavedRecipes = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setSavedRecipes(
          data.hits.map(each => {
            return {
              apiId: each.recipe.uri,
              imageLink: each.recipe.images["THUMBNAIL"].url,
              name: each.recipe.label,
              websiteName: each.recipe.source,
              websiteLink: each.recipe.url,
              dishType: each.recipe.dishType
            }
          })
        );
      })
      .catch(error => console.log(error))
  };

  const renderSavedRecipesFromApi = () => {
    let recipesUrl = "";
    for (const each of recipeUris) {
      recipesUrl += `&uri=${encodeURIComponent(each)}`;
    }
    let savedRecipesUrl = `${apiByUri}${recipesUrl}&app_id=${apiId}&app_key=${apiKeys}`;
    loadSavedRecipes(savedRecipesUrl);
  };

  const deleteSavedRecipe = async (recipe) => {
    try {
      const response = await fetch(`http://localhost:${backendPort}/user_recipes`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId: recipe.apiId }),
      });

      if (response.status === 200) {
        setSavedRecipes(prev => prev.filter(item => item.apiId !== recipe.apiId));
        console.log("Recipe deleted from favorite")
      } else {
        console.log("Failed to delete saved recipe");
      }
    } catch (error) {
      console.error(error);
    }
  }; 
  
  // fetch the saved recipes' URIs from DB when the page initial loading
  useEffect(() => {
    getSavedRecipeUris();
  }, []);
  
  // when the value of recipeUris updated and it's not an empty array, render saved recipes
  useEffect(() => {
      if (recipeUris.length > 0) {
        renderSavedRecipesFromApi();
      }
  }, [recipeUris])



  return (
    <section className="user-recipes">
      <span>Favorite Recipes </span>
      <section className="recipe-cards">
        {savedRecipes.map((recipe, index) => {
          return <SavedRecipeCard key={index} recipe={recipe} deleteSavedRecipe={deleteSavedRecipe} />
        })}
      </section>
    </section>
  )

}

export default UserRecipes;