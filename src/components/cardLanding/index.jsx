// import React from "react";
import { Link } from "react-router-dom";
import { rupiahFormat } from "../../store/utils/format";
function CardLanding(params) {
  const { item } = params;
  console.log(item);
  return (
    <>
      <div key={item.id_product} className="col-md-4 col-xl-3 col-sm-12 mb-3">
        <Link
          to={`/halamanproduk/${item.id_product}`}
          className="text-decoration-none"
          style={{ color: "black" }}
        >
          <div
            className="card cardProduct boxShadow"
            style={{ border: "none" }}
          >
            <div className="d-flex justify-content-center ">
              <img
                className="card-img-top center-cropped m-1 img-fluid"
                src={item.foto}
                style={{
                  width: "200px",
                  height: "100px",
                  objectFit: "cover",
                }}
                alt="product_image"
              />
            </div>
            <div className="card-body">
              <h6
                className="card-title text-decoration-none"
                style={{ fontSize: "16px" }}
              >
                {item.name_product}
              </h6>
              <p className="text-decoration-none" style={{ fontSize: "14px" }}>
                {item.category}
              </p>
              <p className="text-decoration-none" style={{ fontSize: "16px" }}>
                {rupiahFormat(item.price)}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default CardLanding;
