/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Footer, Navbar, Sidebar } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetMyProductMutation } from "../../../../store/apis/product";
import { useState } from "react";
import Swal from "sweetalert2";
import { rupiahFormat } from "../../../../store/utils/format";

import { addProduct } from "../../../../store/slices/productSlice";
// import { rupiahFormat } from "../../../../store/utils/format";

function DaftarJual() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [offset] = useState(1);
  const [myProducts, setMyProducts] = useState([]);
  const [
    getListProductHit,
    {
      isLoading,
      isError,
      error: errorListProduct,
      isSuccess,
      data: dataListProduct,
    },
  ] = useGetMyProductMutation();

  useEffect(() => {
    getListProductHit({ token: token, offset: offset });
  }, [offset]);

  useEffect(() => {
    if (isLoading) {
      Swal.showLoading();
    }
    if (isSuccess) {
      Swal.close();
      // dispatch(addUser(dataAuth.data));
      // dispatch(addListProduct(dataListProduct.data));
      setMyProducts(dataListProduct.data);
    }

    if (isError) {
      Swal.close();
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: errorListProduct.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleJual = () => {
    dispatch(addProduct({}));
  };
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
            <Sidebar activeButton={"daftar-jual"} />
          </Col>
          <Col lg={9} md={12} xs={12}>
            <div className="row">
              <div
                className="col-md-4 col-xl-4 col-sm-12 mb-3"
                onClick={handleJual}
              >
                <Link
                  to={`/product/jual`}
                  className="text-decoration-none"
                  style={{ color: "black" }}
                >
                  <div
                    className="card cardProduct boxShadow pb-0 h-100"
                    style={{ border: "none", minHeight: "200px" }}
                  >
                    <div
                      className="d-flex flex-column justify-content-center align-items-center w-100 h-100  "
                      style={{
                        borderRadius: "4px",
                        border: "4px dashed #D0D0D0",
                        background: "#FFF",
                      }}
                    >
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.3333 5V19"
                          stroke="#8A8A8A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.33325 12H19.3333"
                          stroke="#8A8A8A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="fs-3">Tambah Produk</p>
                    </div>
                  </div>
                </Link>
              </div>
              {myProducts?.map((item) => {
                return (
                  <div
                    key={item.id_product}
                    className="col-md-4 col-xl-4 col-sm-12 mb-3"
                  >
                    <Link
                      to={`/product/${item.id_product}`}
                      className="text-decoration-none"
                      style={{ color: "black" }}
                    >
                      <div
                        className="card cardProduct boxShadow pb-0"
                        style={{ border: "none" }}
                      >
                        <div
                          className="d-flex justify-content-center  rounded"
                          style={{
                            // width: "200px",
                            height: "200px",
                            // objectFit: "cover",
                          }}
                        >
                          <img
                            className="card-img-top center-cropped m-1 img-fluid"
                            src={item.foto}
                            style={{
                              // width: "200px",
                              // height: "100px",
                              objectFit: "cover",
                            }}
                            alt="product_image"
                          />
                        </div>
                        <div className="card-body ">
                          <h6
                            className="card-title text-decoration-none mb-0"
                            style={{ fontSize: "14px" }}
                          >
                            {item.name_product}
                          </h6>
                          <p
                            className="text-decoration-none mb-0 fw-light"
                            style={{ fontSize: "10px" }}
                          >
                            {item.category}
                          </p>
                          <p
                            className="text-decoration-none mb-0"
                            style={{ fontSize: "14px" }}
                          >
                            {rupiahFormat(item.price)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default DaftarJual;
