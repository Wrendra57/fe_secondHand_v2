// import { Table } from "react-bootstrap";
import { FiBox, FiChevronRight, FiDollarSign, FiHeart } from "react-icons/fi";

function Sidebar() {
  return (
    <>
      <div className="boxShadow ">
        <h5>Kategori</h5>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center p-2 border-bottom border-3 button-sidebar active">
            <FiBox className="me-1" />
            <p className="flex-grow-1 mb-0">Daftar Jual Saya</p>
            <FiChevronRight />
          </div>{" "}
          <div className="d-flex align-items-center p-2 border-bottom border-3 button-sidebar active">
            <FiHeart className="me-1" />
            <p className="flex-grow-1 mb-0">Diminati</p>
            <FiChevronRight />
          </div>{" "}
          <div className="d-flex align-items-center p-2 border-bottom border-3 button-sidebar active">
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
