import Image from "next/image";
import React from "react";

const CustomerItem = ({ imgSrc }) => {
  return (
    <div className="mt-5 mx-4">
      <div className="p-6 bg-secondary text-white rounded-md flex flex-col">
        <p>
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          aliquid ipsam quasi fugiat rem corrupti! Ab inventore, repellat sequi
          ducimus, est impedit ipsam voluptate numquam, esse nostrum reiciendis
          neque dignissimos.
        </p>
        <span className="text-lg font-semibold my-2">Moana Michell</span>
        <span className="text-[15px]">Magna Aliqua</span>
      </div>
      <div className="relative h-24 w-24 border-4 border-primary rounded-full mt-8 before:content-[''] before:absolute before:top-0 flex justify-center before:-translate-y-3 before:rotate-45  before:bg-primary before:w-5 before:h-5 ">
        <Image
          src={imgSrc}
          alt=""
          fill
          className="object-contain rounded-full"
        />
      </div>
    </div>
  );
};

export default CustomerItem;
