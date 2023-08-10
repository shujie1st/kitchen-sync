import { Button, Form, Alert, Card } from "react-bootstrap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

function Login(props){
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const inputEmail = useRef();
  const inputPassword = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail.current.value,
          password: inputPassword.current.value
        }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.status === 200) {
        props.setFirstName(data.firstName);
        navigate("/");
        console.log("Login successful")
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  }


  return ( 
      <section className="login">

        <div className="home-page-link"><Link style={{color:"#32324D"}} to="/">Back to Homepage</Link></div>

        <Card className='login-card'>
          <Card.Body>
            {message && <Alert variant="danger">{message}</Alert>}
            <h3>Login</h3>

            <Form className="login-form" onSubmit={handleSubmit}>
              
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={inputEmail} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={inputPassword} />
              </Form.Group>
              
              <Button type="submit">
                Submit
              </Button>
            </Form>

          </Card.Body>
        </Card>

      </section>
  );
}

export default Login;