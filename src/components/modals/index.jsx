/* eslint-disable react/prop-types */
import { Button, Modal, Spinner } from "react-bootstrap";
import { rupiahFormat } from "../../store/utils/format";
import { NumericFormat } from "react-number-format";

function Modals(props) {
  // console.log(props);
  return (
    <Modal
      show={props.show}
      onHide={props.onClick}
      backdrop="static"
      centered
      size="md"
    >
      <Modal.Header closeButton={!props.isLoadingCreateOrder}>
        {/* <Modal.Title>Modal heading</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column">
          <h5 className="fw-semibold">Masukkan Harga Tawarmu</h5>
          <p>
            Harga tawaranmu akan diketahui penual, jika penjual cocok kamu akan
            segera dihubungi penjual.
          </p>
          <div className="p-3 d-flex align-items-center border mb-0 rounded-1 bg-secondary bg-opacity-10">
            <div>
              {" "}
              <img
                src={props.avatar}
                className="rounded-3"
                alt="profilpenjual"
                style={{ width: "50px" }}
              />
            </div>{" "}
            <div className="ms-1">
              <h6 className="mb-0">{props.productName}</h6>
              <p className="mb-0" style={{ fontSize: "12px" }}>
                {rupiahFormat(props.price)}
              </p>
            </div>
            {/* <div className="row">
              <div className="col-3">
                {" "}
                <img
                  src={props.avatar}
                  alt="profilpenjual"
                  style={{ width: "50px" }}
                />
              </div>
              <div className="col-9">
                <h6>{props.productName}</h6>
                <p>{props.price}</p>
              </div>
            </div> */}
          </div>
          <p className="fw-semibold">Harga Tawar</p>
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp. "
            value={props.price}
            // format="### ###"
            mask="Rp 00"
            onValueChange={(values) => {
              props.setOfferPrice(values.floatValue);
            }}
            className="form-control"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="buton-outline" onClick={props.handleCreateOrder}>
          {props.isLoadingCreateOrder ? (
            <>
              {" "}
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              mengirim penawaran
            </>
          ) : (
            <>Kirim tawaran</>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modals;
