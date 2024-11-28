import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:formData.fullName,
          email: formData.email, 
          password: formData.password,
          phone_number: formData.phone
        }),
      });

      const dataJson = await response.json();
      if (dataJson.error) {
        console.log("Register Failed: ", dataJson.error);
      } else {
        console.log("Register Success: ", dataJson.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Body = {
    background:
      'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://getwallpapers.com/wallpaper/full/9/a/7/375257.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Container fluid className="pb-5" style={{ ...Body, paddingTop: "6rem" }}>
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Create an Account</h2>
                <p className="text-muted">
                  Please fill in the details below to register
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-start w-100">
                    Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-start w-100">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-start w-100">
                    Phone Number
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-start w-100">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    size="lg"
                    style={{
                      backgroundColor: "#CBAE81",
                      borderColor: "#CBAE81",
                    }}
                    className="mb-3"
                  >
                    Sign Up
                  </Button>
                </div>

                <div className="text-center">
                  <span className="text-muted">Already have an account? </span>
                  <Button
                    variant="link"
                    onClick={() => navigate("/login")}
                    className="p-0 ms-1"
                    style={{ color: "#CBAE81" }}
                  >
                    Login
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

export default Register;
