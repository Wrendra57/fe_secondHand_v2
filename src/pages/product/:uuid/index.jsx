/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Carousel } from "react-bootstrap";
import NavBar from "../../../components/navbar";
import { rupiahFormat } from "../../../store/utils/format";
import { useGetProductMutation } from "../../../store/apis/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Modals } from "../../../components";
import { useSelector } from "react-redux";
import {
  useCheckStatusOrderMutation,
  useCreateOrderMutation,
} from "../../../store/apis/order";

function DetailProduct() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [foto, setFoto] = useState([]);
  const [description, setDescription] = useState();
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [avatar, setAvatar] = useState();
  const [city, setCity] = useState();
  const [sellerName, setSellerName] = useState();
  const [idSeller, setIdSeller] = useState();
  const [showModal, setShowModal] = useState(false);
  const [offerPrice, setOfferPrice] = useState();
  const [statusOffer, setStatusOffer] = useState(false);
  const [
    getProductHit,
    { isLoading, isError, error: errorProduct, isSuccess, data: dataProduct },
  ] = useGetProductMutation();

  const [
    createOrderHit,
    {
      isLoading: isLoadingCreateOrder,
      isError: isErrorCreateOrder,
      error: errorCreateOrder,
      isSuccess: isSuccessCreateOrder,
      // data: dataCreateOrder,
    },
  ] = useCreateOrderMutation();

  const [
    checkStatusOrderHit,
    {
      isLoading: isLoadingCheckStatus,
      isError: isErrorCheckStatus,
      error: errorCheckStatus,
      isSuccess: isSuccessCheckStatus,
      data: dataCheckStatus,
    },
  ] = useCheckStatusOrderMutation();

  useEffect(() => {
    getProductHit({ id: id });
    if (token || token !== "") {
      checkStatusOrderHit({ token: token, id_product: id });
    }
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
      setIdSeller(dataProduct.data.id_seller);
      setOfferPrice(dataProduct.data.price);
      // console.log(dataProduct.data);
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

  const handleModal = () => {
    console.log("modal handleModal");
    if (statusOffer) {
      Swal.fire({
        // position: "",
        icon: "success",
        title: "berhasil menawar",
        text: "Silahkan menunggu respon penjual",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    if (!token || token === "") {
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: "Silahkan login",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    setShowModal((prev) => !prev);
  };

  const handleCreateOrder = () => {
    if (!offerPrice || offerPrice === "") {
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: "harga tawar tidak boleh kosong",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    if (!token || token === "") {
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: "Silahkan login",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    createOrderHit({
      body: { price: offerPrice },
      token: token,
      id_product: id,
    });
  };

  useEffect(() => {
    if (isSuccessCreateOrder) {
      setStatusOffer(true);
      setShowModal(false);
      Swal.fire({
        // position: "",
        icon: "success",
        title: "berhasil menawar",
        text: "Silahkan menunggu respon penjual",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    if (isErrorCreateOrder) {
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: errorCreateOrder.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingCreateOrder]);
  
  useEffect(() => {
    if (isSuccessCheckStatus) {
      setStatusOffer(() => dataCheckStatus.data);
    }

    if (isErrorCheckStatus) {
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: errorCheckStatus.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingCheckStatus]);
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
              <div className="des boxShadow mt-4 p-3">
                <h6 className="fs-3">Deskripsi</h6>
                <div
                  className="mb-0 mt-3 "
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
                {idSeller === user.uuid ? (
                  <>
                    {" "}
                    <Button
                      variant="info"
                      className="buton-outline mb-3"
                      onClick={handleModal}
                      disabled={isLoading}
                    >
                      {" "}
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      className=" mb-3"
                      onClick={handleModal}
                      disabled={isLoading}
                    >
                      {" "}
                      Hapus
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="info"
                      className="buton-outline mb-3"
                      onClick={handleModal}
                      disabled={isLoading || statusOffer}
                    >
                      {" "}
                      Saya tertarik dan ingin nego
                    </Button>
                    <p className="text-danger" hidden={!statusOffer}>
                      Sudah melakukan tawar, silahkan menunggu respon penjual
                    </p>
                  </>
                )}
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
      <Modals
        show={showModal}
        onClick={handleModal}
        avatar={foto[0]}
        price={offerPrice}
        productName={productName}
        setOfferPrice={setOfferPrice}
        handleCreateOrder={handleCreateOrder}
        isLoadingCreateOrder={isLoadingCreateOrder}
      />
    </>
  );
}

export default DetailProduct;
