/* eslint-disable react/prop-types */
// import { Table } from "react-bootstrap";
import { FiBox, FiChevronRight, FiDollarSign, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

function Sidebar(props) {
  return (
    <>
      <div className="boxShadow p-3">
        <h5>Kategori</h5>
        <div className="d-flex flex-column">
          <Link to={"/dashboard/daftar-jual"} className="text-decoration-none">
            <div
              className={`d-flex align-items-center p-2 border-bottom border-3 button-sidebar text-decoration-none ${
                props.activeButton === "daftar-jual"
                  ? "button-sidebar-hover"
                  : ""
              }`}
            >
              <FiBox className="me-1" />
              <p className="flex-grow-1 mb-0">Daftar Jual Saya</p>
              <FiChevronRight />
            </div>{" "}
          </Link>
          <Link to={`/dashboard/my-order`} className="text-decoration-none">
            <div
              className={`d-flex align-items-center p-2 border-bottom border-3 button-sidebar text-decoration-none ${
                props.activeButton === "my-order" ? "button-sidebar-hover" : ""
              }`}
            >
              <FiHeart className="me-1" />
              <p className="flex-grow-1 mb-0">My Order</p>
              <FiChevronRight />
            </div>{" "}
          </Link>
          <Link to={`/dashboard/my-offer`} className="text-decoration-none">
            <div
              className={`d-flex align-items-center p-2 border-bottom border-3 button-sidebar text-decoration-none ${
                props.activeButton === "my-offer" ? "button-sidebar-hover" : ""
              }`}
            >
              <FiHeart className="me-1" />
              <p className="flex-grow-1 mb-0">Produk Ditawar</p>
              <FiChevronRight />
            </div>{" "}
          </Link>
          <div
            className={`d-flex align-items-center p-2 border-bottom border-3 button-sidebar text-decoration-none ${
              props.activeButton === "terjual" ? "button-sidebar-hover" : ""
            }`}
          >
            <FiDollarSign className="me-1" />
            <p className="flex-grow-1 mb-0">Terjual</p>
            <FiChevronRight />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
