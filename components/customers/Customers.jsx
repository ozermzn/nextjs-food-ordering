import Title from "../ui/Title";
import CustomerItem from "./CustomerItem";
import client1 from "../../images/user/17.jpg";
import client2 from "../../images/user/81.jpg";
import client3 from "../../images/user/22.jpg";
import client4 from "../../images/user/55.jpg";
import Slider from "react-slick";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
const Customers = () => {
  function NextBtn({ onClick }) {
    return (
      <button
        className="!bg-primary rounded-full absolute -bottom-12 left-1/2 flex items-center justify-center w-10 mx-2 "
        onClick={onClick}
      >
        <GrFormNextLink />
      </button>
    );
  }
  function PrevBtn({ onClick }) {
    return (
      <button
        className="!bg-primary rounded-full absolute -bottom-12 right-1/2 flex items-center justify-center w-10 "
        onClick={onClick}
      >
        <GrFormPreviousLink />
      </button>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
    ],
  };
  return (
    <div className="container mx-auto my-16">
      <Title className={"text-[40px] text-center"}>
        What Says Our Customers
      </Title>
      <div className="">
        <Slider {...settings}>
          <div>
            <CustomerItem imgSrc={client1} />
          </div>
          <div>
            <CustomerItem imgSrc={client2} />
          </div>
          <div>
            <CustomerItem imgSrc={client3} />
          </div>
          <div>
            <CustomerItem imgSrc={client4} />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Customers;
