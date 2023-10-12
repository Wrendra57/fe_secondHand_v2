import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../../assets/SecondHand1.png";
import { FiUser, FiLogOut, FiList } from "react-icons/fi";
function navbar() {
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
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link>
                <Link to={"/login"}>
                  <button className="btnPrimary border-0 p-2">
                    <FiLogOut /> Masuk
                  </button>
                </Link>
              </Nav.Link>
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
              <Nav.Link>
                <Link to={"/infoprofil"}>
                  <button
                    type="button"
                    className="btn btn-sm nav-link text-dark rounded-12px active"
                  >
                    <FiUser />
                  </button>
                </Link>
              </Nav.Link>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Container>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="light"
          style={{ sticky: "top" }}
        >
          <Navbar.Brand>
            <Link to={`/`}>
              <img src={logo} alt="" style={{ width: "130px" }} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <form className="d-flex border buttonradius12 ">
                  <input
                    className="form-control border-0"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    // value={wordEntered}
                    // onChange={handleFilter}
                  ></input>
                  <button className="btn" type="submit">
                    <FiSearch />
                  </button>
                </form>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/infoprofil"}>
                  <button
                    type="button"
                    className="btn btn-sm nav-link text-dark rounded-12px active"
                  >
                    <FiUser />
                  </button>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <button className="btnPrimary border-0">
                  <FiLogOut /> Logout
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container> */}
    </>
  );
}

export default navbar;
