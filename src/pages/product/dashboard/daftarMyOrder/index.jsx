/* eslint-disable react-hooks/exhaustive-deps */
// import React from "react";

import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { Navbar, Sidebar } from "../../../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useListMyOrderMutation } from "../../../../store/apis/order";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { rupiahFormat } from "../../../../store/utils/format";

function MyOrder() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [myOrders, setMyOrder] = useState([]);
  const [
    getListMyOrder,
    {
      isLoading,
      isError,
      error: errorListMyOrder,
      isSuccess,
      data: dataListMyOrder,
    },
  ] = useListMyOrderMutation();

  useEffect(() => {
    getListMyOrder({ token: token });
  }, []);

  useEffect(() => {
    if (isLoading) {
      Swal.showLoading();
    }
    if (isSuccess) {
      Swal.close();
      // dispatch(addUser(dataAuth.data));
      // dispatch(addListProduct(dataListProduct.data));

      setMyOrder(dataListMyOrder.data);
      console.log(dataListMyOrder);
    }

    if (isError) {
      Swal.close();
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: errorListMyOrder.data.message,
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
            <Sidebar activeButton={"my-order"} />
          </Col>
          <Col lg={9} md={12} xs={12} className="">
            <Row>
              {myOrders?.map((item, index) => {
                return (
                  <Col lg={12} md={12} xs={12} key={index}>
                    <Card className="p-3 mb-2">
                      <div className="d-flex">
                        <img
                          src={item.foto}
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
                          <p>tawaran saya : {rupiahFormat(item.offer)}</p>
                        </div>
                        <div className="border-start ps-4 d-flex flex-column justify-content-between">
                          <p>
                            Status :{" "}
                            <span className="text-danger">{item.status}</span>
                          </p>
                          <p className="mb-0 text-danger">{item.status}</p>

                          <div>
                            <Button>
                              <p className="mb-0" style={{ fontSize: "10px" }}>
                                Cek Detail Produk
                              </p>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MyOrder;
