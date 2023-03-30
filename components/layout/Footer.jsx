import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../ui/Title";

const Footer = () => {
  const [footer, setFooter] = useState([]);

  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooter(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFooter();
  }, []);
  return (
    <div className="bg-secondary text-white pt-16 pb-6 ">
      {footer &&
        footer.map((footer) => (
          <div key={footer._id} className="container mx-auto ">
            <div className="flex md:justify-between justify-center text-center flex-wrap gap-y-5">
              <div className=" md:flex-1">
                <Title className={"text-3xl"}>Contact us</Title>
                <div className="flex  flex-col gap-2 items-center">
                  <span className="flex items-center gap-2 mt-6">
                    <a href={footer?.location} target="_blank">
                      <i className="fa-solid fa-location-dot fa-lg"></i>{" "}
                      {footer?.location}
                    </a>
                  </span>
                  <span className="flex items-center  gap-2 ">
                    <a href={`tel:${footer.phoneNumber}`}>
                      <i className="fa-solid fa-phone fa-lg"></i> Call +90{" "}
                      {footer?.phoneNumber}
                    </a>
                  </span>
                  <span className="flex items-center gap-2 ">
                    <a href={`mailto:${footer?.email}`}>
                      <i className="fa-solid fa-envelope fa-lg"></i>{" "}
                      {footer?.email}
                    </a>
                  </span>
                </div>
              </div>
              <div className=" md:flex-1">
                <Title className={"text-5xl"}>Feane</Title>
                <div className="flex flex-col gap-2 items-center ">
                  <span className="flex items-center gap-2 mt-6">
                    <p className="text-center">{footer?.description}</p>
                  </span>
                  <ul className="flex items-center gap-2 mt-6">
                    {footer.icon.map((data, index) => (
                      <li
                        key={index}
                        className="py-1 px-2 bg-white text-secondary text-md rounded-full hover:bg-primary hover:text-white transition-all"
                      >
                        <a target="_blank">
                          <i className={`fa-brands fa-${data}`}></i>{" "}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className=" md:flex-1">
                <Title className={"text-3xl"}>Opening Hours</Title>
                <div className="flex flex-col gap-2 items-center">
                  <span className="flex items-center gap-2 mt-6">
                    <span>{footer?.day}</span>
                  </span>
                  <span className="flex items-center gap-2 ">
                    <span>{footer?.hour}</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="text-center mt-10 flex-1">
              @ 2023 All Rights Reserved By Ozermzn
            </p>
          </div>
        ))}
    </div>
  );
};

export default Footer;
