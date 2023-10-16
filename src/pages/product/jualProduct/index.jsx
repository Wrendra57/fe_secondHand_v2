/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
import { Navbar } from "../../../components";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
// import { rupiahFormat } from "../../../store/utils/format";
import { NumericFormat } from "react-number-format";
import fi_plus from "../../../assets/fi_plus.png";
import { imgAllow } from "../../../store/utils/format";
import { Button, Spinner } from "react-bootstrap";
import { useCreateProductMutation } from "../../../store/apis/product";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
function JualProduk() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [name, setName] = useState();
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [stock, setStock] = useState(0);
  const [error, setError] = useState({});
  const [files, setFiles] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState([]);
  const [isTriger, setIsTrigger] = useState(true);

  const [
    createProductHit,
    { isLoading, isError, error: errorCreate, isSuccess, data: dataCreate },
  ] = useCreateProductMutation();

  useEffect(() => {
    if (!token || token === "") {
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Token not foun",
        text: "Silahkan Login kembali",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
      return;
    }
    if (user.hasOwnProperty("uuid") === false) {
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Silahkan login kembali",
        // text: errorAuth.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/");
      return;
    }
    if (user.hasOwnProperty("no_hp") && user.no_hp === null) {
      console.log("jalan");
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Data belum lengkap",
        text: "Silahkan melengkapi data",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/profile");
      return;
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    console.log(description);
    if (name === "" || !name) {
      setError((prev) => ({
        ...prev,
        name: "Nama Produk tidak boleh kosong",
      }));
      return;
    }
    if (price <= 0 || !price) {
      setError((prev) => ({
        ...prev,
        price: "Harga produk tidak boleh kosong",
      }));
      return;
    }
    if (category === "" || !category) {
      setError((prev) => ({
        ...prev,
        category: "Kategori produk tidak boleh kosong",
      }));
      return;
    }
    if (description === "" || !description) {
      setError((prev) => ({
        ...prev,
        description: "Deskripsi produk tidak boleh kosong",
      }));
      return;
    }
    if (stock === "" || !stock || stock <= 0) {
      setError((prev) => ({
        ...prev,
        stock: "Stock produk tidak boleh kosong",
      }));
      return;
    }
    if (files.length === 0 || files.length > 4) {
      setError((prev) => ({
        ...prev,
        photo: "Foto produk minimal 1 dan maksimal 4",
      }));
      return;
    }

    const payload = new FormData();

    payload.append("name_product", name);
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

  const inputFotoHandler = (e) => {
    e.preventDefault();
    setError((error) => ({ ...error, photo: "" }));
    // console.log(e.target.files);

    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedPhoto(undefined);
      return;
    }

    if (!imgAllow.includes(e.target.files[0].type)) {
      setError((error) => ({
        ...error,
        photo: "Foto bukan gambar yang didukung!",
      }));
      // formRef.current.foto.scrollIntoView();
      return;
    }

    setFiles((prev) => [...prev, e.target.files[0]]);
    setIsTrigger((prev) => !prev);
  };

  useEffect(() => {
    if (files.length === 0) {
      setPreviewPhoto([]);
      return;
    }
    let objectUrl = URL.createObjectURL(files[files.length - 1]);
    setPreviewPhoto((prev) => [...prev, objectUrl]);
    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTriger]);

  const deletePhoto = (param) => {
    console.log(param);
    const arr = previewPhoto.filter((item, index) => index !== param);
    const arr2 = files.filter((item, index) => index !== param);
    // const updatedItems = items.filter((item) => item.id !== idToDelete);
    console.log("arr");
    console.log(arr);
    console.log(arr2);
    setFiles(arr2);
    setPreviewPhoto(arr);
  };
  const handleBack = () => {
    navigate(-1);
  };
  // console.log(ref);
  return (
    <>
      <Navbar />
      <div className="container my5">
        <div className="d-flex my-5 w-100 align-items-center">
          <div
            onClick={handleBack}
            className="cursor-pointer  "
            style={{ width: "24px" }}
          >
            {" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5"
                stroke="#151515"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="#151515"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="flex-fill bg-danger text-center">Tambah Produk</h2>
        </div>
        <form style={{ maxWidth: "800px" }} className="mx-auto">
          <div>
            <div className="mb-3">
              <label htmlFor="namaproduk" className="form-label">
                Nama Produk<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="namaproduk"
                placeholder="Nama Produk"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error.hasOwnProperty("name") && error.name !== "" && (
                <p className="text-danger">{error.name}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="harga" className="form-label">
                Harga Produk<span style={{ color: "red" }}>*</span>
              </label>
              <NumericFormat
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp. "
                value={price}
                // format="### ###"
                mask="Rp 00"
                onValueChange={(values) => {
                  setPrice(values.floatValue);
                }}
                className="form-control"
              />
              {error.hasOwnProperty("price") && error.price !== "" && (
                <p className="text-danger">{error.price}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="kategori" className="form-label">
                Kategori<span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-select"
                id="kategori"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Pilih Kategori</option>
                <option value="Hobi">Hobi</option>
                <option value="Kendaraan">Kendaraan</option>
                <option value="Baju">Baju</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Kesehatan">Kesehatan</option>
              </select>
              {error.hasOwnProperty("category") && error.category !== "" && (
                <p className="text-danger">{error.category}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="deskripsi" className="form-label">
                Deskripsi<span style={{ color: "red" }}>*</span>
              </label>
              <ReactQuill
                className="mb-3 pb-2"
                theme="snow"
                defaultValue={description}
                onChange={(e) => setDescription(e)}
                // ref={(ref) => (formRef.current.deskripsi = ref)}
              />
              {error.hasOwnProperty("description") &&
                error.description !== "" && (
                  <p className="text-danger">{error.description}</p>
                )}
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                placeholder="0"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              {error.hasOwnProperty("stock") && error.stock !== "" && (
                <p className="text-danger">{error.stock}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="deskripsi" className="form-label">
                Foto Produk (maks 4 foto)<span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <div className="row">
                  {previewPhoto?.map((item, index) => {
                    console.log(index);
                    return (
                      <div className="col-md-3 " key={index}>
                        <div className="d-flex h-100 flex-column justify-content-start align-items-center ">
                          <img
                            src={item}
                            alt=""
                            className="w-100 bg-success"
                            style={{
                              borderRadius: "12px",
                            }}
                          />
                          <Button
                            variant="link"
                            onClick={() => deletePhoto(index)}
                          >
                            {index}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  {files?.length < 4 && (
                    <div className="col-md-3">
                      <label
                        className="bg-danger cursor-pointer"
                        htmlFor="file-input"
                      >
                        <img
                          src={fi_plus}
                          alt=""
                          style={{
                            borderStyle: "dashed",
                            padding: "34px",
                            borderRadius: "12px",
                            width: "96px",
                            borderColor: "#d0d0d0",
                          }}
                        />
                        <input
                          id="file-input"
                          style={{ display: "none" }}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          placeholder="Upload Image"
                          onChange={inputFotoHandler}
                          // onChange={(e) => }
                          // multiple
                        />
                      </label>
                    </div>
                  )}
                  {error.hasOwnProperty("photo") && error.photo !== "" && (
                    <p className="text-danger">{error.photo}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn"
                    disabled={isLoading}
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: "16px",
                      color: "black",
                      borderColor: "#7126B5",
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      backgroundColor: "#7126B5",
                      borderRadius: "16px",
                    }}
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default JualProduk;
