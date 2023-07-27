import { useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function Recipe(){
  const api = process.env.REACT_APP_API;
  const apiId = process.env.REACT_APP_API_ID;
  const apiKeys = process.env.REACT_APP_API_KEYS;

  const inputElement = useRef();
 
  const searchRecipes = () => {
    const keywords = inputElement.current.value;
    const url = `${api}&q=${keywords}&app_id=${apiId}&app_key=${apiKeys}`;

    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data))
  };

  return ( 
      <section className="mt-5 recipes">
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