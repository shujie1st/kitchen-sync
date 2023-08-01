import { Button, Form, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <Alert variant="danger">{message}</Alert>

        <Form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <br></br>
            <Form.Control type="email" placeholder="Enter email" ref={inputEmail} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <br></br>
            <Form.Control type="password" placeholder="Password" ref={inputPassword} />
          </Form.Group>
          
          <Button type="submit">
            Submit
          </Button>
        </Form>

      </section>
  );
}

export default Login;