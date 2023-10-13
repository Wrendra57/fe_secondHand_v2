/* eslint-disable no-prototype-builtins */
// import React from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Stack,
  Button,
  Spinner,
} from "react-bootstrap";
// import { Navbar } from "../../components";
import imageLogin from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import "../../auth.css";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../store/apis/authentication";
import Swal from "sweetalert2";
function RegisterPage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const [registerHit, { isLoading, isError, error: errorRegister, isSuccess }] =
    useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    console.log(name);
    if (name === "") {
      console.log("Please enter");
      setError((error) => ({ ...error, name: "nama tidak boleh kosong" }));
      return;
    }
    if (email === "") {
      console.log("Please enter");
      setError((error) => ({ ...error, email: "email tidak boleh kosong" }));
      return;
    }
    if (password === "") {
      console.log("Please enter");
      setError((error) => ({
        ...error,
        password: "password tidak boleh kosong",
      }));
      return;
    }
    registerHit({ body: { name: name, email: email, password: password } });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        // position: "",
        icon: "success",
        title: "Berhasil mendaftar",
        showConfirmButton: false,
        timer: 1000,
      });

      setTimeout(() => {
        // dispatch(addEmail(formRef.current.email.value));
        Swal.fire({
          // position: "",
          // icon: "success",
          title: "Redirect login page ...",
          showConfirmButton: false,
          timer: 1000,
        });
      }, 500);
      navigate("/login");
    }

    if (isError) {
      setError((error) => ({ ...error, regis: errorRegister.data.message }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {error.hasOwnProperty("name") && error.name !== "" && (
                    <Form.Text className="text-danger">{error.name}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="formLabel">Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="formInput"
                    placeholder="Contoh: johndee@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error.hasOwnProperty("email") && error.email !== "" && (
                    <Form.Text className="text-danger">{error.email}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="formLabel">Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="formInput"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error.hasOwnProperty("password") &&
                    error.password !== "" && (
                      <Form.Text className="text-danger">
                        {error.password}
                      </Form.Text>
                    )}
                </Form.Group>
                {isLoading ? (
                  <Button
                    type="button"
                    className="btn-block w-100 mb-3 btnPrimary"
                    // onClick={(e) => handleSubmit(e)}
                    disabled
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Mendaftar
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="btn-block w-100 mb-3 btnPrimary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Daftar
                  </Button>
                )}

                {error.hasOwnProperty("regis") && error.regis !== "" && (
                  <Form.Text className="text-danger text-center">
                    {error.regis}
                  </Form.Text>
                )}
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
