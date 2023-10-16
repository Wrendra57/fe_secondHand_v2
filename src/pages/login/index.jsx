/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
// import React from "react";

import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import imageLogin from "../../assets/login.png";
// import { Fragment } from "react";
import google from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../store/apis/authentication";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addToken, emptyToken } from "../../store/slices/authSlice";
function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const [
    loginHit,
    { isLoading, isError, error: errorLogin, isSuccess, data: dataLogin },
  ] = useLoginMutation();

  useEffect(() => {
    dispatch(emptyToken());
  }, []);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError({});
      if (email === "") {
        setError((error) => ({ ...error, email: "email tidak boleh kosong" }));
        return;
      }
      if (password === "") {
        setError((error) => ({
          ...error,
          password: "password tidak boleh kosong",
        }));
        return;
      }
      loginHit({ body: { email: email, password: password } });
    } catch (error) {
      console.log("asdads");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(addToken(dataLogin.data.token));
      Swal.fire({
        icon: "success",
        title: "Berhasil Login",
        showConfirmButton: false,
        timer: 1000,
      });

      setTimeout(() => {
        Swal.fire({
          title: "Redirect halaman awal",
          showConfirmButton: false,
          timer: 1000,
        });
      }, 500);
      navigate("/");
    }

    if (isError) {
      setError((error) => ({ ...error, login: errorLogin.data.message }));
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: errorLogin.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <>
      <Container fluid>
        <Row className="h-100 align-items-center">
          <Col lg={6} className="m-0 p-0 cover-image">
            <img src={imageLogin} alt="" className="img-fluid image-login" />
          </Col>
          <Col lg={6}>
            <Form className="formAuth">
              <h3 className="fw-bold mb-3">Masuk</h3>
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
              </Form.Group>{" "}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="formLabel">Password</Form.Label>
                <Form.Control
                  type="password"
                  className="formInput"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
                {error.hasOwnProperty("password") && error.password !== "" && (
                  <Form.Text className="text-danger">
                    {error.password}
                  </Form.Text>
                )}
              </Form.Group>
              <Button
                type="button"
                className="btn-block w-100 mb-3 btnPrimary"
                onClick={(e) => handleSubmit(e)}
                disabled={isLoading ? true : false}
              >
                {isLoading ? (
                  <>
                    {" "}
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Login ...
                  </>
                ) : (
                  <>Masuk</>
                )}
              </Button>
              {error.hasOwnProperty("login") && error.login !== "" && (
                <Form.Text className="text-danger text-center">
                  {error.login}
                </Form.Text>
              )}
              <div className={{ marginTop: "20px" }}>
                <p>
                  {" "}
                  Lupa Password ?{" "}
                  <Link
                    to="/lupa-password"
                    style={{ color: "#4b1979", fontWeight: "normal" }}
                  >
                    Klik disini
                  </Link>
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  variant="success"
                  className="mb-3"
                  style={{
                    height: "40px",
                    color: "black",
                    backgroundColor: "white",
                  }}
                  // onClick={() => googleLogin()}
                >
                  <div className="d-flex justify-content-center">
                    <img
                      src={google}
                      width={25}
                      height={25}
                      style={{ marginRight: "10px" }}
                      alt=""
                    />
                    <p>Masuk dengan Google</p>
                  </div>
                </Button>
              </div>
              <div className="mt-3 d-flex justify-content-center">
                <Stack direction="horizontal" gap={1}>
                  <p>Belum punya akun?</p>
                  <Link to="/register">
                    <p style={{ color: "#4b1979", fontWeight: "bold" }}>
                      Daftar di sini
                    </p>
                  </Link>
                </Stack>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginPage;
