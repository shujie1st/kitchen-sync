import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Recipe(){
  // "https://api.edamam.com/api/recipes/v2?type=public&q=beef%20almond&app_id= &app_key= "
  const api = process.env.REACT_APP_API;
  const apiId = process.env.REACT_APP_API_ID;
  const apiKeys = process.env.REACT_APP_API_KEYS;

  let keywords = "shrimp lettuce";
  let url = `${api}&q=${keywords}&app_id=${apiId}&app_key=${apiKeys}`;
  let searchRecipes = function () {
    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data))
  };

  return ( 
      <section className="recipes">
        <Container className="search">
      <Row>
        <Col sm={4}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button onClick={searchRecipes}>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
      </section>
  );
}

export default Recipe;