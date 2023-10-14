/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
// import React from "react";
import NavBar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { imgAllow } from "../../store/utils/format";
import { useUpdateUserMutation } from "../../store/apis/authentication";
import { addUser } from "../../store/slices/authSlice";
import { Spinner } from "react-bootstrap";
// import { Button } from "react-bootstrap";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [name, setName] = useState("");
  const [photoProfile, setPhotoProfile] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});

  const [selectedPhoto, setSelectedPhoto] = useState();
  console.log(email);
  useEffect(() => {
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
    setName(user.name);
    setPhotoProfile(user.photo_profile);
    setCity(user.city);
    setAddress(user.address);
    setNoHp(user.no_hp);
    setEmail(user.email);
  }, [user]);

  const [
    updateUserHit,
    { isLoading, isError, error: errorUpdate, isSuccess, data: dataUpdate },
  ] = useUpdateUserMutation();

  const handleSubmitUpdate = async (e) => {
    try {
      setError({});
      e.preventDefault();
      if (name === "" || !name) {
        setError((eror) => ({ ...eror, name: "Nama tidak boleh kosong" }));
        return;
      }
      if (city === "" || !city) {
        setError((eror) => ({ ...eror, city: "Kota tidak boleh kosong" }));
        return;
      }
      if (address === "" || !address) {
        setError((eror) => ({
          ...eror,
          address: "Alamat tidak boleh kosong",
        }));
        return;
      }
      if (noHp === "" || !noHp) {
        setError((eror) => ({ ...eror, noHp: "No HP tidak boleh kosong" }));
        return;
      }
      const payload = new FormData();
      payload.append("name", name);
      payload.append("city", city);
      payload.append("address", address);
      payload.append("noHp", noHp);

      if (selectedPhoto) {
        payload.append("photo", selectedPhoto);
      }
      updateUserHit({ body: payload, token: token });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(addUser(dataUpdate.data));
      Swal.fire({
        icon: "success",
        title: "Berhasil Update",
        showConfirmButton: false,
        timer: 500,
      });
    }

    if (isError) {
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: errorUpdate.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const changeFotoDalamHandler = (e) => {
    e.preventDefault();
    setError((error) => ({ ...error, avatar: "" }));

    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedPhoto(undefined);
      return;
    }
    if (!imgAllow.includes(e.target.files[0].type)) {
      setError((error) => ({
        ...error,
        avatar: "Foto dalam kamar bukan gambar yang didukung!",
      }));
      // formRef.current.foto.scrollIntoView();
      return;
    }

    setSelectedPhoto(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedPhoto) {
      setPhotoProfile(user.photo_profile);
      return;
    }

    let objectUrl = URL.createObjectURL(selectedPhoto);
    setPhotoProfile(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhoto]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <NavBar />
      <section>
        <form>
          <div className="container" style={{ padding: "30px", width: "70%" }}>
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
            <div className="w-100   text-center">
              <img
                src={photoProfile}
                alt=""
                className="rounded  mb-3   "
                style={{ maxHeight: "100px", width: "100px" }}
              />{" "}
            </div>
            <div className="w-100 text-center">
              <label
                htmlFor="file-input"
                className=" text-decoration-none text-primary fw-bold "
                // style={{
                //   justifyContent: "center",
                //   display: "flex",
                //   alignItems: "center",
                // }}
              >
                <h6 className="cursor-pointer">Ganti foto</h6>
              </label>
              <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png"
                disabled={isLoading}
                onChange={changeFotoDalamHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama<span style={{ color: "red}" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="nama"
                placeholder="Nama"
                required
                disabled={isLoading}
                style={{ borderRadius: "16px" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error.hasOwnProperty("name") && error.name !== "" && (
                <p className="text-danger">{error.name}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="kota" className="form-label">
                Kota<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="kota"
                placeholder="Kota"
                required
                disabled={isLoading}
                style={{ borderRadius: "16px" }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />{" "}
              {error.hasOwnProperty("city") && error.city !== "" && (
                <p className="text-danger">{error.city}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="alamat" className="form-label">
                Alamat<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="alamat"
                placeholder="contoh: Jalan Ikan Hiu 33"
                required
                disabled={isLoading}
                style={{ borderRadius: "16px" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />{" "}
              {error.hasOwnProperty("address") && error.address !== "" && (
                <p className="text-danger">{error.address}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="nohp" className="form-label">
                No. Handphone<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="nohp"
                placeholder="contoh: 628123456789"
                required
                disabled={isLoading}
                style={{ borderRadius: "16px" }}
                value={noHp}
                onChange={(e) => setNoHp(e.target.value)}
              />{" "}
              {error.hasOwnProperty("noHp") && error.noHp !== "" && (
                <p className="text-danger">{error.noHp}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="nohp" className="form-label">
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="nohp"
                placeholder="contoh: 628123456789"
                required
                disabled
                style={{ borderRadius: "16px" }}
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                onClick={(e) => handleSubmitUpdate(e)}
                className="btn btn-primary"
                disabled={isLoading}
                style={{
                  width: "100%",
                  backgroundColor: "#7126B5",
                  borderRadius: "16px",
                }}
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
                    Mengupdate ...
                  </>
                ) : (
                  <>Simpan</>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
