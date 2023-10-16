/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../../components";
import { Button, Carousel, Spinner } from "react-bootstrap";
import { rupiahFormat } from "../../../store/utils/format";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../../store/apis/product";
import Swal from "sweetalert2";
import { addProduct } from "../../../store/slices/productSlice";

function Preview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [foto, setFoto] = useState([]);
  const [description, setDescription] = useState();
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [avatar, setAvatar] = useState();
  const [city, setCity] = useState();
  const [sellerName, setSellerName] = useState();
  const [files, setFiles] = useState([]);
  const [stock, setStock] = useState();

  const [
    createProductHit,
    { isLoading, isError, error: errorCreate, isSuccess, data: dataCreate },
  ] = useCreateProductMutation();

  useEffect(() => {
    if (product.hasOwnProperty("photoUrl")) {
      setFoto(product.photoUrl);
      setDescription(product.description);
      setProductName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setAvatar(user.photo_profile);
      setCity(user.city);
      setSellerName(user.name);
      setFiles(product.files);
      setStock(product.stock);
    }
    console.log(product);
  }, []);
  const handleEditData = () => {
    navigate("/product/jual");
  };
  const handleDelete = () => {
    dispatch(addProduct({}));
    navigate("/product/jual");
  };
  const handleSubmit = () => {
    const payload = new FormData();

    payload.append("name_product", productName);
    payload.append("price", price);
    payload.append("category", category);
    payload.append("stock", stock);
    payload.append("description", description);

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        payload.append("photo", files[i]);
      }
    }
    console.log(payload);

    createProductHit({ body: payload, token: token });
  };

  useEffect(() => {
    if (isLoading) {
      Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        title: "Uploading ...",
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    if (isSuccess) {
      // dispatch(addUser(dataUpdate.data));
      Swal.close();
      console.log(dataCreate);
      Swal.fire({
        icon: "success",
        title: "Berhasil upload",
        showConfirmButton: false,
        timer: 5000,
      });
    }

    if (isError) {
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: errorCreate.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="container-fluid mt-5">
          <div className="row mx-auto mb-3">
            <div className="col-xl-8 col-sm-12">
              <Carousel className="boxCarousel">
                {foto?.map((item, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100 boxImagePreview buttonradius20"
                        src={item}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
              <div className="des boxShadow mt-4">
                <h6 className="">Deskripsi</h6>
                <div
                  // className="mb-0 mt-3"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>
            <div className="col-xl-4 col-sm-12">
              <div className="card cardProduct p-3 mt-1 boxShadow mb-2">
                <h6 className="card-title " style={{ fontSize: "16px" }}>
                  {productName}
                </h6>
                <p style={{ fontSize: "12px" }}>{category}</p>
                <p style={{ fontSize: "16px" }}>{rupiahFormat(price)}</p>
                <Button
                  variant="info"
                  className="buton-outline mb-3"
                  onClick={handleEditData}
                  disabled={isLoading}
                >
                  {" "}
                  Ubah Data
                </Button>
                <Button
                  variant="outline-danger"
                  className="mb-3"
                  disabled={isLoading}
                  onClick={handleDelete}
                >
                  Hapus / Batal tambah
                </Button>
                <Button
                  variant="outline-danger"
                  className="buton-outline mb-3"
                  onClick={handleSubmit}
                  disabled={isLoading}
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
                        className="me-2"
                      />
                      Mengupload ...
                    </>
                  ) : (
                    <>Terbitkan</>
                  )}
                </Button>
              </div>
              <div className="card infoSeller">
                <div className="row">
                  <div className="col-2">
                    {" "}
                    <img
                      src={avatar}
                      alt="profilpenjual"
                      style={{ width: "50px" }}
                    />
                  </div>
                  <div className="col-10">
                    <h6>{sellerName}</h6>
                    <p>{city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Preview;
