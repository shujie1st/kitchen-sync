import { Button, Card, Form } from 'react-bootstrap';

function Signup() {
  return (
    <section className="signup">
       
      <Card>
        <Card.Body>
          <h3>Sign Up</h3>
            
          <Form className='signup-from'>
            
            <Form.Group controlId="first-name">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" />
            </Form.Group>

            <Form.Group controlId="last-name">
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