import { Button, Form } from "react-bootstrap";

function Login(){
  return ( 
      <section className="login">

        <Form className="login-form">
          <h2>Login</h2>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <br></br>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <br></br>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          
          <Button type="submit">
            Submit
          </Button>
        </Form>

      </section>
  );
}

export default Login;