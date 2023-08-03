import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

function Recipe(props){

  const [recipes, setRecipes] = useState([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

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
  
  const favoriteIconClicked = async (recipe) => {
    // if user logged in and click the save recipe icon:
    if (props.firstName) {
      setShowModal(false);
      console.log(`${recipe.name} has been clicked`);

      // send post request with data about the clicked recipe
      try {
        const response = await fetch("http://localhost:3001/user_recipes", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipeId: recipe.apiId,
            recipeName: recipe.name,
            recipeLink: recipe.websiteLink,
          }),
        });
  
        if (response.status === 200) { 
          console.log("Recipe saved")
        } else {
          console.log("Failed to save recipe");
        }
      } catch (error) {
        console.error(error);
      }

    } else {
      // Show modal if user click the save recipe icon in RecipeCard without logging in
      setShowModal(true);
    }
  };


  // set default keywords to render recipes for initial loading 
  useEffect(() => {
    const defaultKeywords = 'tomato, lettuce, mushroom';
    searchRecipesByKeywords(defaultKeywords);
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
          return <RecipeCard key={index} recipe={recipe} favoriteIconClicked={favoriteIconClicked}  />
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