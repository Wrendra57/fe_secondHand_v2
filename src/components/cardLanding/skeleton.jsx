import Skeleton from "react-loading-skeleton";
function Skeletons(params) {
  const { item } = params;
  return (
    <div key={item} className="col-md-3 col-xl-3 col-sm-12 mb-3">
      <div
        // to={`/product/${item.id_product}`}
        className="text-decoration-none"
        style={{ color: "black" }}
      >
        <div
          className="card cardProduct boxShadow pb-0"
          style={{ border: "none" }}
        >
          <div
            className="d-flex justify-content-center border border-2 rounded"
            style={{
              // width: "200px",
              height: "150px",
              // objectFit: "cover",
            }}
          >
            <Skeleton
              height={150}
              containerClassName="card-img-top center-cropped m-1 img-fluid"
            />
            {/* <img
              className="card-img-top center-cropped m-1 img-fluid"
              src={item.foto}
              style={{
                // width: "200px",
                // height: "100px",
                objectFit: "cover",
              }}
              alt="product_image"
            /> */}
          </div>
          <div className="card-body ">
            <h6
              className="card-title text-decoration-none my-0"
              style={{ fontSize: "14px" }}
            >
              <Skeleton width="100%" />
            </h6>
            <p
              className="text-decoration-none my-0 fw-light"
              style={{ fontSize: "10px" }}
            >
              <Skeleton width="100%" />
            </p>
            <p
              className="text-decoration-none my-0"
              style={{ fontSize: "14px" }}
            >
              <Skeleton width="100%" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeletons;
