/* eslint-disable react-hooks/exhaustive-deps */
// import React from "react";

import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { Navbar, Sidebar } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useListMyOfferMutation } from "../../../../store/apis/order";
import Swal from "sweetalert2";
import { rupiahFormat } from "../../../../store/utils/format";

function ProductOffered() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [myOffer, setMyOffer] = useState([]);

  const [
    getListMyOffer,
    {
      isLoading,
      isError,
      error: errorListMyOffer,
      isSuccess,
      data: dataListMyOffer,
    },
  ] = useListMyOfferMutation();

  useEffect(() => {
    getListMyOffer({ token: token });
  }, []);

  useEffect(() => {
    if (isLoading) {
      Swal.showLoading();
    }
    if (isSuccess) {
      Swal.close();
      // dispatch(addUser(dataAuth.data));
      // dispatch(addListProduct(dataListProduct.data));

      setMyOffer(dataListMyOffer.data);
      console.log(dataListMyOffer);
    }

    if (isError) {
      Swal.close();
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: errorListMyOffer.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <>
      <Navbar />
      <Container>
        <Row className="justify-content-md-center mt-5 mb-3">
          <Col>
            <h4 className="fw-bold">Daftar Jual Saya</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Stack direction="horizontal" gap={3} className="infoPenjual">
              {" "}
              <img
                src={user.photo_profile}
                alt=""
                className="image-profile rounded"
              />
              <div>
                <h5 className="my-auto">{user.name}</h5>
                <p className="my-auto">{user.city}</p>
              </div>
              <Button
                variant={"outline-info"}
                className=" me-2 ms-auto"
                onClick={() => navigate("/profile")}
              >
                Edit
              </Button>
            </Stack>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg={3} md={12} xs={12}>
            <Sidebar activeButton={"my-offer"} />
          </Col>
          <Col lg={9} md={12} xs={12} className="">
            <Row>
              {myOffer?.map((item, index) => {
                return (
                  <Link to={"/"} key={index} className="text-decoration-none">
                    <Col lg={12} md={12} xs={12}>
                      {" "}
                      <Card className="p-3 mb-2">
                        <div className="d-flex">
                          <img
                            src={item.url}
                            className="img-fluid"
                            style={{ maxWidth: "250px" }}
                          />
                          <div className="flex-fill px-2 d-flex flex-column  justify-content-between">
                            <div>
                              <h4>{item.name_product}</h4>
                              <p style={{ fontSize: "12px" }}>
                                {rupiahFormat(item.price)}
                              </p>
                            </div>
                            <p>Ditawar: {rupiahFormat(item.offer_price)}</p>
                          </div>
                          <div className="border-start ps-4 d-flex flex-column justify-content-between">
                            <p>
                              Status :{" "}
                              {item.isAccept === null ? (
                                <span className="text-danger">
                                  segera konfirmasi
                                </span>
                              ) : (
                                <></>
                              )}
                              <span className="text-danger">{item.status}</span>
                            </p>

                            <p className="mb-0 text-danger">{item.status}</p>

                            <div>
                              {item.isAccept === null ? (
                                <>
                                  <Button className="buton-outline">
                                    <p
                                      className="mb-0"
                                      style={{ fontSize: "10px" }}
                                    >
                                      Konfirmasi
                                    </p>
                                  </Button>
                                </>
                              ) : (
                                <Button className="buton-outline">
                                  <p
                                    className="mb-0"
                                    style={{ fontSize: "10px" }}
                                  >
                                    Cek Detail Order
                                  </p>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Link>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductOffered;
