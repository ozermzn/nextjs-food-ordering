import Image from "next/image";
import aboutImg from "../images/aboutImg.png";
import React from "react";
import Title from "@/components/ui/Title";

const About = () => {
  return (
    <div className="bg-secondary py-14 text-white">
      <div className="container mx-auto flex items-center gap-20 md:flex-nowrap flex-wrap-reverse justify-center">
        <div>
          <div className="w-full grid place-items-center">
            <div className="relative sm:w-[445px] sm:h-[600px]  w-[320px] h-[430px]">
              <Image src={aboutImg} alt="about" fill />
            </div>
          </div>
        </div>
        <div>
          <Title className={"text-4xl"}>We Are Faene</Title>
          <p className="my-5 md:w-3/4">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which dont look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isnt anything embarrassing hidden in the
            middle of text. All
          </p>
          <button className="btn-primary">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
