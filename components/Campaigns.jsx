import Image from "next/image";
import campImage from "../images/o1.jpg";
import Title from "./ui/Title";
import { FaShoppingCart } from "react-icons/fa";

const CampaignItem = () => {
  return (
    <div className="bg-secondary z-10 flex flex-1 items-center gap-x-4 rounded-md py-5 px-4 text-white">
      <div className="relative md:w-40 md:h-40 w-36 h-36 rounded-full border-primary border-4 overflow-hidden">
        <Image
          className="rounded-full object-cover hover:scale-105 transition-all"
          src={campImage}
          alt="campaign-food"
          fill
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-dancing">
          <Title className="text-2xl ">Tatsy Saturday</Title>
          <span className="font-dancing text-[40px]">20%</span>
          <span className="ml-2">Off</span>
        </div>
        <button className="flex items-center gap-x-2 btn-primary p-2 rounded-full">
          Order Now <FaShoppingCart />
        </button>
      </div>
    </div>
  );
};

const Campaigns = () => {
  return (
    <div className="flex justify-between container mx-auto py-24 gap-6 flex-wrap">
      <CampaignItem />
      <CampaignItem />
    </div>
  );
};

export default Campaigns;
