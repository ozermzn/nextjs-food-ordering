import { useEffect, useRef, useState } from "react";
import { GiCancel } from "react-icons/gi";
import Title from "./Title";
import Image from "next/image";
import axios from "axios";
import Input from "../form/Input";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import { PacmanLoader } from "react-spinners";
const Search = ({ setIsSeachModal }) => {
  const modalEl = useRef();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { push } = useRouter();

  //getProducts - axios
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setProducts(res.data);
        setFiltered(res.data.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);
  function handlePushProduct(id) {
    push("/product/" + id);
    setIsSeachModal(false);
  }

  const handleSearchFiltered = (e) => {
    setSearch(e.target.value);
    const searchFilter = products
      .filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 5);
    setFiltered(searchFilter);
  };

  //capture phasing
  useEffect(() => {
    const handlerClickOutside = (event) => {
      if (!modalEl.current) {
        return;
      }
      if (!modalEl.current.contains(event.target)) {
        setIsSeachModal(false);
      }
    };
    document.addEventListener("click", handlerClickOutside, true);
    return () => {
      document.removeEventListener("click", handlerClickOutside, true);
    };
  });
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black  z-10 grid place-content-center">
      <div className="w-full h-full grid place-items-center ">
        <div
          ref={modalEl}
          className="relative z-50 border-2 bg-white md:w-[600px] w-[370px]  rounded-3xl  p-10"
        >
          <Title className={"text-center text-purple"}>Search</Title>
          <Input onChange={handleSearchFiltered} value={search}>
            Search
          </Input>
          <div className="my-5">
            <ul>
              {products.length > 0 ? (
                filtered.length > 0 ? (
                  filtered.slice(0, 6).map((product) => (
                    <li
                      key={product?._id}
                      className="flex items-center justify-between font-bold py-2 my-1 hover:bg-primary cursor-pointer px-2 rounded-lg hover:text-white"
                      onClick={() => handlePushProduct(product?._id)}
                    >
                      <div className="relative flex w-12 h-12">
                        <Image
                          className="object-contain"
                          width={55}
                          height={50}
                          src={product?.img}
                          alt=""
                        />
                      </div>
                      <span>{product?.title}</span>
                      <span>{product?.prices[0]}₺</span>
                    </li>
                  ))
                ) : (
                  <p className="text-center font-semibold">
                    There is no product here!
                  </p>
                )
              ) : (
                <div className="grid place-items-center">
                  <PacmanLoader color="#ffbe33" />
                </div>
              )}
            </ul>
            <button
              className="absolute right-4 top-5"
              onClick={() => setIsSeachModal(false)}
            >
              <GiCancel className="" size={23} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
