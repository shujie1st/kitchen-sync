import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

function Signup(props) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  
  const inputFirstName = useRef();
  const inputLastName= useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // check both the password and confirm password match
    // then send request to create new user
    if (inputPassword.current.value !== inputConfirmPassword.current.value) {
      setMessage("Passwords don't match");
    } else {
      try {
        const response = await fetch("http://localhost:3001/register", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: inputFirstName.current.value,
            lastName: inputLastName.current.value, 
            email: inputEmail.current.value,
            password: inputPassword.current.value
          }),
        });
  
        const data = await response.json();
        setMessage(data.message);
  
        if (response.status === 200) {
          props.setFirstName(data.firstName);
          navigate("/");
          console.log("User registered successfully.")
        } else {
          console.log("Failed to register user.");
        }
      } catch (error) {
        console.error(error);
      }
    }  
  }

  return (
    <section className="signup">
      <div className="home-page-link"><Link to="/">Back to Homepage</Link></div>
       
      <Card className='signup-card'>
        <Card.Body>
          {message && <Alert variant="danger">{message}</Alert>}
          <h3>Sign Up</h3>
            
          <Form className='signup-form' onSubmit={handleSubmit}>
            
            <Form.Group controlId="name">
              <Form.Label>First Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter First Name" ref={inputFirstName} />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter Last Name" ref={inputLastName} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" ref={inputEmail} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" ref={inputPassword} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" ref={inputConfirmPassword} />
            </Form.Group>

            <Button type="submit">
              Create Account
            </Button>
          </Form>
      
        </Card.Body>
      </Card>

    </section>
  )

}

export default Signup;