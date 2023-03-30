import MenuWrapper from "@/components/product/MenuWrapper";
import axios from "axios";
import React from "react";

const Index = ({ categoryList, productList }) => {
  return (
    <div className="pt-10">
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};
export const getServerSideProps = async () => {
  const resCategory = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  const resProducts = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  return {
    props: {
      categoryList: resCategory?.data ? resCategory.data : [],
      productList: resProducts?.data ? resProducts.data : [],
    },
  };
};

export default Index;
