import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

function Recipe(props){

  const [recipes, setRecipes] = useState([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [preferenceNames, setPreferenceNames] = useState([]);

  const inputElement = useRef();
  const navigate = useNavigate();

  const api = process.env.REACT_APP_API;
  const apiId = process.env.REACT_APP_API_ID;
  const apiKeys = process.env.REACT_APP_API_KEYS;

  const loadRecipes = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setLoadMoreUrl(data["_links"].next.href);
        setRecipes(prev => [...prev,
          ...data.hits.map(each => {
            return {
              apiId: each.recipe.uri,
              imageLink: each.recipe.images["THUMBNAIL"].url,
              name: each.recipe.label,
              websiteName: each.recipe.source,
              websiteLink: each.recipe.url,
              dishType: each.recipe.dishType
            }
          })]
        );
      })
      .catch(error => console.log(error))
  };

  const searchRecipesByKeywords = (keywords) => {
    const initialUrl = `${api}&q=${keywords}&app_id=${apiId}&app_key=${apiKeys}`;
    setRecipes([]);
    setLoadMoreUrl("");
    loadRecipes(initialUrl);
  };

  const getFavoriteRecipesForUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/user_recipes", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setFavoriteRecipes(data.map(i => ({
          recipeId: i.recipe_id,
          recipeName: i.name,
          recipeLink: i.recipe_link
        })));
      } else {
        console.log("Failed to get saved recipes for user");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const favoriteIconClicked = async (recipe) => {
    // if user logged in and click the save recipe icon:
    if (props.firstName) {
      setShowModal(false);
      console.log(`${recipe.name} has been clicked`);
    
      if (!favoriteRecipes.find(r => r.recipeId === recipe.apiId)) {
        // if this recipe is not saved yet, send post request with data about the clicked recipe
        try {
          const newFavoriteRecipe = {
            recipeId: recipe.apiId,
            recipeName: recipe.name,
            recipeLink: recipe.websiteLink,
          };

          const response = await fetch("http://localhost:3001/user_recipes", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newFavoriteRecipe),
          });
    
          if (response.status === 200) {
            setFavoriteRecipes(prev => [...prev, newFavoriteRecipe])
            console.log("Recipe saved")
          } else {
            console.log("Failed to save recipe");
          }
        } catch (error) {
          console.error(error);
        }
      }
      else {
        // if this recipe is already saved, send delete request with data about the clicked recipe
        try {
          const response = await fetch("http://localhost:3001/user_recipes", {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ recipeId: recipe.apiId }),
          });
    
          if (response.status === 200) {
            setFavoriteRecipes(prev => prev.filter(item => item.recipeId !== recipe.apiId));
            console.log("Recipe removed from favorite")
          } else {
            console.log("Failed to remove recipe");
          }
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      // Show modal if user click the save recipe icon in RecipeCard without logging in
      setShowModal(true);
    }
  };

  // fetch preferences from database, then set a list of all the preference names
  // it will be used to decide if an element in the filteredList is an ingredient or preference 
  const fetchPreferenceNames = async () => {
    try {
      const response = await fetch(`http://localhost:3001/preferences`);
      const data = await response.json();
      setPreferenceNames(data.map(item => item.name));
    } catch (error) {
      console.error(error.message);
    }
  }


  // For initial page loading:
  useEffect(() => {
    // set default keywords to render recipes
    const defaultKeywords = 'tomato, lettuce, mushroom';
    searchRecipesByKeywords(defaultKeywords);

    // get saveds recipes data by userId
    getFavoriteRecipesForUser();
    
    // fetch a list of the preference names from DB
    fetchPreferenceNames();
  }, []);

  return (
    <section className="recipes">

      <Container>
        <Row>
          <Col sm={12}>
            <Form className="d-flex search">
              <Form.Control
                type="search"
                placeholder="Search recipes"
                className="me-2"
                aria-label="Search"
                ref={inputElement}
              />
              <Button onClick={() => searchRecipesByKeywords(inputElement.current.value)}>
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      
      <section className="recipe-cards">
        {recipes.map((recipe, index) => {
          return <RecipeCard key={index} recipe={recipe} favoriteIconClicked={favoriteIconClicked} isFavorite={favoriteRecipes.find(r => r.recipeId === recipe.apiId)}/>
        })}
      </section>

      <section className="load-more">
        {loadMoreUrl && <Button onClick={() => loadRecipes(loadMoreUrl)}>Load more...</Button>}
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Please log in to continue...</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to log in to save recipes. Would you like to log in now?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            NO
          </Button>
          <Button variant="primary" onClick={() => navigate("/login")}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>

    </section>
  );
}

export default Recipe;