/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
// import React from "react";

import { Button, Container } from "react-bootstrap";
import { CardLanding, CarouselSection, Footer, Navbar } from "../components";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useGetListProductMutation } from "../store/apis/product";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { addListProduct } from "../store/slices/productSlice";
import { useNavigate } from "react-router-dom";

function landingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const kategori = ["Semua", "Pakaian", "Sepatu"];
  // const listProduct = useSelector((state) => state.product.listProduct);

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

  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    getListProductHit({ limit: 12, offset: page });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (document.getElementById("list")) {
        console.log(containerRef);
        const bottom = document
          .getElementById("list")
          .getBoundingClientRect().bottom;
        if (bottom < window.innerHeight - 70) {
          getListProductHit({ limit: 12, offset: page });
        }
      }
      return;
    };
    if (isLoading) {
      Swal.showLoading();
      window.removeEventListener("scroll", handleScroll);
    }
    if (isSuccess) {
      Swal.close();
      setLoadingFirst(false);
      // dispatch(addUser(dataAuth.data));
      dispatch(addListProduct(dataListProduct.data));
      setProduct((prev) => [...prev, ...dataListProduct.data]);
      setPage((prev) => prev + 1);
      const datanya = dataListProduct.data;
      if (datanya.length !== 0) {
        window.addEventListener("scroll", handleScroll);
      } else {
        if (product.length !== 0 && datanya.length === 0) {
          setIsEnded(true);
        }
      }
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
        <div id="list" ref={containerRef}>
          <div className="row">
            {product.length !== 0
              ? product?.map((item, index) => {
                  // console.log(item);
                  return <CardLanding item={item} key={index} />;
                })
              : ""}
            {/* {loadingFirst
              ? [...Array(10).keys()].map((el, i) => {
                  return (
                    <div key={i} className="skeleton">
                      loading
                    </div>
                  );
                })
              : ""} */}
            <div className="text-center">
              &nbsp;
              {isLoading && !loadingFirst
                ? "Loading..."
                : isError && !loadingFirst
                ? "Data gagal diambil"
                : product.length === 0 && !loadingFirst
                ? "Kos tidak ditemukan"
                : isEnded && !loadingFirst
                ? "Akhir dari list"
                : ""}
            </div>
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
