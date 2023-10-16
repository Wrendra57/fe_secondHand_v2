import { Container, Carousel } from "react-bootstrap";

function CarouselSection() {
  const banner = [
    {
      src: "https://res.cloudinary.com/dhtypvjsk/image/upload/v1697283967/img_banner_y5zp74.png",
      alt: "Fashion sale",
    },
    {
      src: "https://res.cloudinary.com/dhtypvjsk/image/upload/v1697283967/img_banner_y5zp74.png",
      alt: "Gadget sale",
    },
  ];
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="kotak " style={{ color: "#B6D4A8;" }}></div>
      <Container>
        <div className="  my-2 bg-primary">
          <Carousel className="buttonradius20">
            {banner?.map((item, index) => {
              return (
                <Carousel.Item
                  interval={3000}
                  className="buttonradius20  "
                  key={index}
                  // height={"288px"}
                >
                  <img
                    className=" w-100 img-fluid buttonradius20"
                    src={item.src}
                    alt={item.alt}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </Container>
      <div className="kotak bg-danger"></div>
    </div>
  );
}

export default CarouselSection;
