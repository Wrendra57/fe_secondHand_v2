/* eslint-disable no-prototype-builtins */
import { Link } from "react-router-dom";
import logo from "../../assets/SecondHand1.png";
import { FiUser, FiLogOut, FiList, FiBell } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  // Button,
  NavDropdown,
  Navbar,
  Nav,
  Container,
  // Form,
} from "react-bootstrap";
import SearchInput from "./searchInput";
import { useEffect } from "react";
import { useAuthenticationMutation } from "../../store/apis/authentication";
import { addUser, emptyToken, emptyUser } from "../../store/slices/authSlice";
import Swal from "sweetalert2";
// import { useEffect } from "react";
function NavBar() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [
    getAuthHit,
    { isLoading, isError, error: errorAuth, isSuccess, data: dataAuth },
  ] = useAuthenticationMutation();
  useEffect(() => {
    console.log(token);
    if (token !== "") {
      // console.log(user.hasOwnProperty("uuid"));
      // // eslint-disable-next-line no-prototype-builtins
      // if (user.hasOwnProperty("uuid") === false) {
      // }
      getAuthHit({ token: token });
      console.log("token");
      console.log(user);
      // if (Object.keys(user).length === 0) {
      // }
    }
    // dispatch(emptyUser());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(addUser(dataAuth.data));
    }

    if (isError) {
      // setError((error) => ({ ...error, login: errorLogin.data.message }));
      dispatch(emptyToken());
      dispatch(emptyUser());
      Swal.fire({
        // position: "",
        icon: "error",
        title: "Oops...",
        text: errorAuth.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      dispatch(emptyToken());
      dispatch(emptyUser());
      Swal.fire({
        // position: "",
        icon: "success",
        title: "sukses logout",
        // text: errorAuth.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand>
            <Link to={"/"}>
              <img src={logo} alt="" style={{ width: "130px" }} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <SearchInput />
            </Nav>
            <Nav>
              {user.hasOwnProperty("uuid") ? (
                <>
                  <Nav.Link>
                    <Link to={"/daftarjual"}>
                      <button
                        type="button"
                        className="btn btn-sm nav-link text-dark rounded-12px active"
                      >
                        <FiList />
                      </button>
                    </Link>
                  </Nav.Link>
                  <NavDropdown
                    title={
                      <button
                        type="button"
                        className="btn btn-sm nav-link text-dark rounded-12px active"
                      >
                        <FiBell />
                        {/* {jumlahnotif.length > 0 ? (
                      <>
                        <span className="icon-button__badge">
                          {jumlahnotif.length}
                        </span>
                      </>
                    ) : (
                      <></>
                    )} */}
                      </button>
                    }
                    id="collasible-nav-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item href="#">
                      <div className="card notifikasi">
                        <p>tidak ada notif</p>
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link>
                    <Link to={"/profile"}>
                      <button
                        type="button"
                        className="btn btn-sm nav-link text-dark rounded-12px active"
                      >
                        <FiUser />
                      </button>
                    </Link>
                  </Nav.Link>
                  <Nav.Link onClick={(e) => handleLogout(e)}>
                    {/* <Link to={"/login"}> */}
                    <button className="btnPrimary border-0 p-2">
                      <FiLogOut /> LogOut
                    </button>
                    {/* </Link> */}
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link>
                  <Link to={"/login"}>
                    <button className="btnPrimary border-0 p-2">
                      <FiLogOut /> Masuk
                    </button>
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
