import Campaigns from "@/components/Campaigns";
import Carousel from "@/components/Carousel";
import Customers from "@/components/customers/Customers";
import MenuWrapper from "@/components/product/MenuWrapper";
import Reservation from "@/components/Reservation";
import React from "react";
import About from "../about";

const Index = ({ categoryList, productList }) => {
  return (
    <React.Fragment>
      <div>
        <div className="relative">
          <Carousel />
        </div>
        <Campaigns />
        <MenuWrapper categoryList={categoryList} productList={productList} />
        <About />
        <Reservation />
        <Customers />
      </div>
    </React.Fragment>
  );
};

export default Index;
