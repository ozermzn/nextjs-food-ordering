import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { toast } from "react-toastify";
import Title from "../ui/Title";

const AddProduct = ({ setIsProductModal }) => {
  useEffect(() => {
    const handlerClickOutside = (event) => {
      if (!modalEl.current) {
        return;
      }
      if (!modalEl.current.contains(event.target)) {
        setIsProductModal(false);
      }
    };
    document.addEventListener("click", handlerClickOutside, true);
    return () => {
      document.removeEventListener("click", handlerClickOutside, true);
    };
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);
  const modalEl = useRef();

  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);
  const [categories, setCategories] = useState();
  const handleOnChange = (e) => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(e.target.files[0]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleCreateExtra = () => {
    if (extra) {
      if (extra.text && extra.price) {
        setExtraOptions((prev) => [...prev, extra]);
      }
    }
  };
  function handleRemoveExtra(option) {
    const updatedOption = extraOptions.filter((opt) => opt !== option);
    setExtraOptions(updatedOption);
  }

  const handleOnCreate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "food-ordering");

    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/dvroyqmbh/image/upload`,
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        img: url,
        title,
        description,
        category: category.toString(),
        prices,
        extraOptions,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        newProduct
      );
      if (res.status === 201) {
        setIsProductModal(false);
        toast.success("Product Created Successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  function changePrice(e, i) {
    const currentPrices = prices;
    currentPrices[i] = e.target.value;
    setPrices(currentPrices);
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black grid place-content-center z-50">
      <div className="w-full h-full grid place-items-center text-sm">
        <div
          ref={modalEl}
          className="relative z-50 border-2 bg-white md:w-[600px] w-[370px]  rounded-3xl  p-10"
        >
          <div>
            <button
              className="absolute right-4 top-5"
              onClick={() => setIsProductModal(false)}
            >
              <GiCancel className="" size={23} />
            </button>
          </div>
          <Title className={"text-center text-purple"}>Add a New Product</Title>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => handleOnCreate(e)}
          >
            <div className="flex flex-col text-sm gap-y-3 mt-5">
              <label className="flex gap-x-10 items-center">
                <input
                  type="file"
                  name="image"
                  id="file"
                  onChange={handleOnChange}
                  className="hidden"
                />
                <button className="btn-primary pointer-events-none">
                  Choose a Image
                </button>
                {imageSrc && (
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                      src={imageSrc}
                      alt=""
                      className="w-24 h-24 object-cover justify-center rounded-full outline- "
                    />
                  </div>
                )}
              </label>
            </div>

            <div className="flex flex-col gap-y-1">
              <label htmlFor="title" className="font-semibold">
                Title
              </label>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write product name..."
                className="border-2 p-2 rounded-md outline-none"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>

              <textarea
                name="description"
                onChange={(e) => setDesc(e.target.value)}
                type={"text"}
                className="w-full border-2 rounded  p-2 outline-none"
                placeholder="Write a description..."
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="category" className="font-semibold">
                Select Category
              </label>
              <select
                name="category"
                id="category"
                className="border-2 p-2 rounded-md outline-none"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories &&
                  categories.map((category) => (
                    <option
                      key={category._id}
                      value={category.title.toUpperCase()}
                    >
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="title" className="font-semibold">
                Prices
              </label>
              <div className="grid grid-cols-3 gap-x-3">
                <input
                  type="number"
                  name="smallPrice"
                  placeholder="small"
                  onChange={(e) => changePrice(e, 0)}
                  className="border-b-2 p-2 rounded-md outline-none"
                />
                <input
                  type="number"
                  name="mediumPrice"
                  placeholder="medium"
                  onChange={(e) => changePrice(e, 1)}
                  className="border-b-2 p-2 rounded-md outline-none"
                />
                <input
                  type="number"
                  name="largePrice"
                  placeholder="large"
                  onChange={(e) => changePrice(e, 2)}
                  className="border-b-2 p-2 rounded-md outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="title" className="font-semibold">
                Extras
              </label>
              <div className="flex flex-wrap  gap-3">
                <input
                  type="text"
                  name="text"
                  placeholder="Item"
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                  className="border-b-2 p-2 rounded-md outline-none"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                  className="border-b-2 p-2 rounded-md outline-none"
                />

                <button
                  className="btn-primary mx-auto font-semibold"
                  type="button"
                  onClick={handleCreateExtra}
                >
                  + Add
                </button>
              </div>
              <div className="mt-3 text-xs flex flex-wrap items-center gap-2 ">
                {extraOptions &&
                  extraOptions.map((option, index) => (
                    <div key={index}>
                      <span
                        className="bg-orange-500 text-white py-1 px-2 rounded-full cursor-pointer   hover:opacity-80 hover:bg-red-600"
                        onClick={() => handleRemoveExtra(option)}
                      >
                        {option.text}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <button type="submit" className="btn-primary !bg-green-500">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
