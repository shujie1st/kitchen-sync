import { Button, Card, Form } from 'react-bootstrap';
import {Link} from "react-router-dom"

function Signup() {

  return (
    <section className="signup">
      <div className="home-page-link"><Link to="/">Back to Homepage</Link></div>
       
      <Card className='signup-card'>
        <Card.Body>
          <h3>Sign Up</h3>
            
          <Form className='signup-form'>
            
            <Form.Group controlId="name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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