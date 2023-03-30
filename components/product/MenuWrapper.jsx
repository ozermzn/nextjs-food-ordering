import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList, productList }) => {
  const [active, setActive] = useState("HAMBURGER");
  const [filterProduct, setFilterProduct] = useState();
  const [productSlice, setProductSlice] = useState(3);
  useEffect(() => {
    setFilterProduct(
      productList.filter((product) => product.category === active.toUpperCase())
    );
  }, [active, categoryList, productList]);

  function handleSelect(cat) {
    setActive(cat.title);
    setProductSlice(3);
  }
  let category =
    categoryList &&
    categoryList.map((cat) => {
      return (
        <div key={cat._id}>
          <button
            onClick={() => handleSelect(cat)}
            className={`px-3 py-1 rounded-full shadow-sm ${
              cat.title === active && "bg-secondary text-white"
            }`}
          >
            {cat.title}
          </button>
        </div>
      );
    });
  return (
    <div className="container mx-auto  mb-16">
      <div className="flex flex-col items-center w-full">
        <Title className={"text-[40px]"}>Our Menu</Title>
        <div className="mt-10 flex items-center gap-x-5 justify-center text-center">
          {categoryList && category}
        </div>
      </div>
      <div className="mt-12 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {filterProduct &&
          filterProduct
            .slice(0, productSlice)
            .map((product) => <MenuItem key={product._id} product={product} />)}
      </div>
      <div className="grid place-items-center mt-10">
        <button
          className="btn-primary"
          onClick={() => setProductSlice(productSlice + 3)}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default MenuWrapper;
