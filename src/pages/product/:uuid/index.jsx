/* eslint-disable react-hooks/exhaustive-deps */
import { Carousel } from "react-bootstrap";
import NavBar from "../../../components/navbar";
import { rupiahFormat } from "../../../store/utils/format";
import { useGetProductMutation } from "../../../store/apis/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function DetailProduct() {
  const { id } = useParams();
  const [foto, setFoto] = useState([]);
  const [description, setDescription] = useState();
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [avatar, setAvatar] = useState();
  const [city, setCity] = useState();
  const [sellerName, setSellerName] = useState();

  const [
    getProductHit,
    { isLoading, isError, error: errorProduct, isSuccess, data: dataProduct },
  ] = useGetProductMutation();
  useEffect(() => {
    getProductHit({ id: id });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // dispatch(addUser(dataAuth.data));
      // dispatch(addListProduct(dataProduct.data));
      setFoto(dataProduct.data.foto);
      setDescription(dataProduct.data.description);
      setProductName(dataProduct.data.name_product);
      setPrice(dataProduct.data.price);
      setCategory(dataProduct.data.category);
      setAvatar(dataProduct.data.avatar);
      setCity(dataProduct.data.city);
      setSellerName(dataProduct.data.name_seller);
    }

    if (isError) {
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: errorProduct.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <>
      <div className="container">
        <NavBar />
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
                <button
                  className="btn btn-custom mb-2 "
                  // onClick={() => handleEdit(detailProduct.id)}
                >
                  {" "}
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger mb-2 "
                  // onClick={() => handleDestroy(detailProduct.id)}
                >
                  {" "}
                  Hapus
                </button>
                <button
                  className="btn btn-custom mb-2 "
                  type="button"
                  // onClick={() => setModalShow(true)}
                  id="suksesnego"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Saya tertarik dan ingin nego
                </button>
                <button
                  className="btn btn-custom mb-2 "
                  // onClick={() => setModalShow(true)}
                  id="suksesnego"
                  disabled
                >
                  Saya tertarik dan ingin nego
                </button>
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

export default DetailProduct;
