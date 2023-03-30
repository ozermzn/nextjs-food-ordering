import Title from "@/components/ui/Title";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import productImage from "../../images/o1.jpg";
import sizeImage from "../../images/pizzaSize.png";
import { FaShoppingCart } from "react-icons/fa";
import { addProduct } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Index = ({ food }) => {
  const [prices, setPrices] = useState(food.prices);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState(food?.extraOptions);
  const [extras, setExtras] = useState([]);
  const card = useSelector((state) => state.card);
  const dispatch = useDispatch();
  useEffect(() => {
  }, [size, extras]);
  const sizes = ["Small", "Medium", "Large"];

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(item.price);
      setExtras([...extras, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id));
    }
  };

  const handleAddProductClick = () => {
    dispatch(addProduct({ ...food, extras, size, price }));
  };
  function changePrice(number) {
    setPrice(price + number);
  }
  return (
    <div className="flex flex-wrap md:justify-between justify-center items-center md:h-[calc(100vh_-_88px)] py-20 mx-10 gap-5">
      <div className="relative md:flex-1 md:h-[80%] md:w-[80%] mx-auto w-36 h-36">
        <Image
          src={food?.img}
          className="object-contain"
          alt="product-detail"
          fill
        />
      </div>

      <div className="md:flex-1 md:block grid place-items-center md:text-start text-center">
        <Title className={"text-7xl"}>{food?.title}</Title>
        <span className="text-primary font-bold text-2xl underline underline-offset-1 my-4 inline-block">
          ${price}
        </span>
        <p className="text-sm md:pr-24 pr-0">{food?.description}</p>
        <h4 className="text-xl font-bold mt-3 py-1">Choose the size</h4>
        <div className="flex gap-x-10">
          {food.prices?.map((food, index) => (
            <div key={food._id} className="flex items-center gap-10 ">
              <div className="relative cursor-pointer w-12 h-10">
                <Image
                  src={sizeImage}
                  alt="product detail"
                  fill
                  onClick={() => handleSize(index)}
                />
                <span className="absolute top-0 -right-5 text-xs text-primary bg-secondary rounded-full px-1 font-medium">
                  {sizes[index]}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-x-4 p-3 my-4">
          {food.extraOptions?.map((item) => {
            return (
              <label key={item._id} className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  className="extras w-5 h-5 accent-primary"
                  onChange={(e) => handleChange(e, item)}
                />
                <span className="text-sm font-semibold text-primary bg-secondary py-1 px-2 rounded-lg">
                  {item.text}
                </span>
              </label>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleAddProductClick}
          className="btn-primary flex items-center gap-2"
        >
          Add to Card <FaShoppingCart />
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );
  return {
    props: {
      food: res.data ? res.data : null,
    },
  };
}

export default Index;
