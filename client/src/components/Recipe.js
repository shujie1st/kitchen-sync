import { useState, useRef, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

function Recipe(){

  const [recipes, setRecipes] = useState([]);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");

  const inputElement = useRef();

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

  const searchRecipesByKeywords = () => {
    const keywords = inputElement.current.value;
    const initialUrl = `${api}&q=${keywords}&app_id=${apiId}&app_key=${apiKeys}`;
    setRecipes([]);
    setLoadMoreUrl("");
    loadRecipes(initialUrl);
  }

  // set default keywords to render recipes for initial loading 
  useEffect(() => {
    const defaultKeywords = 'tomato, lettuce, mushroom';
    const defaultUrl = `${api}&q=${defaultKeywords}&app_id=${apiId}&app_key=${apiKeys}`;
    loadRecipes(defaultUrl);
  }, []);

  return (
    <section className="recipes">

      <Container className="search">
        <Row>
          <Col sm={4}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search recipes"
                className="me-2"
                aria-label="Search"
                ref={inputElement}
              />
              <Button onClick={searchRecipesByKeywords}>
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      
      <section className="recipe-cards">
        {recipes.map(recipe => {
          return <RecipeCard recipe={recipe} />
        })}
      </section>

      <section className="load-more">
        {loadMoreUrl && <Button onClick={() => loadRecipes(loadMoreUrl)}>Load more...</Button>}
      </section>

    </section>
  );
}

export default Recipe;