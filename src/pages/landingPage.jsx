/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
// import React from "react";

import { Button, Container } from "react-bootstrap";
import { CardLanding, CarouselSection, Footer, Navbar } from "../components";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useGetListProductMutation } from "../store/apis/product";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addListProduct } from "../store/slices/productSlice";
import { useNavigate } from "react-router-dom";

function landingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const kategori = ["Semua", "Pakaian", "Sepatu"];
  // const listProduct = useSelector((state) => state.product.listProduct);
  const [product, setProduct] = useState([]);
  const [
    getListProductHit,
    {
      isLoading,
      isError,
      error: errorListProduct,
      isSuccess,
      data: dataListProduct,
    },
  ] = useGetListProductMutation();
  useEffect(() => {
    getListProductHit({ limit: 25, offset: 1 });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // dispatch(addUser(dataAuth.data));
      dispatch(addListProduct(dataListProduct.data));
      setProduct(dataListProduct.data);
    }

    if (isError) {
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
  return (
    <>
      <Navbar />
      <CarouselSection />
      <Container className=" py-3 home">
        <p>Telusuri Kategori</p>
        <div
          className=" py-3 d-flex buttonradius12"
          style={{ overflowX: "auto" }}
        >
          {kategori?.map((item, index) => {
            return (
              <button
                key={index}
                className="btn btn-custom me-3 buttonradius12 "
                id="filtersemua"
                // onClick={handleAll}
                style={{
                  backgroundColor: "#7126B5",
                  color: "#ffffff",
                }}
              >
                <FiSearch /> {item}
              </button>
            );
          })}
        </div>
        <div id="card">
          <div className="row">
            {product?.map((item, index) => {
              // console.log(item);
              return <CardLanding item={item} key={index} />;
            })}
          </div>
        </div>
        <div className="d-flex justify-content-center sticky">
          <Button variant="info" onClick={() => navigate("/product/jual")}>
            <FiPlus /> Jual
          </Button>
          {/* <button
            className="btn btn-custom me-3 sticky active buttonradius12 btnJual py-2"
            style={{ width: "115px" }}
          >
            
          </button> */}
        </div>
        <Footer />
      </Container>
    </>
  );
}

export default landingPage;
