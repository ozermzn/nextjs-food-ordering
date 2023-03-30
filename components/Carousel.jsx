import Image from "next/image";
import burger from "../images/hero.jpg";
import Title from "./ui/Title";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplayspeed: 1000,
    appenDots: (dots) => {
      <div className="text-primary p-[10px]">
        <ul className="mt-3 text-cyan-100">{dots}</ul>
      </div>;
    },
  };

  return (
    <div className="h-screen w-full container mx-auto ">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative h-full w-full">
          <Image
            src={burger}
            alt="background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>
      <Slider {...settings}>
        <div>
          <div className="text-white flex flex-col items-baseline gap-10 mt-48">
            <Title className={"text-6xl"}>Fast Food Restaurant</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              eligendi cumque dicta sit delectus culpa, rerum eveniet beatae
              commodi eum mollitia nisi magnam numquam, et vel quis assumenda
              velit quidem.
            </p>
            <button className="btn-primary">Order Now</button>
          </div>
        </div>
        <div>
          <div className="relative  text-white top-48 flex flex-col items-baseline gap-10">
            <Title className={"text-6xl"}>Fast Food Restaurant</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              eligendi cumque dicta sit delectus culpa, rerum eveniet beatae
              commodi eum mollitia nisi magnam numquam, et vel quis assumenda
              velit quidem.
            </p>
            <button className="btn-primary">Order Now</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
