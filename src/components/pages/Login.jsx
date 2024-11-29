import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const Body = {
    background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://cdn.wallpapersafari.com/96/90/6xToka.jpg")',
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.username, 
          password: formData.password,
        }),
      });

      const dataJson = await response.json();
      if (dataJson.error) {
        console.log("Login Failed: ", dataJson.error);
      } else {
        console.log("Login Success: ",dataJson.access_token);
        localStorage.setItem("access_token", dataJson.access_token);
        navigate("/")
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <Container fluid className="vh-100 pt-5" style={Body}>
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
           
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Welcome Back!</h2>
                <p className="text-muted">Please login to your account</p>
              </div>

           
              <Form onSubmit={handleSubmit}>
              
                <Form.Group className="mb-3">
                  <Form.Label className='text-start w-100'>Username</Form.Label>
                  <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your email" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className='text-start w-100'>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required/>
                </Form.Group>

                <Row className="mb-3">
                  <Col>
                    <Form.Check type="checkbox" label="Remember me" className="text-muted" />
                  </Col>

                  <Col className="text-end">
                    <Button variant="link" className="p-0" style={{ color: '#CBAE81' }} onClick={() => navigate('/forgot-password')}>Forgot Password?</Button>
                  </Col>
                </Row>

      
                <div className="d-grid gap-2">
                  <Button type="submit" size="lg"
                    style={{ 
                      backgroundColor: '#CBAE81',
                      borderColor: '#CBAE81'
                    }} className="mb-3" > Sign In</Button>
                </div>

     
                <div className="text-center">
                  <span className="text-muted">Don't have an account? </span>
                  <Button variant="link" onClick={() => navigate('/register')} className="p-0 ms-1"
                    style={{ color: '#CBAE81' }}>Sign up
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;