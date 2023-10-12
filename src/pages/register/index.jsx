// import React from 'react'
import { Container, Row, Col, Form, Stack, Button } from "react-bootstrap";
// import { Navbar } from "../../components";
import imageLogin from "../../assets/login.png";
import { Link } from "react-router-dom";
import "../../auth.css";
function RegisterPage() {
  return (
    <>
      <div className="vh-100">
        <Container fluid>
          <Row className="h-100 align-items-center">
            <Col lg={6} className="m-0 p-0 cover-image vh-100">
              <img
                src={imageLogin}
                className="img-fluid image-login h-100"
                alt=""
              />
            </Col>
            <Col lg={6}>
              <Form className="formAuth">
                <h3 className="fw-bold mb-3">Daftar</h3>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="formLabel">Nama</Form.Label>
                  <Form.Control
                    type="text"
                    className="formInput"
                    placeholder="Nama Lengkap"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="formLabel">Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="formInput"
                    placeholder="Contoh: johndee@gmail.com"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="formLabel">Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="formInput"
                    placeholder="Masukkan password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="button"
                  className="btn-block w-100 mb-3 btnPrimary"
                  // onClick={() => handleSubmit()}
                >
                  Daftar
                </Button>
                <div className="mt-3 d-flex justify-content-center">
                  <Stack direction="horizontal" gap={1}>
                    <p>Sudah punya akun?</p>
                    <Link to="/login">
                      <p style={{ color: "#4b1979", fontWeight: "bold" }}>
                        Masuk di sini
                      </p>
                    </Link>
                  </Stack>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default RegisterPage;
